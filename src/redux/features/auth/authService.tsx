import axios from "axios";

interface LoginData {
  email: string;
  password: string;
}

export default function loginApi(data: LoginData) {
  return axios.post("http://127.0.0.1:8000/api/auth/login", data);
}
