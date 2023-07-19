import "./profile.scss";
import { changePathName } from "../../utils/changePatrhName";
import tmpl from "./profile.tmpl";
import Avatar from "../../components/avatar";
import Modal from "../../components/modal";
import Block from "../../helpers/block";
import Button from "../../components/button";
import LinkButton from "../../components/linkButton";
import EditProfile from "./components/editProfile";
import serializeForm from '../../utils/serializedForm';
import EditPassword from "./components/editPassword";

function saveUserData(event: Event) {
    event.preventDefault();
    const result = serializeForm(event.target);
    console.log(result);
    // editDataMode - завязать логику запроса на сервер по этому флагу
    // логика обновления данных с сервера
    profile.setProps({ isUserDataForm: true, editMode: false });
    editDataForm.setProps({ editMode: false });
}

const editDataForm = new EditProfile({
    events: {
        submit: (event: Event) => {
            event.preventDefault();
            saveUserData(event)
        },
    },
});


const editPassForm = new EditPassword({
    events: {
        submit: (event: Event) => {
            event.preventDefault();
            saveUserData(event)
        },
    },
});

const changeUserData = new LinkButton({
    name: "Изменить данные",
    events: {
        click: (event: Event): void => {
            event.preventDefault();
            editDataForm.setProps({ editMode: true });
            profile.setProps({ isUserDataForm: true, editMode: true });
        },
    },
});

const changeUserPass = new LinkButton({
    name: "Изменить пароль",
    events: {
        click: (event: Event): void => {
            event.preventDefault();
            profile.setProps({ isUserDataForm: false });
        },
    },
});

const logout = new LinkButton({
    name: "Выйти",
    events: {
        click: (event: Event): void => {
            event.preventDefault();
            localStorage.removeItem("auth");
            changePathName('')
        },
    },
});

const userAvatar = new Avatar({
    size: "medium",
    url: "https://i.stack.imgur.com/WXyZl.jpg",
    canChangeAvatar: true,
});

const modal = new Modal({
    button: new Button({
        type: "button",
        id: "accept",
        name: "Применить",
    }),
});

class Profile extends Block {
    constructor(props: any) {
        super("div", props);
    }

    render() {
        return this.compile(tmpl, { ...this.props });
    }
}

const profile = new Profile({
    isUserDataForm: true,
    editMode: false,
    backButtonTitle: "Назад к списку чатов",
    userAvatar,
    modal,
    editDataForm,
    editPassForm,
    changeUserData,
    changeUserPass,
    logout,
});

export default profile;

// const backStep = document.querySelector('#back-step');
// if (backStep !== null) {
//   backStep.addEventListener('click', () => {
//     editMode ? changeEditMode(true, false) : changePathName('chats');
//   });
// }
