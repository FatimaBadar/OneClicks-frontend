export interface AccountHierarchyDto {
    customerId: number;
    descriptiveName: string;
    currencyCode: string;
    timeZone: string;
    childAccounts: AccountHierarchyDto[];
  }
  
export interface CampaignPayload{
  campaignName: string
  advertisingChannelType: string
  status: string
  targetGoogleSearch: boolean
  targetSearchNetwork: boolean
  budgetName: string;
  budgetAmount: string;
  budgetDeliveryMethod: string;
  startDate: string
  endDate: string,
  customerId: number,
  managerId: number,
  refreshToken: string,
  type: string
}

export interface GoogleCampaign{
  id: string
  campaignId: string
  campaignName: string
  manualCpc: string
  status: string
  startDate: string
  endDate: string,
  type: string
}

export interface AdGroupPayload{
  adGroupName: string
  campaignId: number
  campaignName: string
  adGroupBidAmount: string
  adGroupStatus: string
  customerId: number,
  managerId: number,
  refreshToken: string,
  type: string
  searchAds: SearchAd
  keywords: Keywords
  geoTargeting: GeoTargeting
}

export interface SearchAd{
  targetUrl: string
  headlines: string[]
  descriptions: string[] 
  path1?: string
  path2?: string
}

export interface Keywords{
  keywords: string
  negative: boolean
}

export interface GeoTargeting{
  countryCode: string
  cityName: string[]
}

export interface GeoTargetingData {
  CriteriaId: string,
  Name: string
  CanonicalName: string
  ParentId: string
  CountryCode: string
  TargetType: string
  Status: string
}

export interface AdGroup{
  adId: string
  adName: string
  headlines: string[]
  descriptions: string[]
  status: string
  type: string
}
  