import "./confirmationContent.scss";
import tmpl from "./confirmationContent.tmpl";
import Block from "../../../../helpers/block";

export default class ConfirmationContent extends Block {
    constructor(props: any) {
        super("form", { ...props, update: false });
    }

    render() {
        return this.compile(tmpl, { ...this.props });
    }
}
