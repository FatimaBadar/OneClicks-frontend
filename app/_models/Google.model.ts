export interface AccountHierarchyDto {
    customerId: number;
    descriptiveName: string;
    currencyCode: string;
    timeZone: string;
    childAccounts: AccountHierarchyDto[];
  }
  