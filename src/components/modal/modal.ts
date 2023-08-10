import "./modal.scss";
import tmpl from "./modal.tmpl";
import Block from "../../helpers/block";
import CloseModalBtn from "./components/closeModalBtn";

const closeModalBtn = new CloseModalBtn({
    class: "modal-close",
    events: {
        click: () => {
            const modal = document.querySelector(".modal-content") as HTMLElement;
            if (modal) {
                modal.style.display = "none";
            }
        },
    },
});

export default class Modal extends Block {
    constructor(props: any) {
        super("div", { ...props, closeModalBtn, class: "modal-content" });
    }

    componentDidMount(): void {
        this.hide();
        super.componentDidMount();
    }

    render() {
        return this.compile(tmpl, { button: this.props!.button });
    }
}
