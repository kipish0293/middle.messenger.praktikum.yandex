import "./profile.scss";
import {backApp } from "../../utils/routerChange";
import tmpl from "./profile.tmpl";
import Avatar from "../../components/avatar";
import Modal from "../../components/modal";
import Block from "../../helpers/block";
import Button from "../../components/button";
import LinkButton from "../../components/linkButton";
import EditProfile from "./components/editProfile";
import EditPassword from "./components/editPassword";
import BackStep from "./components/backStep";
import AuthController from "../../controllers/authorisation-controllers";
import UserControllers from "../../controllers/user-controllers";
import ChooseAvatar from "../../components/avatar/components/chooseAvatar";
import { BASE_RESOURCE_URL } from "../../utils/constants";

const editDataForm = new EditProfile({
    disabledInput: "disabled",
    events: {
        submit: async (event: Event) => {
            event.preventDefault();
            await UserControllers.profile(event.target!)
            profile.setProps({ isUserDataForm: true, editMode: false });
            editDataForm.setProps({ editMode: false, disabledInput: "disabled" });
        },
    },
    id: "profile-data-form",
    class: "edit-form",
});

const editPassForm = new EditPassword({
    events: {
        submit: async (event: Event) => {
            event.preventDefault();
            await UserControllers.password(event.target!)
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
            AuthController.logout()
        },
    },
});

const userAvatar = new Avatar({
    size: "medium",
    url: "",
    canChangeAvatar: true,
    events: {
        click: () => {
            modal.show()
        },
    },
});

const saveAvatarBtn = new Button({
    type: "submit",
    id: "change-avatar",
    name: "Сохранить",
});

const modalContent = new ChooseAvatar({
    button: saveAvatarBtn,
    events: {
        submit: async (event: Event) => {
            event.preventDefault()
            const fileInput = document.querySelector('#avatar-input') as HTMLInputElement
            if(fileInput && fileInput.files && fileInput.files.length > 0) {
                const file = fileInput.files[0]

                const formData = new FormData()
                formData.append('avatar', file)
                const result = await UserControllers.avatar(formData)
                //--------вынести эту логику в componentDidUpdate Profile???
                //обновил пропсы профиля
                profile.setProps({ userData: result });
                //обновил пропсы аватара
                const avatarUrl = BASE_RESOURCE_URL + result!.avatar
                userAvatar.setProps({ url: avatarUrl })
                modal.hide()
            } else {
                console.log('Файл не выбран')
                modal.hide()
            }
        }
    }
})

const modal = new Modal({
    modalContent: modalContent
});

const backStep = new BackStep({
    title: "Назад к списку чатов",
    events: {
        click: () => {
            profile.setProps({ isUserDataForm: true, editMode: false });
            editDataForm.setProps({ editMode: false, disabledInput: "disabled" });
            backApp();
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
        const result = await AuthController.user()

        this.setProps({ userData: result });
        editDataForm.setProps({ userData: result });
        const avatarUrl = BASE_RESOURCE_URL + result!.avatar
        userAvatar.setProps({ url: avatarUrl })
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
