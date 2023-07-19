import "./chats.scss";
import tmpl from "./chats.tmpl";
import chat from "./components/chat";
import ChatItem from "./components/chatItem";
import Avatar from "../../components/avatar";
import LinkButton from "../../components/linkButton";
import Block from "../../helpers/block";
import { changePathName } from "../../utils/changePatrhName";

class ChatsPage extends Block {
    constructor(props: any) {
        super("div", props);
    }

    // componentDidMount(): void {
    //     if (this.element) {
    //         this.element.querySelector("#go-to-profile")?.addEventListener("click", () => {
    //             changePathName("profile");
    //         });
    //     }
    // }

    render() {
        return this.compile(tmpl, { ...this.props });
    }
}

export default new ChatsPage({
    chatsList: [
        {
            id: 1235,
            chatName: "Андрей",
            lastMessage: {
                id: 1,
                name: "Андрей",
                text: "ОГО!! очень круто!",
                date: new Date(2023, 6, 12, 10, 36).toLocaleTimeString().slice(0, -3),
            },
            unreadMessageCount: 2,
            chatIcon: new Avatar({ size: "small", url: "https://i.stack.imgur.com/WXyZl.jpg" }),
        },
        {
            id: 2,
            chatName: "Вадим",
            lastMessage: {
                id: 2,
                name: "Павел",
                text: "Спасибо большое, было приятно познакомится!",
                date: new Date(2023, 6, 12, 10, 45).toLocaleTimeString().slice(0, -3),
            },
            unreadMessageCount: 0,
            chatIcon: new Avatar({ size: "small", url: "https://i.stack.imgur.com/WXyZl.jpg" }),
        },
    ].map((it) => new ChatItem({ ...it })),
    linkButton: new LinkButton({
        name: "Профиль >",
        events: {
            click: (event: Event): void => {
                event.preventDefault()
                changePathName("profile");
            },
        },
    }),
    chatComponent: chat({ id: 1235 }),
});
