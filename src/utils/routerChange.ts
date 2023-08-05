import Router from "../helpers/router";

export function goApp(pathname: string) {
    new Router().go(pathname);
}

export function backApp () {
    new Router().back();
}

export function forwardApp () {
    new Router().forward();
}

export const PATHS = {
    AUTH : "/",
    REG : "/sign-up",
    MES : "/messenger",
    SET: "/settings",
    E500: "/500",
    E404: "/404",
}


