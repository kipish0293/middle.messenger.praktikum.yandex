import tmpl from "./chatItem.tmpl";
import Block from "../../../../helpers/block";

export default class ChatItem extends Block {
    constructor(props: any) {
        super("li", props);
    }

    render() {
        return this.compile(tmpl, { ...this.props });
    }
}
