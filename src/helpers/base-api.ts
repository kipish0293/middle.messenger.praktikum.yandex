import HTTPTransport from "./httpTransport";

export default class BaseAPI {
    baseUrl: string = '';
    httpTransport: HTTPTransport;
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
        this.httpTransport = new HTTPTransport(baseUrl)
    }
}