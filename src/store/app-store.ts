import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import resetters from "./resetters";
const initState = {
  token: "",
  collapsed:false,
};
type AppStoreType = typeof initState;
const useAppStore = create<AppStoreType>()(
  immer(
    devtools(
      persist(
        (set) => {
          resetters.push(()=>set(initState))
          return {
            ...initState,
          };
        },
        { name: "app-store" }
      ),
      { name: "app-store" }
    )
  )
);
export default useAppStore;
export const setToken=(token:string)=>{
    useAppStore.setState((state)=>{
        state.token=token
    })
}
export const setCollapsed=(collapsed:boolean)=>{
    useAppStore.setState((state)=>{
        state.collapsed=collapsed
    })
}
export const selectCollapse=(state:AppStoreType)=>state.collapsed
export const selectorToken=(state:AppStoreType)=>state.token