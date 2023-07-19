import "./registration.scss";
import { changePathName } from "../../utils/changePatrhName";
import tmpl from "./registration.tmpl";
import Button from "../../components/button";
import Input from "../../components/input";
import serializedForm from "../../utils/serializedForm";
import Block from "../../helpers/block";
import LinkButton from "../../components/linkButton";

function registrationFormHandler(event: Event) {
    event.preventDefault();

    const result = serializedForm(event.target);
    console.log(result);

    // Заглушка - регистрации в приложении
    localStorage.setItem("auth", "authorized");
    changePathName("chats");
}

class RegPage extends Block {
    constructor(props: any) {
        super("div", props);
    }

    render() {
        return this.compile(tmpl, {
            button: this.props!.button,
            inputs: this.props!.inputs,
            linkButton: this.props!.linkButton,
        });
    }
}

const button = new Button({
    type: "submit",
    id: "reg-submit",
    name: "Зарегистрироваться",
});
const inputs = [
    {
        name: "email",
        label: "Почта",
        type: "email",
        placeholder: "Введите почту",
        value: "",
        disabled: "",
        required: "required",
    },
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
        name: "first_name",
        label: "Имя",
        type: "text",
        placeholder: "Введите имя",
        value: "",
        disabled: "",
        required: "required",
    },
    {
        name: "second_name",
        label: "Фамилия",
        type: "text",
        placeholder: "Введите фамилию",
        value: "",
        disabled: "",
        required: "required",
    },
    {
        name: "phone",
        label: "Телефон",
        type: "tel",
        placeholder: "+7(000)000-00-00",
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
    {
        name: "password_2",
        label: "Пароль (еще раз)",
        type: "password",
        placeholder: "Введите пароль еще раз",
        value: "",
        disabled: "",
        required: "required",
    },
].map((inp) => new Input({ ...inp }));
const linkButton = new LinkButton({
    name: "Войти",
    events: {
        click: (event: Event): void => {
            event.preventDefault();
            changePathName("authorisation");
        },
    },
});

export default new RegPage({
    button,
    inputs,
    linkButton,
    events: {
        submit: (event: Event) => {
            registrationFormHandler(event);
        },
    },
});
