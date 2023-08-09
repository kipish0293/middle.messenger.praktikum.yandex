import "./chat.scss";
import tmpl from "./chat.tmpl";
import Block from "../../../../helpers/block";
import ChatController from "../../../../controllers/chat-controller";
import { isEqual } from "../../../../utils/heplerFunction";

export default class Chat extends Block {
    constructor(props: any) {
        super("div", { ...props, update: false });
    }

    async connectToWs() {
        const { token } = (await ChatController.chatToken(this.props.currentChatId)) as any;
        new WebSocket(`wss://ya-praktikum.tech/ws/chats/${this.props.state.user.id}/${this.props.currentChatId}/${token}}`);
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        if (
            !isEqual(oldProps?.state || {}, newProps?.state || {}) ||
            this.props.update ||
            this.props.currentChatId !== oldProps.currentChatId
        ) {
            // тут происходит подключение к wss по ID
            if (this.props.currentChatId && this.props.state.user.id && this.props.update) {
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
