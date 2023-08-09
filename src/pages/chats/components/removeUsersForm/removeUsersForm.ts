import './removeUsersForm.scss'
import tmpl from "./removeUsersForm.tmpl";
import Block from "../../../../helpers/block";
import ChatController from '../../../../controllers/chat-controller';
import store from '../../../../helpers/store';
import InputTemplate from '../../../../components/inputTemplate';
import Input from '../../../../components/input';
import InputLabel from '../../../../components/inputLabel';

export default class RemoveUsersForm extends Block {
    constructor(props: any) {
        super("form", {...props, update: false});
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        if((oldProps?.chat?.currentChatId !== newProps?.chat?.currentChatId && this.props.update) || this.props.update) {
            this.setProps({ update: false });
            this.loadUsers()
        }
        return super.componentDidUpdate(oldProps, newProps)
    }

    async loadUsers() {
        const {currentChatId} = store.getState().chat
        const user = store.getState().user
        const res = await ChatController.getChatUsers(currentChatId)
        if(res) {
            const filtredUserIds = res.filter((i: Record<string, any>) => i.id !== user?.id)

            const userList = filtredUserIds.map((i: Record<string, any>) => {
                return new InputTemplate({
                    input: new Input({
                        name: i.id,
                        type: "checkbox",
                        value: i.id,
                        placeholder: `${i.first_name} ${i.second_name}`
                    }),
                    label: new InputLabel({
                        name: "",
                        label: `${i.first_name} ${i.second_name}`,
                    }),
                    class: "text-field",
                })
            })
            this.setProps({userList})
        }

    }

    render() {
        return this.compile(tmpl, { ...this.props });
    }
}
