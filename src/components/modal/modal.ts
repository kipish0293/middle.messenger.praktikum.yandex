import "./modal.scss";
import tmpl from "./modal.tmpl";
import Block from "../../helpers/block";

export default class Modal extends Block {
    constructor(props: any) {
        super("div", props);
    }

    componentDidMount(): void {
        this.hide()
        super.componentDidMount();
    }

    render() {
        return this.compile(tmpl, { button: this.props!.button });
    }
}
