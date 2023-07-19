import "./modal.scss";
import tmpl from "./modal.tmpl";
import Block from "../../helpers/block";

export default class Modal extends Block {
    constructor(props: any) {
        super("div", props);
    }

    render() {
        return this.compile(tmpl, { button: this.props!.button });
    }
}
