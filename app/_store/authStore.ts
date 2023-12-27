import { User } from "../_models/user.model";
import { create } from "zustand";

interface Store {
    authUser: User | null;
    setAuthUser: (user: User) => void;
    removeAuthUser: () => void;
  }
  
const useStore = create<Store>((set) => ({
    authUser: null,
    setAuthUser: (user) => {
        set({ authUser: user });
      },
    removeAuthUser: ()=>{
      set({ authUser: null });
    }
}))

export default useStore;