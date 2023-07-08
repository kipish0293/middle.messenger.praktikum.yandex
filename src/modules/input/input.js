import "./input.scss";
import Handlebars from "handlebars";
import tmpl from "./input.tmpl";

export function input(data) {
    const template = Handlebars.compile(tmpl);
    return template({ ...data });
}
