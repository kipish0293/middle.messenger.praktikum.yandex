import Block from "../../../../helpers/block";
import "./chatFooter.scss";
import tmpl from "./chatFooter.tmpl";

export default class ChatFooter extends Block {
    constructor(props: any) {
        super("form", props);
    }

    render() {
        return this.compile(tmpl, { ...this.props });
    }
}
