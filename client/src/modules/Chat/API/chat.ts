import axios from "axios";

export default class ChatApi {
    static async getAllChats(id: number) {
        const response = await axios.get('http://localhost:8080/api/chat/get-all-chats', {
            params: {
                id
            }
        })
        return response.data
    }
    static async getAllMessages(chatId: number) {
        const response = await axios.get('http://localhost:8080/api/chat/get-all-messages', {
            params: {
                chatId
            }
        })
        return response.data
    }
    static async getUsersInChat(chatId: number) {
        const response = await axios.get('http://localhost:8080/api/chat/get-users', {
            params: {
                chatId
            }
        })
        console.log(response.data)
        return response.data
    }
}