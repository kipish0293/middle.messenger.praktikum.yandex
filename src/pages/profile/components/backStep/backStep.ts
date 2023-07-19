import Block from "../../../../helpers/block";
import "./backStep.scss";
import tmpl from "./backStep.tmpl";

export default class BackStep extends Block {
    constructor(props: any) {
        super("div", props);
    }

    render() {
        return this.compile(tmpl, { ...this.props });
    }
}
