import ChatApi from "../api/chat-api";
import store from "../helpers/store";

class ChatController {
    public async getChats(params: any) {
        try {
            console.log(params)
            const res = await ChatApi.getChats(params);
            store.set("chat.chatList", res.data);
        } catch (error) {
            console.log(error);
            return;
        }
    }

    public async createChat(data: Record<string, any>) {
        try {
            const res = await ChatApi.createChat(data);
            store.set("chat.currentChatId", res.data)
        } catch (error) {
            console.log(error);
            return;
        }
    }

    public async addUsers(data: Record<string, any>) {
        try {
            const res = await ChatApi.addUsers(data);
            console.log(res)
        } catch (error) {
            console.log(error);
            return;
        }
    }

    public async chatToken(chatId: number) {
        try {
            const res = await ChatApi.chatToken(chatId);
            console.log(res.data, 'TOKEN IN CONTROLLER')
            return res.data
        } catch (error) {
            console.log(error);
            return;
        }
    }

    public async getChatUsers(chatId: number) {
        try {
            const res = await ChatApi.getChatUsers(chatId);
            return res.data
        } catch (error) {
            console.log(error);
            return;
        }
    }

    public async deleteChatUsers(data: Record<string, any>) {
        try {
            const res = await ChatApi.deleteChatUsers(data);
            return res.data
        } catch (error) {
            console.log(error);
            return;
        }
    }
}

export default new ChatController();
