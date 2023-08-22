import './addUsersForm.scss'
import tmpl from "./addUsersForm.tmpl";
import Block from "../../../../helpers/block";

export default class AddUsersForm extends Block {
    constructor(props: any) {
        super("form", props);
    }

    render() {
        return this.compile(tmpl, { ...this.props });
    }
}
