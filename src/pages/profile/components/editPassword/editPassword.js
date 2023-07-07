import "./editPassword.scss";
import Handlebars from "handlebars";
import tmpl from "./editPassword.tmpl";
import input from "../../../../modules/input";
import button from "../../../../modules/button";

function changePass() {
    const template = Handlebars.compile(tmpl);
    return template({
        inputs: [
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
        ].map((inp) => input(inp)),
        button: button({
            type: "submit",
            id: "change-pass-btn",
            name: "Сохранить",
        }),
    });
}

export default changePass;
