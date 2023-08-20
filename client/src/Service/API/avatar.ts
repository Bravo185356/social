import axios from "axios";

export default class AvatarApi {
  static async updateAvatar(formData: FormData) {
    const response = await axios.post("http://localhost:8080/api/avatar/change", formData);
    return response.data;
  }
  static async getRecentAvatars(id: number) {
    const response = await axios.get(`http://localhost:8080/api/avatars/recent/${id}`);
    return response.data;
  }
  static async selectFromRecentAvatars(id: number, img: string) {
    const response = await axios.post("http://localhost:8080/api/avatar/select", {
      id,
      img,
    });
    return response.data;
  }
}
