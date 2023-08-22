import "./registration.scss";
import {goApp, PATHS } from "../../utils/routerChange";
import tmpl from "./registration.tmpl";
import Button from "../../components/button";
import Input from "../../components/input";
import Block from "../../helpers/block";
import LinkButton from "../../components/linkButton";
import inputTemplate from "../../components/inputTemplate";
import InputLabel from "../../components/inputLabel";
import { validatorInput } from "../../utils/validators";
import AuthController from "../../controllers/authorisation-controller";

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
        required: "required",
    },
    {
        name: "login",
        label: "Логин",
        type: "text",
        placeholder: "Введите логин",
        required: "required",
    },
    {
        name: "first_name",
        label: "Имя",
        type: "text",
        placeholder: "Введите имя",
        required: "required",
    },
    {
        name: "second_name",
        label: "Фамилия",
        type: "text",
        placeholder: "Введите фамилию",
        required: "required",
    },
    {
        name: "phone",
        label: "Телефон",
        type: "tel",
        placeholder: "+7(000)000-00-00",
        required: "required",
    },
    {
        name: "password",
        label: "Пароль",
        type: "password",
        placeholder: "Введите пароль",
        required: "required",
    },
    {
        name: "password_2",
        label: "Пароль (еще раз)",
        type: "password",
        placeholder: "Введите пароль еще раз",
        required: "required",
    },
].map(
    (inp) =>
        new inputTemplate({
            input: new Input({
                ...inp,
                events: {
                    blur: (event: Event) => {
                        const inputElement = event.target as HTMLInputElement;
                        validatorInput(inputElement);
                    },
                },
                class: "text-field__input",
            }),
            label: new InputLabel({
                name: inp.name,
                label: inp.label,
            }),
            class: "text-field",
        })
);

const linkButton = new LinkButton({
    name: "Войти",
    events: {
        click: (event: Event): void => {
            event.preventDefault();
            goApp(PATHS.AUTH);
        },
    },
});

export default () => new RegPage({
    button,
    inputs,
    linkButton,
    events: {
        submit: (event: Event) => {
            event.preventDefault()
            AuthController.singup(event.target!)
        },
    },
    class: "form_offer",
});
