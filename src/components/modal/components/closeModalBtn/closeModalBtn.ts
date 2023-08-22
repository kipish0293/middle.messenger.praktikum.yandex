import Block from "../../../../helpers/block";
import tmpl from "./closeModalBtn.tmpl";

export default class CloseModalBtn extends Block {
    constructor(props: any) {
        super("div", props);
    }

    render() {
        return this.compile(tmpl, { ...this.props });
    }
}
