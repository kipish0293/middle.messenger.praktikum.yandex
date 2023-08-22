import Block from "./block";
import Route from "./route";
import Router from "./router";

class FakePageComp extends Block {}

describe("Router", () => {
    let router: Router;
    let FakePage: () => Block;
    const mockBackMethod = jest.fn();
    const mockForwardMethod = jest.fn();

    beforeEach(() => {
        router = new Router();
        router.back = mockBackMethod;
        router.forward = mockForwardMethod;
        FakePage = () => new FakePageComp();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("should have 'use' method and save added route", () => {
        router.use("/test", FakePage);

        expect(router.routes.length).toBe(1);
    });

    it("should have 'getRoute' method and 'getRoute' will return route", () => {
        router.use("/test", FakePage);
        const getRoute = router.getRoute("/test");

        expect(getRoute instanceof Route).toBeTruthy();
    });

    it("should have 'go' method", () => {
        router.use("/test", FakePage);
        router.start();
        router.go("/test22");

        expect(window.location.pathname).toBe("/test22");
    });

    it("should have 'back' method", () => {
        router.use("/test", FakePage);
        router.start();
        router.back();

        expect(mockBackMethod).toHaveBeenCalledTimes(1);
    });

    it("should have 'forward' method", () => {
        router.use("/test", FakePage);
        router.start();
        router.forward();

        expect(mockForwardMethod).toHaveBeenCalledTimes(1);
    });
});
