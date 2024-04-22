import { User } from "../_models/user.model";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Store {
    loggedIn: boolean,
    setLoggedIn: () => void;
    setLoggedOut: () => void;
    authUser: User | null;
    setAuthUser: (user: User) => void;
    removeAuthUser: () => void;
  }
  
const useStore = create<Store>()(
  persist(
    (set) => ({
      loggedIn: false,
      setLoggedIn() {
          set({loggedIn: true});
      },
      setLoggedOut() {
          set({loggedIn: false});
      },
      authUser: null,
      setAuthUser: (user) => {
        set({ authUser: user });
      },
      removeAuthUser: ()=>{
        set({ authUser: null });
      }
    }),
    {
      name: "userStore",
      skipHydration: true,
    }
  )
)

export default useStore;