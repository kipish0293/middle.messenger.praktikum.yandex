import "./registration.scss";
import Handlebars from "handlebars";
import { changePathName } from "../../utils/changePatrhName";
import tmpl from "./registration.tmpl";
import button from "../../modules/button";
import input from "../../modules/input";

function registrationFormHandler(e) {
    e.preventDefault();

    //Заглушка - регистрации в приложении
    localStorage.setItem("auth", "authorized");
    changePathName("chats");
}

function regPage() {
    const template = Handlebars.compile(tmpl);
    const result = template({
        inputs: [
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
        ].map((inp) => input(inp)),
        button: button({
            type: "submit",
            id: "reg-submit",
            name: "Зарегистрироваться",
        }),
    });

    document.querySelector("#app").innerHTML = result;
    document.querySelector("#reg-form").addEventListener("submit", registrationFormHandler);
    document.querySelector("#back-to-login").addEventListener("click", () => changePathName(""));
}

export default regPage;
