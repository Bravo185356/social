import axios from "axios";

interface BodyProps {
  content: string;
  userId: number;
}

export default class PostsApi {
  static async getUserPosts(id: number) {
    const response = await axios.get(`http://localhost:8080/api/posts/${id}`)
    return response.data
  }
  static async createPost(body: BodyProps) {
    const response = await axios.post("http://localhost:8080/api/post/create", body);
    return response.data;
  }
  static async deletePost(id: number) {
    const response = await axios.delete(`http://localhost:8080/api/post/delete`, {
      data: {
        id: id
      } 
    });
    return response.data;
  }
}
