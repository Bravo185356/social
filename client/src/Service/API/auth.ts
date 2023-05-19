interface LoginByFormProps {
  login: string;
  password: string;
}
interface CreateUserProps {
  name: string;
  surname: string;
  login: string;
  password: string;
  city: string;
}

export default class AuthApi {
  static async loginByForm({ login, password }: LoginByFormProps) {
    const response = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login,
        password,
      }),
    });
    const data = await response.json();
    console.log(data);
    return data;
  }
  static async loginOnPageLoad(token: string) {
    console.log(token)
    const response = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: token,
      }),
    });
    const data = await response.json();
    return data;
  }
  static async createUser({ name, surname, login, password, city }: CreateUserProps) {
    const response = await fetch(`http://localhost:8080/api/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        surname,
        login,
        password,
        city,
      }),
    });
    const user = await response.json();
    console.log(user.rows[0]);
    return 
  }
}
