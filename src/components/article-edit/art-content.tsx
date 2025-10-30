import type { FC } from "react";
import ReactQuill from "react-quill";
import { Space, Button, Spin, message } from "antd";
import useArticleEditStore, {
  updateCurrent,
  setContent,
  selectContent,
  setArticleState,
  selectIsShowDraft,
} from "@/store/art-edit-store";
import { useRef } from "react";
import { Move } from "@/store/art-add-store";
import { modules } from "@/components/article-add/art-content";
import { useNavSubmitting } from "@/utils/hooks";
import { useSubmit } from "react-router-dom";
import styles from "@/components/article-edit/css/art-content.module.less";
const EditContent: FC = () => {
  const value = useArticleEditStore(selectContent);
  const submit = useSubmit();
  const isShowDraft = useRef(useArticleEditStore(selectIsShowDraft))
  const publish = (state: "已发布" | "草稿") => {
    if (!value) return message.error("请填写文章内容");
    setArticleState(state);
    submit(null, { method: "PUT",navigate:false});
  };
  const submitting = useNavSubmitting("PUT");
  return (
    <div className={styles.artContent}>
      <Spin spinning={submitting} delay={200}>
        <Space direction="vertical" style={{ display: "flex" }}>
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setContent}
            modules={modules}
          />
          <Space direction="horizontal">
            <Button type="primary" onClick={() => updateCurrent(Move.prev)}>
              上一步
            </Button>
            <Button
              type="primary"
              onClick={() => publish("草稿")}
              style={{ display: isShowDraft.current ? "" : "none" }}
            >
              存草稿
            </Button>
            <Button type="primary" onClick={() => publish("已发布")}>
              发布
            </Button>
          </Space>
        </Space>
      </Spin>
    </div>
  );
};
export default EditContent;
