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
export interface CampaignPayload {
    campaignName: string,
    objective: string,
    specialAdCategories: string[],
    status: string,
    adAccountId: string,
    accessToken: string
}

export interface Campaign {
    id:  string,
    campaignId: string,
    campaignName: string,
    objective: string,
    specialAdCategories: string[],
    status: string,
    adAccountId: string,
    accessToken: string
}
export interface AdsetPayload{
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

export interface Adset{
    adsetId: string
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

export interface AdImage{
    imageId?: string,
    filename: string,
    accessToken: string
}

export interface AdCreative{
    creativeId: string,
    name: string,
    pageId: string,
    image: AdImage,
    message: string
}