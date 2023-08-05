import EventBus from "./eventBus";
import { v4 as makeUUID } from "uuid";
import Handlebars from "handlebars";

abstract class Block {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render",
    };

    _element: HTMLElement | null = null;
    _id: null | string = null;
    _meta: {
        tagName: string;
        propsAndChildren?: unknown;
    } | null = null;
    eventBus: EventBus;
    props: Record<string | symbol, any>;
    children: Record<string, Block> | Record<string, Block[]> = {};
    _setUpdate: boolean = false;

    constructor(tagName: string = "div", propsAndChildren: Record<string | symbol, any> = {}) {
        const eventBus = new EventBus();
        this._meta = {
            tagName,
            propsAndChildren,
        };

        const { children, propses } = this._getChildren(propsAndChildren);

        this._id = makeUUID();

        this.children = this._makePropsProxy({ ...children });
        this.props = this._makePropsProxy({ ...propses, __id: this._id });

        this.eventBus = eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    _addEvents() {
        const { events = {} } = this.props;

        Object.keys(events).forEach((eventName) => {
            if (this._element) {
                this._element.addEventListener(eventName, events[eventName]);
            }
        });
    }

    _removeEvents() {
        const { events = {} } = this.props;

        Object.keys(events).forEach((eventName) => {
            if (this._element) {
                this._element.removeEventListener(eventName, events[eventName]);
            }
        });
    }

    _getChildren(propsAndChildren: Record<string | symbol, any>) {
        const children: Record<string, Block> | Record<string, Block[]> = {};
        const propses: Record<string | symbol, any> = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                const result: Block[] = [];
                value.map((el) => {
                    if (el instanceof Block) {
                        result.push(el);
                    }
                });
                children[key] = result;
            }
            if (value instanceof Block) {
                children[key] = value;
            } else {
                propses[key] = value;
            }
        });

        return { children, propses };
    }

    compile(template: string, props: any) {
        const propsAndStubs = { ...props };

        Object.entries(this.children).forEach(([key, child]) => {
            if (Array.isArray(child)) {
                const result: string[] = [];
                child.map((el) => {
                    if (el instanceof Block) {
                        result.push(`<div data-id="${el._id}"></div>`);
                    }
                });
                propsAndStubs[key] = result;
            } else {
                propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
            }
        });

        const fragment = this._createDocumentElement("template") as HTMLTemplateElement;

        fragment.innerHTML = Handlebars.compile(template)({ ...propsAndStubs });

        Object.values(this.children).forEach((child) => {
            if (Array.isArray(child)) {
                child.map((el) => {
                    if (el instanceof Block) {
                        const stub = fragment.content.querySelector(`[data-id="${el._id}"]`);
                        if (stub) {
                            stub.replaceWith(el.getContent()!);
                        }
                    }
                });
            }

            const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
            if (stub) {
                stub.replaceWith(child.getContent()!);
            }
        });

        return fragment.content;
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    _createResources() {
        const { tagName } = this._meta!;
        this._element = this._createDocumentElement(tagName);
    }

    init() {
        this._createResources();
        this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }

    _componentDidMount() {
        this.componentDidMount();

        Object.values(this.children).forEach((child) => {
            if (Array.isArray(child)) {
                child.map((el) => {
                    if (el instanceof Block) {
                        el.dispatchComponentDidMount();
                    }
                });
            } else {
                child.dispatchComponentDidMount();
            }
        });
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidMount() {}

    dispatchComponentDidMount() {
        this.eventBus.emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidUpdate(oldProps: any, newProps: any) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this._render();
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidUpdate(oldProps: any, newProps: any) {
        if (oldProps !== newProps) {
            return true;
        }
        return false;
    }

    setProps(nextProps: unknown) {
        if (!nextProps) {
            return;
        }

        this._setUpdate = false;
        const oldValue = { ...this.props };

        const { children, propses } = this._getChildren(nextProps);

        if (Object.values(children).length) {
            Object.assign(this.children, children);
        }

        if (Object.values(propses).length) {
            Object.assign(this.props, propses);
        }

        if (this._setUpdate) {
            this.eventBus.emit(Block.EVENTS.FLOW_CDU, oldValue, this.props);
            this._setUpdate = false;
        }
    }

    get element() {
        return this._element;
    }

    _render() {
        const block = this.render(); // render теперь возвращает DocumentFragment
        this._removeEvents();
        if (this._element && block !== undefined) {
            this._element.innerHTML = ""; // удаляем предыдущее содержимое
            this._element.appendChild(block);
            this.setAttibutes(this._element);
        }
        this._addEvents();
    }

    render() {}

    getContent() {
        return this.element;
    }

    _makePropsProxy(props: Record<string | symbol, any>) {
        const self = this;
        return new Proxy(props, {
            get(target, prop) {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target, prop, value) {
                if (target[prop] !== value) {
                    const oldProps = { ...target };
                    target[prop] = value;
                    self.eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, target);
                }
                return true;
            },
            deleteProperty(target, prop) {
                const oldProps = { ...target };
                delete target[prop];
                if (self.element) {
                    self._removeAttributes(self.element, prop as string);
                }
                self.eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, target);
                return true;
            },
        });
    }

    _createDocumentElement(tagName: string) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        const elem = document.createElement(tagName);
        //В свободное время доработаю эту реализацию
        if (this._id) {
            this._setAttributes(elem);
        }
        return elem;
    }

    _setAttributes(elem: HTMLElement) {
        enum Attr {
            name = "name",
            value = "value",
            class = "class",
            id = "id",
            src = "src",
            href = "href",
            alt = "alt",
            title = "title",
            disabled = "disabled",
            checked = "checked",
            placeholder = "placeholder",
            type = "type",
            required = "required",
        }
        if (this._id) {
            elem.setAttribute("data-id", this._id);
            Object.entries(this.props).forEach(([key, value]: [string, any]) => {
                if (key in Attr) {
                    elem.setAttribute(key, value);
                }
            });
        }
    }

    _removeAttributes(elem: HTMLElement, attribute: string) {
        elem.removeAttribute(attribute);
    }

    setAttibutes(elem: HTMLElement) {
        if (elem) {
            this._setAttributes(elem);
        }
    }

    show() {
        this.getContent()!.style.display = "flex";
    }

    hide() {
        this.getContent()!.style.display = "none";
    }
}

export default Block;
