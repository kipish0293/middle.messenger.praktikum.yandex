import "./oneTextfieldForm.scss"
import tmpl from "./oneTextfieldForm.tmpl";
import Block from "../../../../helpers/block";

export default class OneTextfieldForm extends Block {
    constructor(props: any) {
        super("form", props);
    }

    render() {
        return this.compile(tmpl, { ...this.props });
    }
}
