import useFetch from "../_helpers/useFetch";
import { ResponseVM } from "../_models/response.model";
import { AdAccount, Campaign, Adset, AdImage, CampaignPayload, AdsetPayload, Interest, LocationData, AdTargetingCategory } from "../_models/adAccount.model";

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

export async function ConnectAdAccount(accessToken: string): Promise<ResponseVM<AdAccount>>{
    const fetch = useFetch();
    const response = await fetch.get(`${SERVER_ENDPOINT}/api/Accounts/getAdAccountData?accessToken=${accessToken}`);
   
    return handleResponse<ResponseVM<AdAccount>>(response).then((data) => data);
}

export async function CreateCampaignService(payload: CampaignPayload): Promise<ResponseVM<Campaign>> {
    const fetch = useFetch();
    const response = await fetch.post(`${SERVER_ENDPOINT}/api/Campaigns/CreateCampaign`,payload);

    return handleResponse<ResponseVM<Campaign>>(response).then((data) => data);
}

export async function getAllCampaignsService():  Promise<ResponseVM<Campaign[]>>{
    const fetch = useFetch();
    const response = await fetch.get(`${SERVER_ENDPOINT}/api/Campaigns/GetAllCampaigns`);
    
    return handleResponse<ResponseVM<Campaign[]>>(response).then((data) => data);
}

export async function CreateAdsetService(payload: AdsetPayload): Promise<ResponseVM<Adset>> {
    const fetch = useFetch();
    const response = await fetch.post(`${SERVER_ENDPOINT}/api/Campaigns/CreateAdset`, payload);

    return handleResponse<ResponseVM<Adset>>(response).then((data) => data);
}
export async function CreateAdImageHashService(payload: AdImage): Promise<ResponseVM<AdImage>> {
    const fetch = useFetch();
    const response = await fetch.post(`${SERVER_ENDPOINT}/api/Campaigns/CreateAdset`, payload);

    return handleResponse<ResponseVM<AdImage>>(response).then((data) => data);
}

export async function GetInterestsSearchData(interests: string, accessToken: string):  Promise<ResponseVM<Interest[]>>{
    const fetch = useFetch();
    const response = await fetch.get(`${SERVER_ENDPOINT}/api/Campaigns/GetInterests?accessToken=${accessToken}&interests=${interests}`);
    
    return handleResponse<ResponseVM<Interest[]>>(response).then((data) => data);
}

export async function GetIndustrySearchData(accessToken: string): Promise<ResponseVM<AdTargetingCategory[]>>{
    const fetch = useFetch();
    const response = await fetch.get(`${SERVER_ENDPOINT}/api/Campaigns/GetTargetingCategory?accessToken=${accessToken}&targetType=industries`);
    
    return handleResponse<ResponseVM<AdTargetingCategory[]>>(response).then((data) => data);
}

export async function GetCitySearchData(city: string, accessToken: string):  Promise<ResponseVM<LocationData[]>>{
    const fetch = useFetch();
    const response = await fetch.get(`${SERVER_ENDPOINT}/api/Campaigns/GetCities?accessToken=${accessToken}&city=${city}`);
    
    return handleResponse<ResponseVM<LocationData[]>>(response).then((data) => data);
}