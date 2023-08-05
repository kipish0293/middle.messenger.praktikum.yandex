import "./error404.scss";
import LinkButton from "../../components/linkButton";
import Block from "../../helpers/block";
import {goApp, PATHS } from "../../utils/routerChange";
import tmpl from "./error404.tmpl";

class Error404 extends Block {
    constructor(props: any) {
        super("div", props);
    }

    render() {
        return this.compile(tmpl, { linkButton: this.props!.linkButton });
    }
}

const linkButton = new LinkButton({
    name: "Назад к чатам",
    events: {
        click: (event: Event): void => {
            event.preventDefault();
            goApp(PATHS.MES);
        },
    },
});

export default new Error404({
    linkButton,
    class: "screen-content-center",
});
