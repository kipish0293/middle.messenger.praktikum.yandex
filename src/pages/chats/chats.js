import "./chats.scss";
import Handlebars from "handlebars";
import { changePathName } from "../../utils/changePatrhName";
import tmpl from "./chats.tmpl";
import chat from "./components/chat";
import avatar from "../../modules/avatar";

function chats() {
    const template = Handlebars.compile(tmpl);

    let currentChat = { id: 1235 };

    const result = template({
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
                chatIcon: avatar({ size: "small", url: "https://i.stack.imgur.com/WXyZl.jpg" }),
            },
            {
                id: 2,
                chatName: "Вадим",
                chatIcon: "",
                lastMessage: {
                    id: 2,
                    name: "Павел",
                    text: "Спасибо большое, было приятно познакомится!",
                    date: new Date(2023, 6, 12, 10, 45).toLocaleTimeString().slice(0, -3),
                },
                unreadMessageCount: 0,
                chatIcon: avatar({ size: "small", url: "https://i.stack.imgur.com/WXyZl.jpg" }),
            },
        ],
        chatComponent: chat({ id: currentChat.id }),
    });

    document.querySelector("#app").innerHTML = result;
    document.querySelector("#go-to-profile").addEventListener("click", () => changePathName("profile"));
}

export default chats;
