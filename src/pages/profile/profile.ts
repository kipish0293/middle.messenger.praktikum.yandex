import "./profile.scss";
import { backApp } from "../../utils/routerChange";
import tmpl from "./profile.tmpl";
import Avatar from "../../components/avatar";
import Modal from "../../components/modal";
import Block from "../../helpers/block";
import Button from "../../components/button";
import LinkButton from "../../components/linkButton";
import EditProfile from "./components/editProfile";
import EditPassword from "./components/editPassword";
import BackStep from "./components/backStep";
import AuthController from "../../controllers/authorisation-controller";
import UserController from "../../controllers/user-controller";
import ChooseAvatar from "../../components/avatar/components/chooseAvatar";
import { BASE_RESOURCE_URL } from "../../utils/constants";
import { connect } from "../../utils/connect";

const editDataForm = new EditProfile({
    disabledInput: "disabled",
    events: {
        submit: async (event: Event) => {
            event.preventDefault();
            await UserController.profile(event.target!);
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
            await UserController.password(event.target!);
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
            editDataForm.show()
            editPassForm.hide()
        },
    },
});

const changeUserPass = new LinkButton({
    name: "Изменить пароль",
    events: {
        click: (event: Event): void => {
            event.preventDefault();
            editDataForm.hide()
            editPassForm.show()
        },
    },
});

const logout = new LinkButton({
    name: "Выйти",
    events: {
        click: (event: Event): void => {
            event.preventDefault();
            AuthController.logout();
        },
    },
});

const userAvatar = new Avatar({
    size: "medium",
    url: "",
    canChangeAvatar: true,
    events: {
        click: () => {
            modal.show();
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
            event.preventDefault();
            const fileInput = document.querySelector("#avatar-input") as HTMLInputElement;
            if (fileInput && fileInput.files && fileInput.files.length > 0) {
                const file = fileInput.files[0];

                const formData = new FormData();
                formData.append("avatar", file);
                const result = await UserController.avatar(formData);
                //обновил пропсы аватара
                const avatarUrl = BASE_RESOURCE_URL + result!.avatar;
                userAvatar.setProps({ url: avatarUrl });
                modal.hide();
            } else {
                console.log("Файл не выбран");
                modal.hide();
            }
        },
    },
});

const modal = new Modal({
    modalContent: modalContent,
});

const backStep = new BackStep({
    title: "Назад к списку чатов",
    events: {
        click: () => {
            // profile.setProps({ isUserDataForm: true, editMode: false });
            editDataForm.setProps({ editMode: false, disabledInput: "disabled" });
            editDataForm.show()
            editPassForm.hide()
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
        await AuthController.user();

        this.setProps({ userData: this.props.user });
        editDataForm.setProps({ userData: this.props.user });
        const avatarUrl = BASE_RESOURCE_URL + this.props.user!.avatar;
        userAvatar.setProps({ url: avatarUrl });
    }

    render() {
        return this.compile(tmpl, { ...this.props });
    }
}

const ProfileWithStore = connect((state) => ({ user: state.user }))(Profile);

export default () =>
    new ProfileWithStore({
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
