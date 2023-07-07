import "./modal.scss";
import Handlebars from "handlebars";
import tmpl from "./modal.tmpl";
import button from "../../modules/button";

export function modal() {
    const template = Handlebars.compile(tmpl);
    const result = template({
        button: button({
            type: "submit",
            id: "accept",
            name: "Применить",
        }),
    });

    return result;
}
