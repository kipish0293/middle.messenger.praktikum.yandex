// import { InputType } from "./types";
import "./input.scss";
import Block from "../../helpers/block";

export default class Input extends Block {
    constructor(props: any) {
        super("input", props);
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        console.log('did update')

        return super.componentDidUpdate(oldProps, newProps)
        // return true
    }

    render() {
        console.log('render', this.props)
        return this.compile('', { ...this.props });
    }
}
