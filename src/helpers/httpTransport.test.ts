import HTTPTransport from "./httpTransport";

describe("HTTPTransport", () => {
    let httpTransport: HTTPTransport;
    let spyRequest: any;

    beforeEach(() => {
        httpTransport = new HTTPTransport('');
        spyRequest = jest.spyOn(httpTransport, "request") as any;
        spyRequest.mockResolvedValue({ status: 200 });
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("GET method should stringify query object", () => {
        const params: Record<string, any> = { limit: 100, test: "asd" };
        httpTransport.get("", params);

        expect(spyRequest.mock.calls[0][0].href).toBe("https://ya-praktikum.tech/api/v2?limit=100&test=asd");
        expect(spyRequest.mock.calls[0][1]).toEqual({ limit: 100, method: "GET", test: "asd" });
    });

    it("POST method should be called with data", () => {
        const data: Record<string, any> = { name: "Ivan", age: 25 };
        httpTransport.post("", data);

        expect(spyRequest.mock.calls[0][0].href).toBe("https://ya-praktikum.tech/api/v2");
        expect(spyRequest.mock.calls[0][1]).toEqual({ name: "Ivan", age: 25, method: "POST" });
    });

    it("PUT method should be called with data", () => {
        const data: Record<string, any> = { name: "Ivan", age: 25 };
        httpTransport.put("", data);

        expect(spyRequest.mock.calls[0][0].href).toBe("https://ya-praktikum.tech/api/v2");
        expect(spyRequest.mock.calls[0][1]).toEqual({ name: "Ivan", age: 25, method: "PUT" });
    });

    it("DELETE method should be called with data", () => {
        const data: Record<string, any> = { name: "Ivan", age: 25 };
        httpTransport.delete("", data);

        expect(spyRequest.mock.calls[0][0].href).toBe("https://ya-praktikum.tech/api/v2");
        expect(spyRequest.mock.calls[0][1]).toEqual({ name: "Ivan", age: 25, method: "DELETE" });
    });
});
