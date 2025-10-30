import { FC,useEffect,useRef} from "react";
import { message, Steps,FloatButton,Modal} from "antd";
import { ClearOutlined } from '@ant-design/icons'
import ArticleResult from "@/components/article-add/art-result";
import ArticleBase from "@/components/article-add/art-base";
import ArticleContent from "@/components/article-add/art-content";
import { getCateListApi } from "@/api/cate-api";
import { defer } from "react-router-dom";
import localforage from "@/utils/localforage";
import useArtAddStore, {
  clearArticle,
  selectHasHydrated,
  setCurrent,
  Move,
  ArtAddStore,
  resetCurrent,
} from "@/store/art-add-store";
import to from "await-to-js";
import { ArticleSteps } from "@/store/art-add-store";
import ArticleCover from "@/components/article-add/art-cover";
import { postArticleApi } from "@/api/article-api";
import { StorageValue } from "zustand/middleware";
// 静态的数据源，没必要定义到组件中
export const stepItems = [
  {
    title: "基本信息",
  },
  {
    title: "文章封面",
  },
  {
    title: "文章内容",
  },
  {
    title: "Done",
  },
];

const ArticleAdd: FC = () => {
  const current = useArtAddStore((state) => state.current);
  const hasHydrated = useArtAddStore(selectHasHydrated);
  const modalRef=useRef<()=>void>()
  const HandleClean=()=>{
   modalRef.current=Modal.confirm({
    title: '操作提示',
    content: '此操作会清空表单中填写的所有数据，确认清空吗？',
    okText: '确认',
    cancelText: '取消',
    onOk() {
      // 2. 执行具体的清空操作
      // 2.1 清空文章内容
      clearArticle()
      // 2.2 重置 steps
      resetCurrent()
      // 2.3 提示清空成功
      message.success('表单清空完毕！')
    }
  }).destroy
  }
  useEffect(()=>{
    return ()=>modalRef.current&& modalRef.current()
  },[])
  return (
    hasHydrated && (
      <div>
        {/* 步骤条 */}
        <Steps size="small" current={current} items={stepItems} />
        <div style={{ marginTop: 20 }}>
          {current === ArticleSteps.base && <ArticleBase />}
          {current === ArticleSteps.cover && <ArticleCover />}
          {current === ArticleSteps.cotent && <ArticleContent />}
          {current === ArticleSteps.done && <ArticleResult />}
        </div>
        <FloatButton type="primary" icon={<ClearOutlined />} tooltip="清空表单" onClick={HandleClean} />
      </div>
    )
  );
};
export const loader = async () => {
  //此时zustand还没有初始，
  // 所以在zustand里面取的数据是一开始的初始化的数据，
  // 所以取的current值是0,
  // 而直接从本地数据库里面异步取到的值是正确的
  const localData = await localforage.getItem<StorageValue<ArtAddStore>>(
    "art-add-store"
  );
  const current=localData?.state.current
  if (current === ArticleSteps.done) {
     if (useArtAddStore.getState()._hasHydrated) { 
      // 证明项目中依赖的 Store 数据，已经还原完毕了，此时直接调用 resetCurrent 就行
      resetCurrent()
    } else { 
      // 如果 store 中的数据还没有还原完毕，则延迟 resetCurrent() 函数的执行
      useArtAddStore.persist.onFinishHydration(() => { 
        resetCurrent()
      }) 
    } 
    }
  const result=getCateListApi()
  return defer({result});
};
export default ArticleAdd;
export const action = async () => {
  const article = useArtAddStore.getState().article;
  const fd = new FormData();
  for (const key in article) {
    fd.append(key, article[key]);
  }
  const [err] = await to(postArticleApi(fd));
  if (err) return null;
  setCurrent(Move.next);
  const msg = article.state === "草稿" ? "草稿保存成功" : "文章发布成功";
  message.success(msg);
  clearArticle();
  return msg;
};
