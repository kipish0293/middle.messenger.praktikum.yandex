import "./profile.scss";
import { changePathName } from "../../utils/changePatrhName";
import tmpl from "./profile.tmpl";
import Avatar from "../../components/avatar";
import Modal from "../../components/modal";
import Block from "../../helpers/block";
import Button from "../../components/button";
import LinkButton from "../../components/linkButton";
import EditProfile from "./components/editProfile";
import serializeForm from "../../utils/serializeForm";
import EditPassword from "./components/editPassword";
import BackStep from "./components/backStep";
import { validatorForm } from "../../utils/validators";

function saveUserData(event: Event) {
    event.preventDefault();
    const {formData, inputElements} = serializeForm(event.target);
    const hasError = validatorForm(inputElements)
    console.log(`HasError: ${hasError}, formData: ${formData}`);
    if(hasError) {
        return
    }
    // editDataMode - завязать логику запроса на сервер по этому флагу
    // логика обновления данных с сервера
    profile.setProps({ isUserDataForm: true, editMode: false });
    editDataForm.setProps({ editMode: false, disabledInput: "disabled" });
}

function changeAvatar() {
    const modal = document.querySelector("#modal");
    const modalOverlay = document.querySelector("#modal-overlay");
    modal?.classList.toggle("open");
    modalOverlay?.classList.toggle("open");
}

const editDataForm = new EditProfile({
    disabledInput: "disabled",
    events: {
        submit: (event: Event) => {
            event.preventDefault();
            saveUserData(event);
        },
    },
    id: "profile-data-form",
    class: "edit-form",
});

const editPassForm = new EditPassword({
    events: {
        submit: (event: Event) => {
            event.preventDefault();
            saveUserData(event);
        },
    },
    class: "profile-pass-form",
});

const changeUserData = new LinkButton({
    name: "Изменить данные",
    events: {
        click: (event: Event): void => {
            event.preventDefault();
            editDataForm.setProps({ editMode: true, disabledInput: null });
            profile.setProps({ isUserDataForm: true, editMode: true });
        },
    },
});

const changeUserPass = new LinkButton({
    name: "Изменить пароль",
    events: {
        click: (event: Event): void => {
            event.preventDefault();
            profile.setProps({ isUserDataForm: false, editMode: true, disabledInput: "disabled" });
        },
    },
});

const logout = new LinkButton({
    name: "Выйти",
    events: {
        click: (event: Event): void => {
            event.preventDefault();
            localStorage.removeItem("auth");
            changePathName("");
        },
    },
});

const userAvatar = new Avatar({
    size: "medium",
    url: "https://i.stack.imgur.com/WXyZl.jpg",
    canChangeAvatar: true,
    events: {
        click: () => {
            changeAvatar();
        },
    },
});

const modal = new Modal({
    button: new Button({
        type: "button",
        id: "accept",
        name: "Применить",
        events: {
            click: () => {
                changeAvatar();
            },
        },
    }),
});

const backStep = new BackStep({
    title: "Назад к списку чатов",
    events: {
        click: () => {
            profile.setProps({ isUserDataForm: true, editMode: false });
            editDataForm.setProps({ editMode: false, disabledInput: "disabled" });
            changePathName("chats");
        },
    },
    class: "back-step",
    id: "back-step",
});

class Profile extends Block {
    constructor(props: any) {
        super("div", { userData: null, ...props });
        this.loadUserData();
    }

    async loadUserData() {
        // логика запроса на сервер
        const userData: Record<string, any> = await new Promise((res) => {
            setTimeout(() => {
                res({
                    first_name: "Pavel",
                    second_name: "Martynov",
                    display_name: "CowBoy bibop",
                    login: "123456",
                    email: "pavel-martynov@ya.ru",
                    phone: "79008001234",
                });
            }, 1000);
        });

        this.setProps({ userData: userData });
        editDataForm.setProps({ userData: userData });
    }

    render() {
        return this.compile(tmpl, { ...this.props });
    }
}

const profile = new Profile({
    isUserDataForm: true,
    editMode: false,
    userAvatar,
    modal,
    editDataForm,
    editPassForm,
    changeUserData,
    changeUserPass,
    backStep,
    logout,
});

export default profile;
