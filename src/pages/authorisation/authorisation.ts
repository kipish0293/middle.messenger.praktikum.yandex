import "./authorisation.scss";
import tmpl from "./authorisation.tmpl";
import { changePathName } from "../../utils/changePatrhName";
import serializeForm from "../../utils/serializeForm";
import Block from "../../helpers/block";
import Button from "../../components/button";
import LinkButton from "../../components/linkButton";
import InputTemplate from "../../components/inputTemplate";
import Input from "../../components/input/input";
import InputLabel from "../../components/inputLabel";
import { validatorForm, validatorInput } from "../../utils/validators";

function authoriseFormHandler(event: Event) {
    event.preventDefault();

    const {formData, inputElements} = serializeForm(event.target);
    const hasError = validatorForm(inputElements)
    console.log(`HasError: ${hasError}, formData: ${formData}`);
    // Заглушка - авторизация в приложении
    if(hasError) {
        return
    }
    localStorage.setItem("auth", "authorized");
    changePathName("chats");
}

class AuthPage extends Block {
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
        required: "required",
    },
    {
        name: "password",
        label: "Пароль",
        type: "password",
        placeholder: "Введите пароль",
        value: "",
        required: "required",
    },
].map(
    (inp) =>
        new InputTemplate({
            input: new Input({
                ...inp,
                events: {
                    blur: (event: Event) => {
                        const inputElement = event.target as HTMLInputElement;
                        validatorInput(inputElement)
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
