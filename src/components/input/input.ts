import "./input.scss";
import Block from "../../helpers/block";

export default class Input extends Block {
    constructor(props: any) {
        super("input", props);
    }

    render() {
        return this.compile("", { ...this.props });
    }
}
