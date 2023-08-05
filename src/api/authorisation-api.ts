// import BaseAPI from '../helpers/base-api';
import HTTPTransport from '../helpers/httpTransport';

class AuthAPI{
    private baseUrl: string = 'https://ya-praktikum.tech/api/v2/auth';

    httpTransport: HTTPTransport;

    constructor() {
        // super('https://ya-praktikum.tech/api/v2/auth')
        this.httpTransport = new HTTPTransport(this.baseUrl)
    }

    singup(data: Record<string, any>) {
        // const data = new FormData()
        // Object.entries(regData).forEach(([key, value]) => {
        //     data.append(key, value)
        // })
        return this.httpTransport.post('/signup', {data});
    }

    singin(data: Record<string, any>) {
        // Здесь уже не нужно писать полный путь /api/v1/chats/
        // const data = new FormData()
        // Object.entries(authData).forEach(([key, value]) => {
        //     data.append(key, value)
        // })
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
