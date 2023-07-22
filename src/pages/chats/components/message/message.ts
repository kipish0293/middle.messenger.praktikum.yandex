import "./message.scss";
import Block from "../../../../helpers/block";
import tmpl from "./message.tmpl";
export default class Message extends Block {
    constructor(props: any) {
        super("div", props);
    }

    render() {
        return this.compile(tmpl, { ...this.props });
    }
}
