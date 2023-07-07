import "./authorisation.scss";
import Handlebars from "handlebars";
import tmpl from "./authorisation.tmpl";
import { changePathName } from "../../utils/changePatrhName";
import serializeForm from "../../utils/serializedForm";
import input from "../../modules/input";
import button from "../../modules/button";

function authoriseFormHandler(e) {
    e.preventDefault();
    const data = serializeForm(e.target);

    //Заглушка - авторизация в приложении
    localStorage.setItem("auth", "authorized");
    changePathName("chats");
}

function authPage() {
    const template = Handlebars.compile(tmpl);
    const result = template({
        inputs: [
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
        ].map((inp) => input(inp)),
        button: button({
            type: "submit",
            id: "auth-submit",
            name: "Авторизоваться",
        }),
    });

    document.querySelector("#app").innerHTML = result;
    document.querySelector("#auth-form").addEventListener("submit", authoriseFormHandler);
    document.querySelector("#back-to-registration").addEventListener("click", () => changePathName("registration"));
}

export default authPage;
