import "./authorisation.scss";
import tmpl from "./authorisation.tmpl";
import { goApp, PATHS } from "../../utils/routerChange";
import Block from "../../helpers/block";
import Button from "../../components/button";
import LinkButton from "../../components/linkButton";
import InputTemplate from "../../components/inputTemplate";
import Input from "../../components/input/input";
import InputLabel from "../../components/inputLabel";
import { validatorInput } from "../../utils/validators";
import AuthController from "../../controllers/authorisation-controller";

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
    name: "Нет аккаунта?",
    events: {
        click: (event: Event): void => {
            event.preventDefault();
            goApp(PATHS.REG);
        },
    },
});

export default () =>
    new AuthPage({
        button,
        inputs,
        linkButton,
        events: {
            submit: (event: Event) => {
                event.preventDefault();
                AuthController.signin(event.target!);
            },
        },
    });
