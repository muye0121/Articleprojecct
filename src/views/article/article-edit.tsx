import type { FC } from "react";
import { initArticle, updateCurrent } from "@/store/art-edit-store";
import { message, Modal, Steps } from "antd";
import { useCallback, useEffect, useRef,} from "react";
import {
  LoaderFunctionArgs,
  useBeforeUnload,
  useBlocker,
  defer,
} from "react-router-dom";
import { stepItems } from "@/views/article/article-add";
import { ArticleSteps, Move } from "@/store/art-add-store";
import useArticleEditStore, { selectCurrent } from "@/store/art-edit-store";
import EditBase from "@/components/article-edit/art-base";
import EditContent from "@/components/article-edit/art-content";
import EditCover from "@/components/article-edit/art-cover";
import EditResult from "@/components/article-edit/art-result";
import to from "await-to-js";
import { getCateListApi } from "@/api/cate-api";
import { putArticleApi } from "@/api/article-api";
const ArticleEdit: FC = () => {
  const modalRef = useRef<ReturnType<typeof Modal.confirm> | null>();
  const current = useArticleEditStore(selectCurrent);
  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    return (
      currentLocation.pathname !== nextLocation.pathname &&
      current !== ArticleSteps.done
    );
  });
  useEffect(() => {
    if (blocker.state === "blocked") {
      if (modalRef.current) return;
      modalRef.current = Modal.confirm({
        title: "温馨提示",
        content: "您所做的更改将会丢失，是否确认离开当前页面",
        okText: "确认离开",
        cancelText: "取消",
        onOk() {
          blocker.proceed();
        },
        onCancel() {
          blocker.reset();
          modalRef.current = null;
        },
      });
    }
  }, [blocker.state, blocker]);
  useBeforeUnload(
    useCallback((e) => {
      e.preventDefault();
    }, [])
  );

  return (
    <div>
      <Steps size="small" current={current} items={stepItems} />
      <div style={{ marginTop: 20 }}>
        {current === ArticleSteps.base && <EditBase />}
        {current === ArticleSteps.cotent && <EditContent />}
        {current === ArticleSteps.cover && <EditCover />}
        {current === ArticleSteps.done && <EditResult />}
      </div>
    </div>
  );
};
export default ArticleEdit;
export const loader = async ({ params }: LoaderFunctionArgs) => {
  const flag =initArticle(params.id!);
  const cates=getCateListApi() 
  return defer({ cates,flag });
};
export const action = async () => {
  const article = useArticleEditStore.getState().article;
  const keys=['id','title','cate_id','content','state','cover_img']
  const fd = new FormData();
  keys.forEach(key=>{
    fd.append(key,article[key])
  })
  const [err] = await to(putArticleApi(fd));
  if (err) return null;
  message.success('修改文章成功')
  updateCurrent(Move.next)
  return true;
};
