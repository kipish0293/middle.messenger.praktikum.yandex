import "./error404.scss";
import Handlebars from "handlebars";
import { changePathName } from "../../utils/changePatrhName";
import tmpl from "./error404.tmpl";

function notFoundPage() {
    const template = Handlebars.compile(tmpl);
    const result = template();

    document.querySelector("#app").innerHTML = result;
    document.querySelector("#back-to-home").addEventListener("click", () => changePathName(""));
}

export default notFoundPage;
