import useFetch from "../_helpers/useFetch";
import { AccountHierarchyDto, CampaignPayload } from "../_models/Google.model";
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
    const response = await fetch.get(`${SERVER_ENDPOINT}/api/Google/GetManagerAccounts?refreshToken=${accessToken}`);
    
    return handleResponse<ResponseVM<string[]>>(response).then((data) => data);
}

export async function GetCLientAccounts(accessToken: string, customerId:string): Promise<ResponseVM<AccountHierarchyDto[]>>{
    const fetch = useFetch();
    const response = await fetch.get(`${SERVER_ENDPOINT}/api/Google/GetCLientAccounts?refreshToken=${accessToken}&customerId=${customerId}`);
    
    return handleResponse<ResponseVM<AccountHierarchyDto[]>>(response).then((data) => data);
}

export async function CreateAdcampaignService(payload: CampaignPayload): Promise<ResponseVM<string>>{
    const fetch = useFetch();
    const response = await fetch.post(`${SERVER_ENDPOINT}/api/Google/CreateCampaign`, payload);

    return handleResponse<ResponseVM<string>>(response).then((data) => data);
}
