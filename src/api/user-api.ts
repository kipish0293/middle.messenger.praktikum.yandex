import HTTPTransport from '../helpers/httpTransport';

class UserAPI{
    private baseUrl: string = 'https://ya-praktikum.tech/api/v2/user';

    httpTransport: HTTPTransport;

    constructor() {
        this.httpTransport = new HTTPTransport(this.baseUrl)
    }

    profile(data: Record<string, any>) {
        return this.httpTransport.put('/profile', {data});
    }

    password(data: Record<string, any>) {
        return this.httpTransport.put('/password', {data});
    }

    avatar(data: FormData) {
        return this.httpTransport.put('/profile/avatar', {data});
    }

    user(id: string) {
        return this.httpTransport.get(`/${id}`);
    }

    search(data: Record<string, any>) {
        return this.httpTransport.post('/search', data);
    }
}

export default new UserAPI()
