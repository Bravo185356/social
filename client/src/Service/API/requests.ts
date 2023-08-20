import axios from "axios";

export default class RequestsApi {
  static async getRequests(id: number) {
    const response = await axios.get(`http://localhost:8080/api/requests/${id}`);
    return response.data;
  }
  static async acceptRequest(myId: number, id: number) {
    await axios.post("http://localhost:8080/api/request/accept", {
      myId: myId,
      id: id,
    });
  }
  static async rejectRequest(id: number) {
    await axios.delete("http://localhost:8080/api/request/reject", {
      data: {
        id: id,
      },
    });
  }
}
