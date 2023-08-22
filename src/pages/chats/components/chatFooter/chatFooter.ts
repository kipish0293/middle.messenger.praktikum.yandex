import "./chatFooter.scss";
import tmpl from "./chatFooter.tmpl";
import Block from "../../../../helpers/block";

export default class ChatFooter extends Block {
    constructor(props: any) {
        super("form", props);
    }

    render() {
        return this.compile(tmpl, { ...this.props });
    }
}
