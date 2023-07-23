import "./chat.scss";
import tmpl from "./chat.tmpl";
import Block from "../../../../helpers/block";
import Message from "../message";

const messageList = [
    {
        id: 1,
        userId: 112233,
        name: "Андрей",
        text: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Non quibusdam ex totam, voluptatibus sequi, beatae dolore architecto
        consectetur optio exercitationem eos sapiente commodi a soluta repudiandae nesciunt, veritatis vero ad!
        Lorem ipsum dolor sit amet consectetur adipisicing elit.`,
        date: new Date(2023, 6, 12, 10, 36).toLocaleTimeString().slice(0, -3),
    },
    {
        id: 2,
        userId: 12345,
        name: "Павел",
        text: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Non quibusdam ex totam, voluptatibus sequi, beatae dolore architecto
        consectetur optio exercitationem eos sapiente commodi a soluta repudiandae nesciunt, veritatis vero ad!
        Lorem ipsum dolor sit amet consectetur adipisicing elit.

        Non quibusdam ex totam, voluptatibus sequi, beatae dolore architecto
        consectetur optio exercitationem eos sapiente commodi a soluta repudiandae nesciunt, veritatis vero ad!`,
        date: new Date(2023, 6, 12, 10, 45).toLocaleTimeString().slice(0, -3),
    },
    {
        id: 1,
        userId: 112233,
        name: "Андрей",
        text: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Non quibusdam ex totam, voluptatibus sequi, beatae dolore architecto
        consectetur optio exercitationem eos sapiente commodi a soluta repudiandae nesciunt, veritatis vero ad!
        Lorem ipsum dolor sit amet consectetur adipisicing elit.

        Non quibusdam ex totam, voluptatibus sequi, beatae dolore architecto
        consectetur optio exercitationem eos sapiente commodi a soluta repudiandae nesciunt, veritatis vero ad!`,
        date: new Date(2023, 6, 12, 10, 46).toLocaleTimeString().slice(0, -3),
    },
    {
        id: 2,
        userId: 12345,
        name: "Павел",
        text: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Non quibusdam ex totam, voluptatibus sequi, beatae dolore architecto
      consectetur optio exercitationem eos sapiente commodi a soluta repudiandae nesciunt, veritatis vero ad!
      Lorem ipsum dolor sit amet consectetur adipisicing elit.

      Non quibusdam ex totam, voluptatibus sequi, beatae dolore architecto
      consectetur optio exercitationem eos sapiente commodi a soluta repudiandae nesciunt, veritatis vero ad!`,
        date: new Date(2023, 6, 12, 10, 47).toLocaleTimeString().slice(0, -3),
    },
    {
        id: 1,
        userId: 112233,
        name: "Андрей",
        text: `Lorem ipsum dolor sit amet consectetur adipisicing elit.`,
        date: new Date(2023, 6, 12, 11, 20).toLocaleTimeString().slice(0, -3),
    },
];

export default class Chat extends Block {
    constructor(props: any) {
        super("div", props);
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        if (oldProps.chatId !== newProps.chatId) {
            this.setProps({ messages: [] });
            this.loadChat();
            return false;
        }
        return true;
    }

    async loadChat() {
        const messages: any[] = await new Promise((res) => {
            setTimeout(() => {
                res(messageList);
            }, 1000);
        });

        this.setProps({
            messages: messages.map((mes) => {
                const userMessage = mes.userId === this.props.userId;
                return new Message({ ...mes, userMessage: userMessage });
            }),
        });
    }

    render() {
        return this.compile(tmpl, { ...this.props });
    }
}
