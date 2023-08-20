import axios from "axios";

export default class ChatApi {
    static async getAllChats(id: number) {
        const response = await axios.get(`http://localhost:8080/api/chats/${id}`)
        return response.data
    }
    static async getAllMessages(id: number) {
        const response = await axios.get(`http://localhost:8080/api/chat/messages/${id}`)
        return response.data
    }
    static async getUsersInChat(id: number) {
        const response = await axios.get(`http://localhost:8080/api/chat/users/${id}`)
        return response.data
    }
    static async getUsersInfo(user_1: number, user_2: number) {
        const response = await axios.get('http://localhost:8080/api/chat/users', {
            params: {
                user_1,
                user_2
            }
        })
        return response.data
    }
}