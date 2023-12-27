const app_id = process.env.FACEBOOK_ID;
const app_secret = process.env.FACEBOOK_SECRET;
const FACEBOOK_GRAPH_URL = "https://graph.facebook.com/v18.0"
// import { NextResponse } from "next/server";

export async function GET(req: Request, res:Response) {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (token !== null) {
        // console.log("inside handler")
        const appAccessToken = await getAppAccessToken();
        const scopes = await debugToken(appAccessToken, token);
        console.log("Scopes and Permissions: ", scopes); 

        return Response.json({ scopes})
    }
}

const getAppAccessToken = async () =>{
    const response = await 
    fetch(`https://graph.facebook.com/oauth/access_token?client_id=${app_id}&client_secret=${app_secret}&grant_type=client_credentials`)

    const data : {access_token: string} = await response.json();
    if(response.ok){
        console.log("Access token in Debug handler: ", data.access_token);
    }
    else{
        console.log("App access token failed")
    }
    return data.access_token;
}

const debugToken =async (appAccessToken: string, token: string) => {
    const response = await fetch(`${FACEBOOK_GRAPH_URL}/debug_token?input_token=${token}&access_token=${appAccessToken}`)

    const data : {data : {scopes: string[]}} = await response.json();

    return data.data.scopes;
}