import { renderPage } from "../utils/heplerFunction";
import Block from "./block";

function isEqual(lhs: any, rhs: any) {
    return lhs === rhs;
}

class Route {
    _component: Block | null = null;
    constructor(
        protected _pathname: string,
        protected _componentBuilder: () => Block,
        protected _props: Record<string, any> = {}
    ) {}

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._component) {
            this._component.hide();
        }
    }

    match(pathname: string) {
        return isEqual(pathname, this._pathname);
    }

    render() {
        if (!this._component) {
            this._component = this._componentBuilder();
            renderPage(this._props.rootQuery, this._component);
        }

        this._component.show();
    }
}

export default Route;
