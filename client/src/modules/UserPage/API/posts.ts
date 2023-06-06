interface BodyProps {
  content: string;
  userId: number;
}

export default class PostsApi {
  static async getUserPosts(id: number) {
    const response = await fetch(`http://localhost:8080/api/get-posts?id=${id}`)
    const data = await response.json()
    return data
  }
  static async createPost(body: BodyProps) {
    const response = await fetch("http://localhost:8080/api/create-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  }
  static async deletePost(id: number) {
    const response = await fetch(`http://localhost:8080/api/delete-post`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id
      }),
    });
    const data = await response.json();
    return data;
  }
}
