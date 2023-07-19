import "./button.scss";
import tmpl from "./button.tmpl";
import Block from "../../helpers/block";
import { ButtonType } from "./types";

export default class Button extends Block {
    constructor(props: ButtonType) {
        super("div", props);
    }

    render() {
        return this.compile(tmpl, { ...this.props });
    }
}
