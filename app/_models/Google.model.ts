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

export interface Campaign{
  id: string
  campaignName: string
  campaignId: string
  advertisingChannelType: string
  status: string
  targetGoogleSearch: boolean
  targetSearchNetwork: boolean
  budget: string;
  startDate: string
  endDate: string,
  customerId: number,
  refreshToken: string,
  type: string
}
  