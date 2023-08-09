import Block from "./block";

function isEqual(lhs: any, rhs: any) {
    return lhs === rhs;
}

function renderPage(query: string = "#app", block: Block) {
    const root = document.querySelector(query);
    if (root) {
        // root.innerHTML = "";
        root.appendChild(block.getContent()!);
    }
    block.dispatchComponentDidMount();
    return root;
}

class Route {
    _component: Block | null = null;
    constructor(protected _pathname: string, protected _componentBuilder: () => Block, protected _props: Record<string, any> = {}) {}

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
        // this._component = null
    }

    match(pathname: string) {
        return isEqual(pathname, this._pathname);
    }

    render() {
        if (!this._component) {
            this._component = this._componentBuilder()
            renderPage(this._props.rootQuery, this._component);
        }

        this._component.show();
    }
}

export default Route;
