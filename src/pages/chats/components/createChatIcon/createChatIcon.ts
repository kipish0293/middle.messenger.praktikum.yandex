import './createChatIcon.scss'
import tmpl from "./createChatIcon.tmpl";
import Block from "../../../../helpers/block";

export default class CreateChatIcon extends Block {
    constructor(props: any) {
        super("span", props);
    }

    render() {
        return this.compile(tmpl, { ...this.props });
    }
}
