// export interface AdAccount{
//     accessToken: string,
//     data_access_expiration_time: number,
//     expiresIn: number
//     graphDomain: string,
//     signedRequest: string,
//     userID: string
// }
export interface AdAccount{
    userId: string, 
    accountId: string,
    adAccountId: string,
    pages: string[],
    platform: string,
    longLiveToken: string
}

export interface Campaign {
    campaignId?:string,
    campaignName: string,
    objective: string,
    status: string,
    specialAdCategories: string[],
    ad_accountId: string,
    accessToken: string
}

export interface Adset{
    adsetName: string,
    optimizationGoal: string,
    billingEvent: string,
    bidAmount: number,
    dailyBudget: number,
    campaignId: string,
    geolocations: string[],
    interests: string,
    startTime: string,
    status: string,
    accessToken: string
}