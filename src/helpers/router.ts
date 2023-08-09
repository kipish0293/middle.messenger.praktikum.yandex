import Block from "./block";
import Route from "./route";

export default class Router {
    static __instance: Router | null = null;

    routes: Route[] = [];
    history: History = window.history;
    _currentRoute: Route | null = null;
    _rootQuery: string | undefined = "#app";

    constructor(rootQuery?: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname: string, _componentBuilder: () => Block) {
        const route = new Route(pathname, _componentBuilder, { rootQuery: this._rootQuery });

        this.routes.push(route);

        return this;
    }

    start() {
        window.onpopstate = ((event: PopStateEvent) => {
            //тут добавить потом проверку на авторизованность, чтобы авторизованный пользователь не выпадал на страницу авторизации и наоборот
            const curTarget = event.currentTarget as any;
            const {
                location: { pathname },
            } = curTarget;
            this._onRoute(pathname);
        }).bind(this);

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);

        if (!route) {
            return;
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        // route.render(route, pathname); // зачем передавать в роут сам роут и путь???
        route.render();
    }

    go(pathname: string) {
        this.history.pushState({}, "", pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname: string) {
        const route = this.routes.find((route) => route.match(pathname));
        if (route) {
            return route;
        }
        return this.routes.find((route) => route.match("/404"));
    }
}
