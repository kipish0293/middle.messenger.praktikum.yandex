import HTTPTransport from "../helpers/httpTransport";

class ChatAPI {
    httpTransport: HTTPTransport;

    constructor() {
        this.httpTransport = new HTTPTransport('/chats');
    }

    getChatUsers(chatId: number) {
        return this.httpTransport.get(`/${chatId}/users`);
    }

    getUnreadCountMessage(chatId: number) {
        return this.httpTransport.get(`/new/${chatId}`);
    }

    getChats(params: Record<string, any>) {
        return this.httpTransport.get("/", params);
    }

    createChat(data: Record<string, any>) {
        return this.httpTransport.post("/", { data });
    }

    chatToken(chatId: number) {
        return this.httpTransport.post(`/token/${chatId}`);
    }

    avatar(data: FormData) {
        return this.httpTransport.put("/avatar", { data });
    }

    addUsers(data: Record<string, any>) {
        return this.httpTransport.put("/users", { data });
    }

    deleteChatUsers(data: Record<string, any>) {
        return this.httpTransport.delete("/users", { data });
    }

    deleteChatById(data: Record<string, any>) {
        return this.httpTransport.delete("/", { data });
    }
}

export default new ChatAPI();
