import axios from "axios";

export default function postAPI (data: any){
    const token = localStorage.getItem("token");
    return axios.post("http://localhost:8000/api/job/create/", data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export async function fetchAPI (url: string){
    return axios.get(url);
}

export async function updateAPI (url: string, data: any){
    return axios.put(url, data);
}

export async function deleteAPI (url: string){
    return axios.delete(url);
}
