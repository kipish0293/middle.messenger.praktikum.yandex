import "./editProfile.scss";
import tmpl from "./editProfile.tmpl";
import Block from "../../../../helpers/block";
import Button from "../../../../components/button";
import Input from "../../../../components/input";

export default class EditProfile extends Block {
    static inputsList = [
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
    ]

    userData: any | null = null;

    constructor(props: any) {
        const button = new Button({
            type: "submit",
            id: "edit-profile-btn",
            name: "Сохранить",
        });

        const inputs = EditProfile.inputsList.map((inp) => new Input({ ...inp }));

        super("div", { inputs, button, ...props });

        this.loadUserData()
    }

    async loadUserData() {
        // логика запроса на сервер
        const res = await new Promise((res) => {
            setTimeout(() => {
                res({
                    first_name: "Pavel",
                    second_name: "Martynov",
                    display_name: "CowBoy bibop",
                    login: "123456",
                    email: "pavel-martynov@ya.ru",
                    phone: "79008001234",
                });
            }, 2000);
        });

        console.log(res)
        this.setProps({inputs: EditProfile.inputsList.map((inp) => new Input({ ...inp, value: 'HELLO' }))})
    }

    componentDidUpdate(): boolean {
      console.log('did update')
      return true
    }

    componentDidMount(): void {
      console.log('did mount')
    }

    render() {
        console.log('render', this.props)
        return this.compile(tmpl, { ...this.props });
    }
}
