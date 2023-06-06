export default class AvatarApi {
  static async updateAvatar(formData: FormData) {
    const response = await fetch("http://localhost:8080/api/change-avatar", {
      method: "POST",
      body: formData,
    });
    const newImg = await response.json();
    return newImg
  }
}
