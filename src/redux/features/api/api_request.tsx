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

export async function standard_post_api(url: string, data: any){
    const token = localStorage.getItem("token");
    const baseUrl = "http://localhost:8000"
    return axios.post(baseUrl+url, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export async function standard_get_api(url: string){
    const token = localStorage.getItem("token");
    const baseUrl = "http://localhost:8000"
    return axios.get(baseUrl+url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}


export async function updateAPI (url: string, data: any){
    const token = localStorage.getItem("token");
    const baseUrl = "http://localhost:8000"
}

export async function standard_delete_api (url: string){
    const token = localStorage.getItem("token");
    const baseUrl = "http://localhost:8000"
    return axios.delete(baseUrl+url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
