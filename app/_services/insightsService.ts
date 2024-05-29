import useFetch from "../_helpers/useFetch";
import { InsightsData } from "../_models/insight.model";
import { ResponseVM } from "../_models/response.model";

// const SERVER_ENDPOINT = process.env.SERVER_ENDPOINT || "https://localhost:7256";
const SERVER_ENDPOINT = process.env.SERVER_ENDPOINT || "https://oneclicksapi.azurewebsites.net";


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

export async function GetRecentActivityService():  Promise<ResponseVM<InsightsData[]>>{
    const fetch = useFetch();
    const response = await fetch.get(`${SERVER_ENDPOINT}/api/Insights/GetRecentActivity`);
    
    return handleResponse<ResponseVM<InsightsData[]>>(response).then((data) => data);
}

export async function GetBudgetAmountFacebook(adAccountId: string, accessToken: string):  Promise<ResponseVM<number>>{
    const fetch = useFetch();
    const response = await fetch.get(`${SERVER_ENDPOINT}/api/Insights/GetBudgetAmountFacebook?accessToken=${accessToken}&adAccountId=${adAccountId}`);
    
    return handleResponse<ResponseVM<number>>(response).then((data) => data);
}