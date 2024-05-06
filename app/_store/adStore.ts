import { AdCreative, Ads, Adset, Campaign } from "../_models/adAccount.model";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AdStore {
    campaigns: Campaign[];
    setCampaigns: (campaign: Campaign[]) => void;
    removeCampaigns: () => void;

    adsets: Adset[];
    setAdsets: (adset: Adset[]) => void;
    removeAdsets: () => void

    creatives: AdCreative[];
    setCreatives: (creative: AdCreative[]) => void;
    removeCreatives: () => void

    ads: Ads[];
    setAds: (ad: Ads[]) => void;
    removeAds: () => void
}
  
const useAdStore = create<AdStore>()(
  persist(
    (set) => ({
      campaigns: [],
      setCampaigns: (campaign) => {
        set({campaigns: campaign})
      },
      removeCampaigns: ()=>{
        set({ campaigns: [] });
      },
      
      adsets: [],
      setAdsets: (a) => {
        set({adsets: a})
      },
      removeAdsets: ()=>{
        set({ adsets: [] });
      },

      creatives: [],
      setCreatives: (c) => {
        set({creatives: c})
      },
      removeCreatives: ()=>{
        set({ creatives: [] });
      },

      ads: [],
      setAds: (a) => {
        set({ads: a})
      },
      removeAds: ()=>{
        set({ ads: [] });
      },
  }),

    {
      name: "adStore",
      skipHydration: true,
    }
  )
)

export default useAdStore;