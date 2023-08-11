import { BASE_URL } from "../utils/constants";

enum METHOD {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
}

type Options = {
    method: METHOD;
    data?: null | FormData | Document | XMLHttpRequestBodyInit | Record<string, unknown>;
    headers?: Record<string, string>;
    timeout?: number;
    withCredentials?: boolean
};

type OptionsWithoutMethod = Omit<Options, "method">;

type HTTPMethod = (url: string | URL, options?: OptionsWithoutMethod ) => Promise<{status: number, data: Record<string, any>}>

class HTTPTransport {
    private baseURL: string = BASE_URL;
    protected fullURL: string

    constructor(url: string) {
        this.fullURL = this.baseURL + url
    }

    get: HTTPMethod = (url, options = {}) => {
        const newURL = new URL(this.fullURL + url);
        if (Object.keys(options).length) {
            Object.entries(options).map(([key, value]) => {
                if (value) {
                    newURL.searchParams.set(key, value.toString());
                }
            });
        }
        return this.request(newURL, { ...options, method: METHOD.GET });
    }

    post: HTTPMethod = (url, options = {}) => {
        const newURL = new URL(this.fullURL + url);
        return this.request(newURL, { ...options, method: METHOD.POST });
    }

    put: HTTPMethod = (url, options = {}) => {
        const newURL = new URL(this.fullURL + url);
        return this.request(newURL, { ...options, method: METHOD.PUT });
    }

    delete: HTTPMethod = (url, options = {}) => {
        const newURL = new URL(this.fullURL + url);
        return this.request(newURL, { ...options, method: METHOD.DELETE });
    }

    request(url: string | URL, options: Options = { method: METHOD.GET }): Promise<{status: number, data: XMLHttpRequest}> {
        const { headers = {}, method, data, timeout = 5000, withCredentials = true } = options;

        return new Promise(function (resolve, reject) {
            if (!method) {
                reject("No method");
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHOD.GET;

            xhr.open(method, url);

            xhr.responseType = "json";

            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = function () {
                const status = xhr.status || 0
                if(status >= 200 && status <= 300) {
                    resolve({
                        status: xhr.status,
                        data: xhr.response
                    })
                } else {
                    reject({status, reason: xhr.response?.reason || "Error"})
                }
            };

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.withCredentials = withCredentials;
            xhr.ontimeout = reject;

            if (isGet || !data) {
                xhr.send();
            } else if(data instanceof FormData) {
                xhr.send(data);
            } else {
                xhr.setRequestHeader('Content-Type', 'application/json')
                xhr.send(JSON.stringify(data));
            }
        });
    }
}

export default HTTPTransport;
