import "./inputLabel.scss";
import tmpl from './inputLabel.tmpl'
import Block from "../../helpers/block";

export default class InputLabel extends Block {
    constructor(props: any) {
        super("label", props);
    }

    render() {
        return this.compile(tmpl, { ...this.props });
    }
}
