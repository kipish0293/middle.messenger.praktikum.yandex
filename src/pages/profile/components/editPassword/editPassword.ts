import "./editPassword.scss";
import tmpl from "./editPassword.tmpl";
import Block from "../../../../helpers/block";
import Button from "../../../../components/button";
import Input from "../../../../components/input";
import inputTemplate from "../../../../components/inputTemplate";
import InputLabel from "../../../../components/inputLabel";

const button = new Button({
    type: "submit",
    id: "change-pass-btn",
    name: "Сохранить",
});

const inputs = [
    {
        name: "oldPassword",
        label: "Новый пароль",
        type: "password",
        placeholder: "Введите новый пароль",
        value: "",
        required: "required",
    },
    {
        name: "newPassword",
        label: "Новый пароль",
        type: "password",
        placeholder: "Введите новый пароль",
        value: "",
        required: "required",
    },
    {
        name: "newPassword_1",
        label: "Повторите новый пароль",
        type: "password",
        placeholder: "Введите новый пароль (еще раз)",
        value: "",
        required: "required",
    },
].map((inp) => new inputTemplate({
    input: new Input({
        ...inp,
        events: {
            blur: (event: Event) => {
                const inputElement = event.target as HTMLInputElement;
                const inputValue = inputElement.value;
                console.log(inputValue)
            }
        },
        class: "text-field__input"
    }),
    label: new InputLabel({
        name: inp.name,
        label: inp.label
    }),
    class: "text-field"
}));

export default class EditPassword extends Block {
    constructor(props: any) {
        super("form", { inputs, button, ...props });
    }

    render() {
        return this.compile(tmpl, { ...this.props });
    }
}
