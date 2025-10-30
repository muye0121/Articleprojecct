import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createStorage } from "@/utils/storage";
export type ArtAddStore = {
  current: ArticleSteps;
  article: ArticleAddForm;
  _hasHydrated: boolean;
};
export enum Move {
  next = 1,
  prev = -1,
}
export enum ArticleSteps {
  base = 0,
  cover = 1,
  cotent = 2,
  done = 3,
}
const initState: ArtAddStore = {
  current: ArticleSteps.base,
  article: {} as ArticleAddForm,
  _hasHydrated: false,
};
const useArtAddStore = create<ArtAddStore>()(
  immer(
    devtools(
      persist(
        () => {
          // 数据
          return {
            ...initState,
          };
        },
        {
          name: "art-add-store",
          storage: createStorage<ArtAddStore>(),
          onRehydrateStorage() {
            return () => {
              useArtAddStore.setState((state) => {
                state._hasHydrated = true;
              });
            };
          },
        }
      ),
      { name: "art-add-store" }
    )
  )
);
export default useArtAddStore;
export const selectCurrent = (state: ArtAddStore) => state.current;
export const setCurrent = (step: Move = Move.next) => {
  useArtAddStore.setState((state) => {
    state.current += step;
  });
};
export const selectArticleBase = (state: ArtAddStore) => ({
  title: state.article.title,
  cate_id: state.article.cate_id,
});
export const setArticleBase = (formData: ArticleAddBaseForm) => {
  useArtAddStore.setState((state) => {
    state.article = { ...state.article, ...formData };
  });
};
export const setArticleCover = (cover: Blob) => {
  useArtAddStore.setState((state) => {
    state.article.cover_img = cover;
  });
};
export const selectCover = (state: ArtAddStore) => {
  const cover = state.article.cover_img;
  if (cover) {
    return URL.createObjectURL(cover);
  } else {
    return null;
  }
};
export const selectHasHydrated = (state: ArtAddStore) => state._hasHydrated;
export const selectContent = (state: ArtAddStore) => {
  return state.article.content;
};
export const setContent = (content: string) => {
  useArtAddStore.setState((state) => {
    state.article.content = content;
  });
};
export const setArticleState = (artstate: "草稿" | "已发布") => {
  useArtAddStore.setState((state) => {
    state.article.state = artstate;
  });
};
export const clearArticle=()=>{
  useArtAddStore.setState((state)=>{
    state.article={} as ArticleAddForm
  })
}
export const resetCurrent=()=>{
  useArtAddStore.setState(state=>{
    state.current=ArticleSteps.base
  })
}