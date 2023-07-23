import { baseRouter } from "../pages/index";

export function changePath(pathName: string) {
    window.history.pushState({}, "", `/${pathName}`);
}

export function changePathName(pathname: string) {
    changePath(pathname);
    baseRouter();
}
