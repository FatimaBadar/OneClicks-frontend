import { Adset, Campaign } from "../_models/adAccount.model";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AdStore {
    campaigns: Campaign[];
    setCampaigns: (campaign: Campaign[]) => void;
    removeCampaigns: () => void;

    adsets: Adset[];
    setAdsets: (adset: Adset[]) => void;
    removeAdsets: () => void
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
    }),
    {
      name: "adStore",
      skipHydration: true,
    }
  )
)

export default useAdStore;