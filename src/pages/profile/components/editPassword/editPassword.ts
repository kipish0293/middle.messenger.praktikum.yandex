import "./editPassword.scss";
import tmpl from "./editPassword.tmpl";
import Block from "../../../../helpers/block";
import Button from "../../../../components/button";
import Input from "../../../../components/input";

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
        disabled: "",
        required: "required",
    },
    {
        name: "newPassword",
        label: "Новый пароль",
        type: "password",
        placeholder: "Введите новый пароль",
        value: "",
        disabled: "",
        required: "required",
    },
    {
        name: "newPassword_1",
        label: "Повторите новый пароль",
        type: "password",
        placeholder: "Введите новый пароль (еще раз)",
        value: "",
        disabled: "",
        required: "required",
    },
].map((inp) => new Input({ ...inp }));

export default class EditPassword extends Block {
    constructor(props: any) {
        super("div", { inputs, button, ...props });
    }

    render() {
        return this.compile(tmpl, { ...this.props });
    }
}
