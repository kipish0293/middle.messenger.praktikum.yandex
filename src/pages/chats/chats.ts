import "./chats.scss";
import tmpl from "./chats.tmpl";
import Chat from "./components/chat";
import ChatItem from "./components/chatItem";
import Avatar from "../../components/avatar";
import LinkButton from "../../components/linkButton";
import Block from "../../helpers/block";
import { changePathName } from "../../utils/changePatrhName";
import Search from "../../components/search/search";
import ChatFooter from "./components/chatFooter/chatFooter";
import serializeForm from "../../utils/serializeForm";
import { validatorForm, validatorInput } from "../../utils/validators";
import Input from "../../components/input";

class ChatsPage extends Block {
    constructor(props: any) {
        super("div", props);
    }

    componentDidMount(): void {
        chatComponent.setProps({ userId: this.props.userId });
    }

    render() {
        return this.compile(tmpl, { ...this.props });
    }
}

const chatsList = [
    {
        id: "11sd41df2334",
        chatName: "Андрей",
        lastMessage: {
            id: 1,
            name: "Андрей",
            text: "ОГО!! очень круто!",
            date: new Date(2023, 6, 12, 10, 36).toLocaleTimeString().slice(0, -3),
        },
        unreadMessageCount: 2,
        chatIcon: new Avatar({ size: "small", url: "https://i.stack.imgur.com/WXyZl.jpg" }),
        chatIconUrl: "https://i.stack.imgur.com/WXyZl.jpg",
    },
    {
        id: "31se312ff2",
        chatName: "Вадим",
        lastMessage: {
            id: 2,
            name: "Павел",
            text: "Спасибо большое, было приятно познакомится!",
            date: new Date(2023, 6, 12, 10, 45).toLocaleTimeString().slice(0, -3),
        },
        unreadMessageCount: 0,
        chatIcon: new Avatar({
            size: "small",
            url: "https://fanfics.me/images/fandoms_heroes/171-1448744486.jpg",
        }),
        chatIconUrl: "https://fanfics.me/images/fandoms_heroes/171-1448744486.jpg",
    },
].map(
    (it) =>
        new ChatItem({
            ...it,
            events: {
                click: () => {
                    chatComponent.setProps({
                        chatId: it.id,
                        chatAvatar: new Avatar({ size: "small", url: it.chatIconUrl }),
                        chatName: it.chatName,
                    });
                },
            },
            class: "chats_chatitem",
            id: `chat_item_${it.id}`,
        })
);

const linkButton = new LinkButton({
    name: "Профиль >",
    events: {
        click: (event: Event): void => {
            event.preventDefault();
            changePathName("profile");
        },
    },
});

const search = new Search({
    events: {
        input: (event: Event) => {
            if (event) {
                const inputElement = event.target as HTMLInputElement;
                const inputValue = inputElement.value;
                console.log(inputValue);
            }
        },
    },
});

const chatComponent = new Chat({
    chatFooter: new ChatFooter({
        input: new Input({
            events: {
                blur: (event: Event) => {
                    const inputElement = event.target as HTMLInputElement;
                    validatorInput(inputElement)
                },
            },
            class: "chat-footer__input",
            name: "message",
            placeholder: "Сообщение"
        }),
        class: "chat-footer",
        events: {
            submit: (event: Event) => {
                event.preventDefault();
                const {formData, inputElements} = serializeForm(event.target);
                const hasError = validatorForm(inputElements)
                console.log(`HasError: ${hasError}, formData: ${formData}`);
                if(hasError) {
                    return
                }
            },
        }
    }),
});

export default new ChatsPage({
    chatsList,
    linkButton,
    search,
    chatComponent,
    userId: 12345,
    class: "chats_offer",
});
