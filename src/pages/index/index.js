import authPage from "../authorisation";
import regPage from "../registration";
import notFound from "../error404";
import errPage from "../error500";
import profilePage from "../profile";
import chatsPage from "../chats";
import "./style.scss";
import { changePath, changePathName } from "../../utils/changePatrhName";

export const userId = 112233;

export function baseRouter() {
    if (!localStorage.getItem("auth") && window.location.pathname !== "/registration") {
        changePath("authorisation");
        return authPage();
    } else if (localStorage.getItem("auth") && window.location.pathname === "/") {
        changePathName("chats");
    } else if (localStorage.getItem("auth") && window.location.pathname === "/authorisation") {
        changePathName("chats");
    } else if (localStorage.getItem("auth") && window.location.pathname === "/registration") {
        changePathName("chats");
    } else {
        switch (window.location.pathname) {
            case "/authorisation":
                authPage();
                break;
            case "/registration":
                regPage();
                break;
            case "/chats":
                chatsPage();
                break;
            case "/profile":
                profilePage();
                break;
            case "/error500":
                errPage();
                break;
            default:
                notFound();
                break;
        }
    }
}
