import { create } from "zustand";
import { ArticleSteps, Move } from "./art-add-store";
import { persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createStorage } from "@/utils/storage";
import { getArticleApi } from "@/api/article-api";
import config from '@/config.json'
import to from "await-to-js";
type EditStore = {
  article: ArticleEditForm;
  current: number;
};
const initialState = {
  current: ArticleSteps.base,
  article: {} as ArticleEditForm,
};
const useArticleEditStore = create<EditStore>()(
  immer(
    devtools(
      persist(
        () => {
          return {
            ...initialState,
          };
        },
        {
          name: "art-edit-store",
          storage: createStorage(),
          //自定义存储到本地的数据
          partialize(state) {
            return { article: state.article };
          },
        }
      ),
      { name: "art-edit-store" }
    )
  )
);
export default useArticleEditStore;
export const initArticle = async (id: string) => {
  const [err, res] = await to(getArticleApi(id));
  if (err) return null;
  useArticleEditStore.setState((state) => {
    if (res.data) {
      state.article = res.data;
    }
  });
  return true
};
export const selectCurrent = (state: EditStore) => state.current;
export const updateCurrent = (step: Move = Move.next) => {
  useArticleEditStore.setState((state) => {
    state.current += step;
  });
};
export const selectBase = (state: EditStore) => ({
  title: state.article.title,
  cate_id: state.article.cate_id,
});
export const updateBase = (values: ArticleEditBaseForm) => {
  useArticleEditStore.setState((state) => {
    state.article = { ...state.article, ...values };
  });
};
export const resetCurrent = () => {
  useArticleEditStore.setState((state) => {
    state.current = ArticleSteps.base;
  });
};
export const selectCover = (state: EditStore) => {
  const cover = state.article.cover_img;
  if (cover) {
    if(typeof cover =='string'){
        return config.baseURL+cover
    }
    return URL.createObjectURL(cover);
  } else {
    return null;
  }
};
export const setArticleCover = (cover: Blob) => {
 useArticleEditStore.setState((state) => {
    state.article.cover_img = cover;
  });
};
export const setContent=(content:string)=>{
    useArticleEditStore.setState(state=>{
        state.article.content=content;
    })
}
export const selectContent=(state:EditStore)=>state.article.content
export const setArticleState=(artstate:'已发布'|'草稿')=>{
    useArticleEditStore.setState(state=>{
        state.article.state=artstate
    })
}
export const selectIsShowDraft=(state:EditStore)=>state.article.state==='草稿'