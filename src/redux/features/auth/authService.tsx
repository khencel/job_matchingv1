import axios from "axios";

export default function loginApi (data: any) {
  return axios.post("http://127.0.0.1:8000/api/auth/login", data);
};
