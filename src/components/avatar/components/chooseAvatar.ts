import "./chooseAvatar.scss";
import tmpl from "./chooseAvatar.tmpl";
import Block from "../../../helpers/block";

export default class ChooseAvatar extends Block {
    constructor(props: any) {
        super("form", props);
    }

    render() {
        return this.compile(tmpl, { ...this.props });
    }
}
