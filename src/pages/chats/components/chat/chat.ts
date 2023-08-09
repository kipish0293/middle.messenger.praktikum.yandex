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

        socket.send({
            content: "0",
            type: "get old",
        });
    }

    setMessages() {
        this.setProps({
            messages: this.props.state?.messages?.map((mes: Record<string, any>) => {
                const userMessage = mes.user_id === this.props.state.user.id;
                return new Message({ ...mes, userMessage: userMessage });
            }),
        });
        const chatHistory = document.querySelector(".chat_offer__messages-list");
        chatHistory!.scrollTo(0, chatHistory!.scrollHeight);
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
                this.connectToWs();
            }
        }

        return super.componentDidUpdate(oldProps, newProps);
    }

    render() {
        return this.compile(tmpl, { ...this.props });
    }
}
