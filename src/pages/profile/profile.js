import "./profile.scss";
import Handlebars from "handlebars";
import { changePathName } from "../../utils/changePatrhName";
import tmpl from "./profile.tmpl";
import editProfile from "./components/editProfile";
import editPassword from "./components/editPassword";
import avatar from "../../modules/avatar";
import { modal } from "../modal/modal";

let editDataMode = true;
let editMode = false;
let changeAvatar = false;
let userData = {};

function changeEditMode(isDataMode, editModeOn = true) {
    editDataMode = isDataMode;
    editMode = editModeOn;
    profilePage();
}

async function loadUserData() {
    //логика запроса на сервер
    userData = await new Promise((res) => {
        setTimeout(() => {
            res({
                first_name: "Pavel",
                second_name: "Martynov",
                display_name: "CowBoy bibop",
                login: "123456",
                email: "pavel-martynov@ya.ru",
                phone: "79008001234",
            });
        }, 200);
    });
}

function saveUserData(e) {
    e.preventDefault();
    // editDataMode - завязать логику запроса на сервер по этому флагу
    // логика обновления данных с сервера
    changeEditMode(true, false);
}

async function profilePage() {
    await loadUserData();
    const template = Handlebars.compile(tmpl);
    const result = template({
        userData: userData,
        editDataMode: editDataMode,
        editMode: editMode,
        disabledInputs: editMode ? "" : "disabled",
        editProfileForm: editProfile({
            userData: userData,
            disabledInputs: editMode ? "" : "disabled",
            editMode: editMode,
        }),
        backButtonTitle: editMode ? "Назад в профиль" : "Назад к списку чатов",
        editPasswordForm: editPassword({}),
        userAvatar: avatar({ size: "medium", url: "https://i.stack.imgur.com/WXyZl.jpg", canChangeAvatar: true }),
        changeAvatar: changeAvatar,
        modal: modal(),
    });

    document.querySelector("#app").innerHTML = result;

    document.querySelector(".avatar_changable") &&
        document.querySelector(".avatar_changable").addEventListener("click", () => {
            //запуск модалки
            let modal = document.querySelector("#modal");
            let modalOverlay = document.querySelector("#modal-overlay");
            modal.classList.toggle("open");
            modalOverlay.classList.toggle("open");
        });

    document.querySelector("#close-modal-btn") &&
        document.querySelector("#close-modal-btn").addEventListener("click", () => {
            //закрытие модалки
            let modal = document.querySelector("#modal");
            let modalOverlay = document.querySelector("#modal-overlay");
            modal.classList.toggle("open");
            modalOverlay.classList.toggle("open");
        });

    document.querySelector("#change-data") &&
        document.querySelector("#change-data").addEventListener("click", (e) => {
            e.preventDefault();
            changeEditMode(true, true);
        });
    document.querySelector("#change-password") &&
        document.querySelector("#change-password").addEventListener("click", (e) => {
            e.preventDefault();
            changeEditMode(false, true);
        });

    document.querySelector("#profile-data-form") &&
        document.querySelector("#profile-data-form").addEventListener("submit", saveUserData);
    document.querySelector("#profile-pass-form") &&
        document.querySelector("#profile-pass-form").addEventListener("submit", saveUserData);

    document.querySelector("#back-step") &&
        document.querySelector("#back-step").addEventListener("click", () => {
            editMode ? changeEditMode(true, false) : changePathName("chats");
        });
    document.querySelector("#logout") &&
        document.querySelector("#logout").addEventListener("click", () => {
            localStorage.removeItem("auth");
            baseRouter();
        });
}

export default profilePage;
