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
    adAccountId : string
    adsetName: string,
    optimizationGoal: string,
    billingEvent: string,
    bidAmount: number,
    dailyBudget: number,
    campaignId: string,
    geolocations: GeoLocation,
    interests: Interest[],
    industries: Interest[], 
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
    geolocations: GeoLocation,
    interests: Interest[],
    // industries: AdTargetingCategory[],
    startTime: string,
    status: string,
    accessToken: string
    adAccountId: string
}

export interface Interest{
    id: number,
    name: string
}

export interface Targeting{
    geo_locations: GeoLocation,
    interests: Interest[]
}

export interface GeoLocation{
    cities: Cities[]
}
export interface Cities{
    key : string
}
export interface LocationData{
    key: string,
    cityName: string,
    countryName: string
}

export interface AdTargetingCategory{
    id: string,
    name: string,
    description: string,
    type: string
}

export interface AdImagePayload{
    adAccountId: string,
    imageFile: FormData,
    accessToken: string
}

export interface AdCreativePayload{
    creativeName: string,
    pageId: string,
    adsetId: string,
    imageFile: string
    imageHash: string,
    message: string,
    AdAccountId: string,
    accessToken: string
}

export interface ImageHash{
    hash: string
}

export interface AdCreative{
    creativeId: string,
    name: string,
    pageId: string,
    image: AdImagePayload,
    message: string
}