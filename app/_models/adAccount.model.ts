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
    accessToken: string,
    type: string
}

export interface Campaign {
    campaignId: string,
    campaignName: string,
    objective: string,   
    status: string,    
    type: string
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
    accessToken: string,
    type: string
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
    adAccountId: string,
    type: string
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
    fileName: string,
    imageHash: string,
    message: string,
    AdAccountId: string,
    accessToken: string,
    type: string
}

export interface ImageHash{
    hash: string
}

export interface AdCreative{
    creativeId: string,
    creativeName: string,
    adsetId: string,
    imageHash: string,
    fileName: string
    message: string,
    type: string
}

export interface Ads{
    id?: string
    adName: string
    adsetId: string
    adsetName: string,
    creativeId: string,
    status: string,
    accessToken: string
    adAccountId: string,
    type: string
}

export interface AdPayloadData{
    campaignData: CampaignData[],
    adSetData: AdsetData[],
    adCreativeData: CreativeData[]
}

export interface CampaignData{
    id: string,
    name: string
}
export interface AdsetData{
    id: string,
    name: string
    campaignId: string
}
export interface CreativeData{
    id: string,
    name: string
}