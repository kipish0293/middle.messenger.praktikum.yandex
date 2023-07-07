import "./message.scss";
import Handlebars from "handlebars";
import tmpl from "./message.tmpl";

function message({ id, name, text, date }) {
    const template = Handlebars.compile(tmpl);
    const result = template({ id, name, text, date });
    return result;
}

export default message;
