import useFetch from "../_helpers/useFetch";
import { ResponseVM } from "../_models/response.model";
import { User, UserPayload } from "../_models/user.model";

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

export async function RegisterService(payload: UserPayload): Promise<ResponseVM<User>> {
    const fetch = useFetch();
    const response = await fetch.post(`${SERVER_ENDPOINT}/api/accounts/register`, payload);

    return handleResponse<ResponseVM<User>>(response).then((data) => data);
}

export async function LoginService(username: string, password: string): Promise<ResponseVM<User>>{
    const fetch = useFetch();
    const response = await fetch.post(`${SERVER_ENDPOINT}/api/Accounts/login`, {username, password});
   
    return handleResponse<ResponseVM<User>>(response).then((data) => data);
}

export async function VerifyService(token: string | any):  Promise<ResponseVM<User>>{
    const fetch = useFetch();
    const response = await fetch.get(`${SERVER_ENDPOINT}/api/Accounts/verify?token=${token}`);
    
    return handleResponse<ResponseVM<User>>(response).then((data) => data);
    // return handleResponse<ResponseVM<User>>(verifyToken).then((data) => data.responseData);
}

export async function ResetPasswordService(token :string |null,password: string, confirmPassword :string): Promise<ResponseVM<User>>{
    const fetch = useFetch();
    const response = await fetch.post(`${SERVER_ENDPOINT}/api/accounts/resetPassword`, {token,password,confirmPassword});

    // return handleResponse<ResponseVM<User>>(response).then((data) => data.responseData);
    return handleResponse<ResponseVM<User>>(response).then((data) => data);
}
export async function ForgetPasswordService(username :string): Promise<ResponseVM<User>>{
    const fetch = useFetch();
    const response = await fetch.post(`${SERVER_ENDPOINT}/api/Accounts/forgetPassword`, {username});

    return handleResponse<ResponseVM<User>>(response).then((data) => data);
    // return handleResponse<ResponseVM<User>>(response).then((data) => data.responseData);
}

// export async function getUsersService(password: string): Promise<User>{
//     const responseToken = await fetch.get(`${SERVER_ENDPOINT}/api/getUsers`);

//     return handleResponse<ResponseVM<User>>(responseToken).then((data) => data.responseData);
// }

// export async function deleteUserService(id: string): Promise<User>{
//     const responseToken = await fetch.delete(`${SERVER_ENDPOINT}/api/user/${id}`);

//     return handleResponse<ResponseVM<User>>(responseToken).then((data) => data.responseData);
// }


// export async function apiLogoutUser(): Promise<void> {    
//     const response = await fetch(`${SERVER_ENDPOINT}/api/auth/logout`, {
//         method: "GET",
//         credentials: "include",
//         headers: {
//             "Content-Type": "application/json",
//         },
//     });

//     return handleResponse<void>(response);
// }

// export async function apiGetAuthUser(token?: string): Promise<FilteredUser> {
//     const headers: Record<string, string> = {
//         "Content-Type": "application/json",
//     };

//     if (token) {
//         headers["Authorization"] = `Bearer ${token}`;
//     }
//     const response = await fetch(`${SERVER_ENDPOINT}/api/users/me`, {
//         method: "GET",
//         credentials: "include",
//         headers,
//     });

//     return handleResponse<UserResponse>(response).then((data) => data.data.user);
// }
