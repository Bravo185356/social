export default class RequestsApi {
  static async getAlert(id: number) {
    const response = await fetch(`http://localhost:8080/api/get-requests?id=${id}`);
    const alerts = await response.json();
    return alerts.rows;
  }
  static async acceptRequest(myId: number, id: number) {
    await fetch("http://localhost:8080/api/accept-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        myId: myId,
        id: id,
      }),
    });
  }
  static async rejectRequest(id: number) {
    await fetch("http://localhost:8080/api/reject-request", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
  }
}
