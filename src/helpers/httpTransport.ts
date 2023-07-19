enum METHOD {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
}

type Options = {
    method: METHOD;
    data?: null | FormData | Document | XMLHttpRequestBodyInit;
    headers?: Record<string, string>;
    timeout?: number;
};

type OptionsWithoutMethod = Omit<Options, "method">;

class HTTPTransport {
    get(url: string | URL, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        const newURL = new URL(url);
        if (Object.keys(options).length) {
            Object.entries(options).map(([key, value]) => {
                if(value) {
                    newURL.searchParams.set(key, value.toString());
                }
            });
        }
        return this.request(newURL, { ...options, method: METHOD.GET }, options.timeout);
    }

    post(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: METHOD.POST }, options.timeout);
    }

    put(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: METHOD.PUT }, options.timeout);
    }

    delete(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: METHOD.DELETE }, options.timeout);
    }

    request(url: string | URL, options: Options = { method: METHOD.GET }, timeout = 5000): Promise<XMLHttpRequest> {
        const { headers = {}, method, data } = options;

        return new Promise(function (resolve, reject) {
            if (!method) {
                reject("No method");
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHOD.GET;

            xhr.open(method, url)

            xhr.responseType = 'json';

            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = function () {
                resolve(xhr.response);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (isGet || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    }
}

export default HTTPTransport;
