import HTTPTransport from '../helpers/httpTransport';

class AuthAPI{
    private baseUrl: string = 'https://ya-praktikum.tech/api/v2/auth';

    httpTransport: HTTPTransport;

    constructor() {
        this.httpTransport = new HTTPTransport(this.baseUrl)
    }

    singup(data: Record<string, any>) {
        return this.httpTransport.post('/signup', {data});
    }

    signin(data: Record<string, any>) {
        return this.httpTransport.post('/signin', {data});
    }

    user() {
        return this.httpTransport.get('/user');
    }

    logout() {
        return this.httpTransport.post('/logout');
    }
}

export default new AuthAPI()
