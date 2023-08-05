import "./avatar.scss";
import tmpl from "./avatar.tmpl";
import Block from "../../helpers/block";
import { AvatarType } from "./types";

export default class Avatar extends Block {
    static sizeSmall: string = "width: 47px; height: 47px;";
    static sizeMedium: string = "width: 130px; height: 130px;";

    constructor(props: AvatarType) {
        super("div", props);
    }

    calculatedSize() {
        return this.props.size === "medium" ? Avatar.sizeMedium : Avatar.sizeSmall;
    }

    render() {
        this.calculatedSize();
        return this.compile(tmpl, { ...this.props, size: this.calculatedSize() });
    }
}
