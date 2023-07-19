import "./authorisation.scss";
import tmpl from "./authorisation.tmpl";
import { changePathName } from "../../utils/changePatrhName";
import serializedForm from "../../utils/serializedForm";
import Block from "../../helpers/block";
import Input from "../../components/input";
import Button from "../../components/button";
import LinkButton from "../../components/linkButton";

function authoriseFormHandler(event: Event) {
    event.preventDefault();

    const result = serializedForm(event.target);
    console.log(result);
    // Заглушка - авторизация в приложении
    localStorage.setItem("auth", "authorized");
    changePathName("chats");
}

class AuthPage extends Block {
    constructor(props: any) {
        super("div", props);
    }

    render() {
        return this.compile(tmpl, { button: this.props!.button, inputs: this.props!.inputs, linkButton: this.props!.linkButton });
    }
}

const button = new Button({
    type: "submit",
    id: "auth-submit",
    name: "Авторизоваться",
});

const inputs = [
    {
        name: "login",
        label: "Логин",
        type: "text",
        placeholder: "Введите логин",
        value: "",
        disabled: "",
        required: "required",
    },
    {
        name: "password",
        label: "Пароль",
        type: "password",
        placeholder: "Введите пароль",
        value: "",
        disabled: "",
        required: "required",
    },
].map((inp) => new Input({ ...inp }));

const linkButton = new LinkButton({
    name: "Нет аккаунта?",
    events: {
        click: (event: Event): void => {
            event.preventDefault();
            changePathName("registration");
        },
    },
});

export default new AuthPage({
    button,
    inputs,
    linkButton,
    events: {
        submit: (event: Event) => {
            authoriseFormHandler(event);
        },
    },
});
