import "./editProfile.scss";
import tmpl from "./editProfile.tmpl";
import Block from "../../../../helpers/block";
import Button from "../../../../components/button";
import Input from "../../../../components/input";

const button = new Button({
    type: "submit",
    id: "edit-profile-btn",
    name: "Сохранить",
});

const inputs = [
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
        name: "display_name",
        label: "Имя в чате",
        type: "text",
        placeholder: "Введите имя в чате",
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
].map((inp) => new Input({ ...inp }));

export default class EditProfile extends Block {
    constructor(props: any) {
        super("div", { inputs, button, ...props });

        this.loadUserData();
    }

    async loadUserData() {
        // логика запроса на сервер
        const response: Record<string, any> = await new Promise((res) => {
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

        inputs.map((inp) =>
            inp.setProps({
                ...inp,
                value: response[inp.props.name],
                disabled: this.props.disabledInput,
            })
        );
    }

    componentDidUpdate(): boolean {
        inputs.map((inp) => inp.setProps({ ...inp, disabled: this.props.disabledInput }));
        return true;
    }

    render() {
        return this.compile(tmpl, { ...this.props });
    }
}
