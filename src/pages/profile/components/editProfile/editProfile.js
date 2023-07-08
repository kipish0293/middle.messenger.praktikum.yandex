import "./editProfile.scss";
import Handlebars from "handlebars";
import tmpl from "./editProfile.tmpl";
import input from "../../../../modules/input";
import button from "../../../../modules/button";

function editProfile({ userData, disabledInputs, editMode }) {
    const template = Handlebars.compile(tmpl);

    const result = template({
        inputs: [
            {
                name: "email",
                label: "Почта",
                type: "email",
                placeholder: "Введите почту",
                value: userData.email,
                disabled: disabledInputs,
                required: "required",
            },
            {
                name: "login",
                label: "Логин",
                type: "text",
                placeholder: "Введите логин",
                value: userData.login,
                disabled: disabledInputs,
                required: "required",
            },
            {
                name: "first_name",
                label: "Имя",
                type: "text",
                placeholder: "Введите имя",
                value: userData.first_name,
                disabled: disabledInputs,
                required: "required",
            },
            {
                name: "second_name",
                label: "Фамилия",
                type: "text",
                placeholder: "Введите фамилию",
                value: userData.second_name,
                disabled: disabledInputs,
                required: "required",
            },
            {
                name: "display_name",
                label: "Имя в чате",
                type: "text",
                placeholder: "Введите имя в чате",
                value: userData.display_name,
                disabled: disabledInputs,
                required: "required",
            },
            {
                name: "phone",
                label: "Телефон",
                type: "tel",
                placeholder: "+7(000)000-00-00",
                value: userData.phone,
                disabled: disabledInputs,
                required: "required",
            },
        ].map((inp) => input(inp)),
        button: button({
            type: "submit",
            id: "edit-profile-btn",
            name: "Сохранить",
        }),
        editMode,
    });
    return result;
}

export default editProfile;
