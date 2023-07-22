import "./search.scss";
import tmpl from "./search.tmpl";
import Block from "../../helpers/block";

export default class Search extends Block {
    constructor(props: any) {
        super("div", props);
    }

    render() {
        return this.compile(tmpl, { ...this.props });
    }
}
