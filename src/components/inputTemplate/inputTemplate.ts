import "./inputTemplate.scss";
import tmpl from "./inputTemplate.tmpl";
import Block from "../../helpers/block";

export default class InputTemplate extends Block {
    constructor(props: any) {
        super("div", props);
    }

    render() {
        return this.compile(tmpl, { ...this.props });
    }
}
