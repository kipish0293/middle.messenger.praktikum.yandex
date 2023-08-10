import { debounce } from "./../../utils/heplerFunction";
import "./chats.scss";
import tmpl from "./chats.tmpl";
import Chat from "./components/chat";
import ChatItem from "./components/chatItem";
import Avatar from "../../components/avatar";
import LinkButton from "../../components/linkButton";
import Block from "../../helpers/block";
import { goApp, PATHS } from "../../utils/routerChange";
import Search from "../../components/search/search";
import ChatFooter from "./components/chatFooter/chatFooter";
import serializeForm from "../../utils/serializeForm";
import { validatorForm } from "../../utils/validators";
import Input from "../../components/input";
import { connect } from "../../utils/connect";
import ChatController from "../../controllers/chat-controller";
import { BASE_RESOURCE_URL } from "../../utils/constants";
import CreateChatIcon from "./components/createChatIcon/createChatIcon";
import Modal from "../../components/modal";
import Button from "../../components/button/button";
import OneTextfieldForm from "./components/oneTextfieldForm";
import InputTemplate from "../../components/inputTemplate/inputTemplate";
import InputLabel from "../../components/inputLabel/inputLabel";
import { isEqual } from "../../utils/heplerFunction";
import UserController from "../../controllers/user-controller";
import AddUsersForm from "./components/addUsersForm/addUsersForm";
import store from "../../helpers/store";
import RemoveUsersForm from "./components/removeUsersForm/removeUsersForm";
import AuthController from "../../controllers/authorisation-controller";

// window.takeaway = () => ChatController.createChat({title: "Третий Новый чат, созданный вручную"})

class ChatsPage extends Block {
    constructor(props: any) {
        super("div", props);
        this.loadChats();
    }

    public async loadChats() {
        await ChatController.getChats({ limit: 100 });
        await AuthController.user();
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        if (!isEqual(oldProps?.chat || {}, newProps?.chat || {})) {
            const prepareChatList = newProps?.chat?.chatList.map((it: Record<string, any>) => {
                const newUrl = it.avatar ? BASE_RESOURCE_URL + it.avatar : "";
                return new ChatItem({
                    ...it,
                    avatar: new Avatar({ size: "small", url: newUrl }),
                    events: {
                        click: () => {
                            store.set("chat.currentChatId", it.id);
                            chatComponent.setProps({
                                avatar: new Avatar({ size: "small", url: newUrl }),
                                currentChatId: it.id,
                                chatName: it.title,
                                update: true,
                            });
                            modalRemoveUserInChatContent.setProps({ update: true });
                        },
                    },
                    class: "chats_chatitem",
                    id: `chat_item_${it.id}`,
                });
            });
            this.setProps({ chatList: prepareChatList });
        }
        return !isEqual(oldProps?.chat || {}, newProps?.chat || {});
    }

    render() {
        return this.compile(tmpl, { ...this.props });
    }
}

const linkButton = new LinkButton({
    name: "Профиль >",
    events: {
        click: (event: Event): void => {
            event.preventDefault();
            goApp(PATHS.SET);
        },
    },
});

const search = new Search({
    events: {
        input: debounce(async (event: Event) => {
            const inputElement = event.target as HTMLInputElement;
            const inputValue = inputElement.value;
            await ChatController.getChats({ limit: 100, title: inputValue });
        }, 500),
    },
});

const ChatWithStore = connect((state) => ({
    state: { user: state.user, socket: state.socket, messages: state.messages },
}))(Chat);

const chatComponent = new ChatWithStore({
    addUser: new CreateChatIcon({
        iconName: "group_add",
        class: "material-icons group_add",
        title: "Добавить пользователя",
        events: {
            click: () => {
                modal.setProps({ modalContent: modalAddUserInChatContent });
                modal.show();
            },
        },
    }),
    deleteUser: new CreateChatIcon({
        iconName: "group_remove",
        class: "material-icons group_remove",
        title: "Удалить",
        events: {
            click: () => {
                modalRemoveUserInChatContent.setProps({ update: true });
                modal.setProps({ modalContent: modalRemoveUserInChatContent });
                modal.show();
            },
        },
    }),
    chatFooter: new ChatFooter({
        input: new Input({
            class: "chat-footer__input",
            name: "message",
            placeholder: "Сообщение",
        }),
        label: new InputLabel({
            name: "message",
            label: "Сообщение",
            class: "chat-footer__label",
        }),
        class: "chat-footer",
        events: {
            submit: (event: Event) => {
                event.preventDefault();
                const { formData, inputElements } = serializeForm(event.target);
                const hasError = validatorForm(inputElements);
                if (hasError) {
                    return;
                }

                const socket = store.getState().socket;
                const chatId = store.getState().chat.currentChatId;

                const prepareData = {
                    type: "message",
                    content: formData.message,
                };
                const currentSocket = socket[chatId];
                currentSocket.send(prepareData);

                //очистка поля ввода
                setTimeout(() => {
                    const inputRef = document.querySelector(".chat-footer__input") as HTMLInputElement;
                    inputRef.value = "";
                    inputRef.focus();
                    inputRef.select();
                }, 300);
            },
        },
    }),
});

