import "./editProfile.scss";
import tmpl from "./editProfile.tmpl";
import Block from "../../../../helpers/block";
import Button from "../../../../components/button";
import Input from "../../../../components/input";
import InputTemplate from "../../../../components/inputTemplate";
import InputLabel from "../../../../components/inputLabel";
import { validatorInput } from "../../../../utils/validators";

const button = new Button({
    type: "submit",
    id: "edit-profile-btn",
    name: "Сохранить",
});

const inputTemplate = [
    {
        name: "email",
        label: "Почта",
        type: "email",
        placeholder: "Введите почту",
        required: "required",
    },
    {
        name: "login",
        label: "Логин",
        type: "text",
        placeholder: "Введите логин",
        required: "required",
    },
    {
        name: "first_name",
        label: "Имя",
        type: "text",
        placeholder: "Введите имя",
        required: "required",
    },
    {
        name: "second_name",
        label: "Фамилия",
        type: "text",
        placeholder: "Введите фамилию",
        required: "required",
    },
    {
        name: "display_name",
        label: "Имя в чате",
        type: "text",
        placeholder: "Введите имя в чате",
        required: "required",
    },
    {
        name: "phone",
        label: "Телефон",
        type: "tel",
        placeholder: "+7(000)000-00-00",
        required: "required",
    },
].map(
    (inp) =>
        new InputTemplate({
            input: new Input({
                ...inp,
                events: {
                    blur: (event: Event) => {
                        const inputElement = event.target as HTMLInputElement;
                        validatorInput(inputElement)
                    },
                },
                class: "text-field__input",
            }),
            label: new InputLabel({
                name: inp.name,
                label: inp.label,
            }),
            class: "text-field",
        })
);

export default class EditProfile extends Block {
    constructor(props: any) {
        super("form", { inputTemplate, button, userData: null, ...props });
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        inputTemplate.map((templ) => {
            const input = templ.children.input as Block;
            const inputName = input.props.name;
            const newData: Record<string, any> = { value: this.props.userData[inputName] };

            if (this.props.disabledInput) {
                newData.disabled = "disabled";
            } else {
                delete input.props.disabled;
            }

            input.setProps(newData);
        });

        return super.componentDidUpdate(oldProps, newProps);
    }

    render() {
        return this.compile(tmpl, { ...this.props });
    }
}
