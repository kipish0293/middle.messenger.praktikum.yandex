import "./button.scss";
import tmpl from "./button.tmpl";
import Block from "../../helpers/block";
import { ButtonType } from "./types";

export default class Button extends Block {
    constructor(props: ButtonType) {
        super("button", { ...props, class: "button" });
    }

    render() {
        return this.compile(tmpl, { ...this.props });
    }
}
