import tmpl from "./linkButton.tmpl";
import Block from "../../helpers/block";
import { ButtonType } from "./types";

export default class LinkButton extends Block {
    constructor(props: ButtonType) {
        super("div", props);
    }

    render() {
        return this.compile(tmpl, { ...this.props });
    }
}
