import useFetch from "../_helpers/useFetch";
import { ResponseVM } from "../_models/response.model";
import { AdAccount, Campaign, Adset } from "../_models/adAccount.model";

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

export async function ConnectAdAccount(accessToken: string): Promise<ResponseVM<any>> {
    const fetch = useFetch();
    const response = await fetch.post(`${SERVER_ENDPOINT}/api/Accounts/GetAdAccountData`, accessToken);
    return handleResponse<ResponseVM<any>>(response).then((data) => data);
}
// export async function ConnectAdAccount(accessToken: string): Promise<ResponseVM<any>> {    
//      const fetch = useFetch();     
//      const headers = new Headers();     
//      headers.append('accessToken', accessToken);     
//      const response = await fetch.get(`${SERVER_ENDPOINT}/api/Accounts/GetAdAccountData`, 
//      {         headers: headers     });     
// return handleResponse<ResponseVM<any>>(response).then((data) => data); }

export async function CreateCampaignService(payload: Campaign): Promise<ResponseVM<Campaign>> {
    const fetch = useFetch();
    const response = await fetch.post(`${SERVER_ENDPOINT}/api/ads/createcampaign`,payload);
    //  {payload,
    //     headers: {
    //         'accesstoken': payload.accessToken
    //     }
    // });

    return handleResponse<ResponseVM<Campaign>>(response).then((data) => data);
}

export async function CreateAdsetService(payload: Adset): Promise<ResponseVM<Adset>> {
    const fetch = useFetch();
    const response = await fetch.post(`${SERVER_ENDPOINT}/api/ads/createadset`, payload);

    return handleResponse<ResponseVM<Adset>>(response).then((data) => data);
}