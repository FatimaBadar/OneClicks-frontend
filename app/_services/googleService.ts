import useFetch from "../_helpers/useFetch";
import { ResponseVM } from "../_models/response.model";

// const SERVER_ENDPOINT = process.env.SERVER_ENDPOINT || "https://oneclicksapi.azurewebsites.net";
const SERVER_ENDPOINT = process.env.SERVER_ENDPOINT || "https://localhost:7256";
// 

async function handleResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get("Content-Type") || "";
    const isJson = contentType.includes("application/json");
    const data = isJson ? await response.json() : await response.text();

    if (!response.ok) {
        if (isJson && data.errors !== null) {
            throw new Error(JSON.stringify(data.errors));
        }

        throw new Error(data.message || response.statusText);
    }
    return data as T;
}
export async function GetRefreshToken(accessToken: string):  Promise<ResponseVM<string>>{
    const fetch = useFetch();
    const response = await fetch.get(`${SERVER_ENDPOINT}/api/Google/GetRefreshToken?code=${accessToken}`);
    
    return handleResponse<ResponseVM<string>>(response).then((data) => data);
}

export async function GetManagerAccounts(accessToken: string):  Promise<ResponseVM<string[]>>{
    const fetch = useFetch();
    const response = await fetch.get(`${SERVER_ENDPOINT}/api/Google/GetManagerAccounts?accessToken=${accessToken}`);
    
    return handleResponse<ResponseVM<string[]>>(response).then((data) => data);
}

export async function GetCLientAccounts(accessToken: string):  Promise<ResponseVM<string[]>>{
    const fetch = useFetch();
    const response = await fetch.get(`${SERVER_ENDPOINT}/api/Google/GetCLientAccounts?accessToken=${accessToken}`);
    
    return handleResponse<ResponseVM<string[]>>(response).then((data) => data);
}
