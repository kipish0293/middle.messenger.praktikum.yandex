import AuthPage from "./authorisation";
import ChatsPage from "./chats";
import RegPage from "./registration";
import Error404 from "./error404";
import Error500 from "./error500";
import Profile from "./profile";
import "./index.scss";
import { changePath, changePathName } from "../utils/changePatrhName";
import Block from "../helpers/block";

export const userId = 112233;

function renderPage(query: string, block: Block) {
    const root = document.querySelector(query);
    if (root) {
        root.innerHTML = "";
        root.appendChild(block.getContent()!);
    }
    block.dispatchComponentDidMount();
    return root;
}

export function baseRouter() {
    if (!localStorage.getItem("auth") && window.location.pathname !== "/registration") {
        changePath("authorisation");
        renderPage("#app", AuthPage);
        return;
    }
    if (localStorage.getItem("auth") && window.location.pathname === "/") {
        changePathName("chats");
    } else if (localStorage.getItem("auth") && window.location.pathname === "/authorisation") {
        changePathName("chats");
    } else if (localStorage.getItem("auth") && window.location.pathname === "/registration") {
        changePathName("chats");
    } else {
        switch (window.location.pathname) {
            case "/authorisation":
                renderPage("#app", AuthPage);
                return;
            case "/registration":
                renderPage("#app", RegPage);
                return;
            case "/chats":
                renderPage("#app", ChatsPage);
                return;
            case "/profile":
                renderPage("#app", Profile);
                return;
            case "/error500":
                renderPage("#app", Error500);
                return;
            default:
                renderPage("#app", Error404);
                return;
        }
    }
}
