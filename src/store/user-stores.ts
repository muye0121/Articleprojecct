import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import resetters from "./resetters";
import { getUserApi } from "@/api/user-api";
import to from "await-to-js";
const initState = {
  user: {} as User,
};
type UserStoreType = typeof initState;
const useUserStore = create<UserStoreType>()(
  immer(
    devtools(
      persist(
        (set) => {
          resetters.push(() => set(initState));
          return {
            ...initState,
          };
        },
        { name: "user-store" }
      ),
      { name: "user-store" }
    )
  )
);
export default useUserStore;
export const selectName=(state:UserStoreType)=>{return state.user.nickname||state.user.username}
//初始化用户的基本信息
export const selectAvatar=(state:UserStoreType)=>{return state.user.user_pic}
export const selectUserinfo=(state:UserStoreType)=>{return {id:state.user.id,nickname:state.user.nickname,email:state.user.email}}
export const initUser = async () => {
  const [err, res] = await to(getUserApi());
  if (err) return null;
  useUserStore.setState((state) => {
    if (res.data) {
      state.user = res.data;
    }
  });
};
