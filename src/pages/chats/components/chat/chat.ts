import "./chat.scss";
import tmpl from "./chat.tmpl";
import Block from "../../../../helpers/block";
import ChatController from "../../../../controllers/chat-controller";
import { isEqual } from "../../../../utils/heplerFunction";
import { WSTransport } from "../../../../helpers/wsTransport";
import store from "../../../../helpers/store";
import Message from "../message/message";

export default class Chat extends Block {
    constructor(props: any) {
        super("div", { ...props, update: false });
    }

    async connectToWs() {
        const { token } = (await ChatController.chatToken(this.props.currentChatId)) as any;

        let socket;
        if (this.props?.state?.socket && this.props?.state?.socket[this.props.currentChatId]) {
            socket = this.props.state?.socket[this.props.currentChatId];
        } else {
            socket = new WSTransport(
                `wss://ya-praktikum.tech/ws/chats/${this.props.state.user.id}/${this.props.currentChatId}/${token}`
            );
            await socket.connect();
            store.set(`socket.${this.props.currentChatId}`, socket);
        }

        await socket.send({
            content: "0",
            type: "get old",
        });

        let { unread_count } = (await ChatController.getUnreadCountMessage(this.props.currentChatId)) as any;

        let lastMessageId = unread_count ? 20 : 0;

        if (lastMessageId && unread_count && socket) {
            while (unread_count > 0) {
                unread_count -= 20;
                lastMessageId += 20;
                socket.send({
                    content: lastMessageId,
                    type: "get old",
                });
            }
        }
    }

    async setMessages() {
        this.setProps({
            messages: this.props.state?.messages?.map((mes: Record<string, any>) => {
                const userMessage = mes.user_id === this.props.state.user.id;
                const time = new Date(mes.time).toLocaleString();
                return new Message({ ...mes, userMessage: userMessage, time });
            }),
        });
        //отмотка чата вниз при обновлении списка сообщений
        setTimeout(() => {
            const chatHistory = document.querySelector(".chat_offer__messages-list");
            if (chatHistory) {
                chatHistory!.scrollTo(0, chatHistory!.scrollHeight);
            }
        }, 0);
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        if (!isEqual(oldProps.state?.messages || [], newProps.state?.messages || [])) {
            this.setMessages();
        }

        if (
            !isEqual(oldProps?.state || {}, newProps?.state || {}) ||
            this.props.update ||
            this.props.currentChatId !== oldProps.currentChatId
        ) {
            // тут происходит подключение к wss по ID
            if (this.props?.currentChatId && this.props?.state?.user?.id && this.props.update) {
                this.setProps({ update: false });
                //очистка старых сообщений при переключении на другой чат
                store.set("messages", []);
                this.connectToWs();
            }
        }

        return super.componentDidUpdate(oldProps, newProps);
    }

    render() {
        return this.compile(tmpl, { ...this.props });
    }
}
