import Block from "./block";
import { renderPage } from "../utils/heplerFunction";
import { connect } from "../utils/connect";
import store from "./store";

class FakePageComp extends Block {
    constructor(props: any) {
        super("div", props);
    }

    public override render() {
        return this.compile("{{name}}", { ...this.props });
    }
}

describe("Block", () => {
    let fakePage: Block;
    let app: HTMLElement;
    let FakePageWithStore: any;
    let InstanceFakePageWithStore: Block;

    beforeEach(() => {
        fakePage = new FakePageComp({ class: "test-class", name: "test-block" });

        app = document.createElement("div");
        app.setAttribute("id", "app");
        document.body.append(app);
        renderPage(undefined, fakePage);

        FakePageWithStore = connect((state) => ({ user: { ...state.user } }))(FakePageComp);
        InstanceFakePageWithStore = new FakePageWithStore({});
    });

    afterEach(() => {
        document.body.innerHTML = "";
        jest.resetAllMocks();
    });

    it("should have a constructor", () => {
        expect(fakePage.props.class).toBe("test-class");
    });

    it("should have method 'setProps' and componentDidUpdate should be called", () => {
        const spyDidUpdate = jest.spyOn(fakePage, "componentDidUpdate");
        expect(spyDidUpdate).toBeCalledTimes(0);

        fakePage.setProps({ hello: true });

        expect(spyDidUpdate).toBeCalledTimes(2); //2 раза (1й - первичный вызов после setProps, 2й - при обновлении пропсов _makePropsProxy)
        expect(fakePage.props.hello).toBe(true);
    });

    it("should have method 'render' and compile element", () => {
        const elem = document.querySelector(".test-class");

        expect(elem?.getAttribute("class")).toBe("test-class");
    });

    it("should have method 'hide'", async () => {
        fakePage.hide();

        const elem = document.querySelector(".test-class") as HTMLElement;

        expect(fakePage.getContent()!.style.display).toBe("none");
        expect(elem.style.display).toBe("none");
    });

    it("should have method 'show'", async () => {
        fakePage.show();

        const elem = document.querySelector(".test-class") as HTMLElement;

        expect(fakePage.getContent()!.style.display).toBe("flex");
        expect(elem.style.display).toBe("flex");
    });

    it("should compile params correctly", async () => {
        const elem = document.querySelector(".test-class") as HTMLElement;

        expect(elem.textContent).toBe("test-block");
    });

    describe("Block with store", () => {
        it("should be connected correctrly", () => {
            expect(InstanceFakePageWithStore.props.user).toEqual({});
        });

        it("should update props if store change", () => {
            const spyDidUpdate = jest.spyOn(InstanceFakePageWithStore, "componentDidUpdate");

            expect(spyDidUpdate).toBeCalledTimes(0);

            store.set("user", { name: "Ivan" });

            expect(spyDidUpdate).toBeCalledTimes(2); //2 раза (1й - первичный вызов после setProps, 2й - при обновлении пропсов _makePropsProxy)

            expect(InstanceFakePageWithStore.props.user).toEqual({ name: "Ivan" });
        });
    });
});
