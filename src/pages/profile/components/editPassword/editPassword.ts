import "./editPassword.scss";
import tmpl from "./editPassword.tmpl";
import Block from "../../../../helpers/block";
import Button from "../../../../components/button";
import Input from "../../../../components/input";

export default class EditPassword extends Block {
    static inputsList = [
      {
        name: 'oldPassword',
        label: 'Новый пароль',
        type: 'password',
        placeholder: 'Введите новый пароль',
        value: '',
        disabled: '',
        required: 'required',
      },
      {
        name: 'newPassword',
        label: 'Новый пароль',
        type: 'password',
        placeholder: 'Введите новый пароль',
        value: '',
        disabled: '',
        required: 'required',
      },
      {
        name: 'newPassword_1',
        label: 'Повторите новый пароль',
        type: 'password',
        placeholder: 'Введите новый пароль (еще раз)',
        value: '',
        disabled: '',
        required: 'required',
      },
    ]

    constructor(props: any) {
        const button = new Button({
            type: 'submit',
            id: 'change-pass-btn',
            name: 'Сохранить',
        });

        const inputs = EditPassword.inputsList.map((inp) => new Input({ ...inp }));

        super("div", { inputs, button, ...props });
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

