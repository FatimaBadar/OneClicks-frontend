import useFetch from "../_helpers/useFetch";
import { AccountHierarchyDto, AdGroup, AdGroupPayload, CampaignPayload, GoogleCampaign } from "../_models/Google.model";
import { ResponseVM } from "../_models/response.model";

const SERVER_ENDPOINT = process.env.SERVER_ENDPOINT || "https://oneclicksapi.azurewebsites.net";
// const SERVER_ENDPOINT = process.env.SERVER_ENDPOINT || "https://localhost:7256";
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

export async function GetClientAccounts(accessToken: string, customerId:string): Promise<ResponseVM<AccountHierarchyDto[]>>{
    const fetch = useFetch();
    const response = await fetch.get(`${SERVER_ENDPOINT}/api/Google/GetClientAccounts?refreshToken=${accessToken}&customerId=${customerId}`);
    
    return handleResponse<ResponseVM<AccountHierarchyDto[]>>(response).then((data) => data);
}

export async function CreateClientAccountService(refreshToken: string, customerId:string): Promise<ResponseVM<string>>{
    const fetch = useFetch();
    const response = await fetch.post(`${SERVER_ENDPOINT}/api/Google/CreateClientAccount`, {refreshToken, customerId});
    
    return handleResponse<ResponseVM<string>>(response).then((data) => data);
}

export async function CreateAdcampaignService(payload: CampaignPayload): Promise<ResponseVM<string>>{
    const fetch = useFetch();
    const response = await fetch.post(`${SERVER_ENDPOINT}/api/Google/CreateCampaign`, payload);

    return handleResponse<ResponseVM<string>>(response).then((data) => data);
}
export async function GetAllGoogleCampaigns(refreshToken: string, customerId: number, managerId: number): Promise<ResponseVM<GoogleCampaign[]>>{
    const fetch = useFetch();
    const response = await fetch.get(`${SERVER_ENDPOINT}/api/Google/GetAllCampaigns?refreshToken=${refreshToken}&customerId=${customerId}&managerId=${managerId}`);
    
    return handleResponse<ResponseVM<GoogleCampaign[]>>(response).then((data) => data);
}

export async function GetAllCampaignsGoogle(refreshToken: string, customerId: number, managerId: number): Promise<ResponseVM<any[]>>{
    const fetch = useFetch();
    const response = await fetch.get(`${SERVER_ENDPOINT}/api/Google/GetAllCampaigns?refreshToken=${refreshToken}&customerId=${customerId}&managerId=${managerId}`);
    
    return handleResponse<ResponseVM<any[]>>(response).then((data) => data);
}

export async function CreateAdGroupService(payload: AdGroupPayload): Promise<ResponseVM<string>>{
    const fetch = useFetch();
    const response = await fetch.post(`${SERVER_ENDPOINT}/api/Google/CreateAdGroup`, payload);

    return handleResponse<ResponseVM<string>>(response).then((data) => data);
}

export async function GetAllAdsService(refreshToken: string, clientId: number, customerId: number): Promise<ResponseVM<AdGroup[]>>{
    const fetch = useFetch();
    const response = await fetch.get(`${SERVER_ENDPOINT}/api/Google/GetAllAds?refreshToken=${refreshToken}&customerId=${clientId}&managerId=${customerId}`);
    
    return handleResponse<ResponseVM<AdGroup[]>>(response).then((data) => data);
}