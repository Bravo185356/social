import axios from "axios";

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
    const response = await axios.post("http://localhost:8080/api/login-by-form", {
      login,
      password,
    });
    return response.data;
  }
  static async loginOnPageLoad(token: string) {
    const response = await axios.post("http://localhost:8080/api/login", {
      id: token,
    });
    return response.data;
  }
  static async createUser({ name, surname, login, password, city }: CreateUserProps) {
    const response = await axios.post(`http://localhost:8080/api/create`, {
      name,
      surname,
      login,
      password,
      city,
    });
    return response.data
  }
}