const inputAddUser = new InputTemplate({
    input: new Input({
        name: "login",
        class: "text-field__input",
        events: {
            input: debounce(async (event: Event) => {
                const { value } = event.target as any;
                const data = { login: value };
                const res = await UserController.search(data);
                if (res) {
                    const userList = res.map((i: Record<string, any>) => {
                        return new InputTemplate({
                            input: new Input({
                                name: i.id,
                                type: "checkbox",
                                value: i.id,
                                placeholder: `${i.first_name} ${i.second_name}`,
                            }),
                            label: new InputLabel({
                                name: "",
                                label: `${i.first_name} ${i.second_name}`,
                            }),
                            class: "text-field",
                        });
                    });

                    modalAddUserInChatContent.setProps({ userList });
                }
            }, 1000),
        },
    }),
    label: new InputLabel({
        name: "Добавить пользователя",
        label: "Добавить пользователя",
    }),
    class: "text-field",
});

const modalAddUserInChatContent = new AddUsersForm({
    class: "add-user-form",
    input: inputAddUser,
    button: new Button({
        type: "submit",
        id: "add-user-in-chat",
        name: "Добавить",
    }),
    events: {
        submit: async (event: Event) => {
            event.preventDefault();
            const { formData } = serializeForm(event.target);
            const userIds = Object.entries(formData).reduce((acc: any[], [key, value]) => {
                if ((!value && typeof value === "boolean") || typeof value !== "boolean") {
                    return acc;
                }
                return [...acc, key];
            }, []);

            const chatID = store.getState().chat.currentChatId;
            const prepareData = {
                chatId: chatID,
                users: userIds,
            };
            await ChatController.addUsers(prepareData);

            modal.setProps({ modalContent: null });
            modal.hide();
        },
    },
});

const RemoveUsersFormWithStore = connect((state) => ({ chat: { ...state.chat } }))(RemoveUsersForm);

const modalRemoveUserInChatContent = new RemoveUsersFormWithStore({
    class: "remove-user-form",
    button: new Button({
        type: "submit",
        id: "remove-user-in-chat",
        name: "Удалить пользователей",
    }),
    events: {
        submit: async (event: Event) => {
            event.preventDefault();
            const { formData } = serializeForm(event.target);
            const userIds = Object.entries(formData).reduce((acc: any[], [key, value]) => {
                if ((!value && typeof value === "boolean") || typeof value !== "boolean") {
                    return acc;
                }
                return [...acc, key];
            }, []);

            const chatID = store.getState().chat.currentChatId;

            const prepareData = {
                chatId: chatID,
                users: userIds,
            };
            await ChatController.deleteChatUsers(prepareData);

            modal.setProps({ modalContent: null });
            modal.hide();
        },
    },
});

const modalCreateChatContent = new OneTextfieldForm({
    class: "one-textfield-form",
    input: new InputTemplate({
        input: new Input({
            name: "title",
            class: "text-field__input",
        }),
        label: new InputLabel({
            name: "Название чата",
            label: "Название чата",
        }),
        class: "text-field",
    }),
    button: new Button({
        type: "submit",
        id: "create-chat",
        name: "Создать",
    }),
    events: {
        submit: async (event: Event) => {
            event.preventDefault();
            const { formData } = serializeForm(event.target);
            await ChatController.createChat(formData);
            await ChatController.getChats({ limit: 100 });
            modal.setProps({ modalContent: null });
            modal.hide();
        },
    },
});

const modal = new Modal({});

const createChat = new CreateChatIcon({
    iconName: "post_add",
    class: "material-icons post_add",
    title: "Создать новый чат",
    events: {
        click: () => {
            modal.setProps({ modalContent: modalCreateChatContent });
            modal.show();
        },
    },
});

const ChatsWithStore = connect((state) => ({ chat: { ...state.chat }, user: { ...state.user } }))(ChatsPage);

export default () =>
    new ChatsWithStore({
        linkButton,
        modal,
        createChat,
        search,
        chatComponent,
        class: "chats_offer",
    });
