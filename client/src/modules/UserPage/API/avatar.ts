import axios from "axios";

export default class AvatarApi {
  static async updateAvatar(formData: FormData) {
    const response = await axios.post("http://localhost:8080/api/change-avatar", formData);
    return response.data
  }
}
