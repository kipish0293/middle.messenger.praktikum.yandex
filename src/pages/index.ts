import AuthPage from "./authorisation";
import ChatsPage from "./chats";
import RegPage from "./registration";
import Error404 from "./error404";
import Error500 from "./error500";
import Profile from "./profile";
import "./index.scss";
import Router from "../helpers/router";
import { PATHS } from "../utils/routerChange";

export function baseRouter() {
    const router = new Router("#app");

    router
        .use(PATHS.AUTH, AuthPage)
        .use(PATHS.REG, RegPage)
        .use(PATHS.MES, ChatsPage)
        .use(PATHS.SET, Profile)
        .use(PATHS.E500, Error500)
        .use(PATHS.E404, Error404)
        .start();
}
