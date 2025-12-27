import axios from "axios";

export default function postAPI (data: any){
    const token = localStorage.getItem("token");
    return axios.post("http://localhost:8000/api/job/create/", data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export async function fetchAPI (user_id:number){
    return axios.get(`http://localhost:8000/api/job/list/${user_id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
}

export async function updateAPI (url: string, data: any){
    return axios.put(url, data);
}

export async function deleteAPI (url: string){
    return axios.delete(url);
}
