import { InputType } from "./types";
import "./input.scss";
import tmpl from "./input.tmpl";
import Block from "../../helpers/block";

export default class Input extends Block {
    constructor(props: InputType) {
        super("div", props);
    }

    render() {
        return this.compile(tmpl, { ...this.props });
    }
}
