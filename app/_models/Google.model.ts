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
  
  // advertisingChannelType: string
  // targetGoogleSearch: boolean
  // targetSearchNetwork: boolean
  // budgetName: string;
  // budgetAmount: string;
  // budgetDeliveryMethod: string;
  // customerId: number,
  // refreshToken: string,
  type: string
}

export interface AdGroupPayload{
  adGroupName: string
  campaignId: string
  adGroupBidAmount: string
  adGroupStatus: string
  customerId: number,
  refreshToken: string,
  type: string
  searchAds: SearchAd
  keywords: Keywords
  geoTargeting: GeoTargeting
}

export interface SearchAd{
  customizerAttributeName: string
  customizerAttributePrice: string
  targetUrl: string
}

export interface Keywords{
  keywords: string
  negative: boolean
}

export interface GeoTargeting{
  countryCode: string
  cityName: string[]
}

export interface AdGroup{
  adGroupId: string
  adGroupName: string
  campaignId: string
  campaignName: string
  adGroupBidAmount: string
  adGroupStatus: string
  customerId: number,
  refreshToken: string,
  managerId: number
  type: string
  searchAds: SearchAd
  keywords: Keywords
  geoTargeting: GeoTargeting
}
  