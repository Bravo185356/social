import axios from "axios";

export default class AvatarApi {
  static async updateAvatar(formData: FormData) {
    const response = await axios.post("http://localhost:8080/api/change-avatar", formData);
    return response.data;
  }
  static async getRecentAvatars(id: number, currentImg: string) {
    const response = await axios.get("http://localhost:8080/api/get-avatars", {
      params: {
        id,
        currentImg,
      },
    });
    return response.data;
  }
  static async selectFromRecentAvatars(id: number, img: string) {
    const response = await axios.post("http://localhost:8080/api/select-avatar", {
      id,
      img,
    });
    return response.data;
  }
}
