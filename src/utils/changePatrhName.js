import { baseRouter } from "../pages/index";

export function changePath(pathName) {
    window.history.pushState({}, "", `/${pathName}`);
}

export function changePathName(pathname) {
    changePath(pathname);
    baseRouter();
}
