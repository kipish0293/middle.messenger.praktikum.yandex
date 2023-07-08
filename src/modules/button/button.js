import "./button.scss";
import Handlebars from "handlebars";
import tmpl from "./button.tmpl";

export function button(data) {
    const template = Handlebars.compile(tmpl);
    return template({ ...data });
}
