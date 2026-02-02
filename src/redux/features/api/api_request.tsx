import axios from "axios";
import Cookies from "js-cookie";

export default function postAPI (data: any){
    const token = Cookies.get("access");
    return axios.post(`${process.env.NEXT_PUBLIC_API_CONTENT_URL}job/create/`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export async function fetchAPI (user_id:number){
    return axios.get(`${process.env.NEXT_PUBLIC_API_CONTENT_URL}job/list/${user_id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
}

export async function standard_post_api(url: string, data: any){
    const token = Cookies.get("access");
    const baseUrl = process.env.NEXT_PUBLIC_API_CONTENT_URL
    return axios.post(baseUrl+url, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export async function standard_get_api(url: string){
    const token = Cookies.get("access");
    const baseUrl = process.env.NEXT_PUBLIC_API_CONTENT_URL
    return axios.get(baseUrl+url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}


export async function standard_update_api (url: string, data: any){
    const token = Cookies.get("access");
    const baseUrl = process.env.NEXT_PUBLIC_API_CONTENT_URL

    return axios.put(baseUrl+url, data, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        }
    });
}

export async function standard_delete_api (url: string){
    const token = Cookies.get("access");
    const baseUrl = process.env.NEXT_PUBLIC_API_CONTENT_URL
    return axios.delete(baseUrl+url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}