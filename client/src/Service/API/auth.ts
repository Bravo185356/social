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
  confirmPassword: string;
  city: string;
}

export default class AuthApi {
  static async loginByForm({ login, password }: LoginByFormProps) {
    const response = await axios.post("http://localhost:8080/api/auth/login-by-form", {
      login,
      password,
    });
    return response.data;
  }
  static async loginOnPageLoad(token: string) {
    const response = await axios.post("http://localhost:8080/api/auth/login", {
      token,
    });
    return response.data;
  }
  static async createUser({ name, surname, login, password, confirmPassword, city }: CreateUserProps) {
    const response = await axios.post(`http://localhost:8080/api/auth/create`, {
      name,
      surname,
      login,
      password,
      confirmPassword,
      city,
    });
    return response.data
  }
}