import Handlebars from "handlebars";
import { changePathName } from "../../utils/changePatrhName";
import tmpl from "./error500.tmpl";

function error500page() {
    const template = Handlebars.compile(tmpl);
    const result = template();

    document.querySelector("#app").innerHTML = result;
    document.querySelector("#back-to-home-err-page").addEventListener("click", () => changePathName(""));
}

export default error500page;
