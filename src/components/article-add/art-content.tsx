import type { FC } from "react";
import { useSubmit } from "react-router-dom";
import ReactQuill from "react-quill";
import { Space, Button, message, Spin } from "antd";
import useArtAddStore, { setCurrent, Move } from "@/store/art-add-store";
import {
  selectContent,
  setContent,
  setArticleState,
} from "@/store/art-add-store";
import "react-quill/dist/quill.snow.css";
import styles from "./css/art-content.module.less";
import { useNavSubmitting } from "@/utils/hooks";
const ArticleContent: FC = () => {
  const value = useArtAddStore(selectContent);
  const submit = useSubmit();
  const submitting = useNavSubmitting("POST");
  const publish = (state: "已发布" | "草稿") => {
    if (!value) return message.error("请填写文章内容");
    setArticleState(state);
    submit(null, { method: "POST" });
  };
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
            <Button type="primary" onClick={() => setCurrent(Move.prev)}>
              上一步
            </Button>
            <Button type="primary" onClick={() => publish("草稿")}>
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
export default ArticleContent;
export const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],
      ["link", "image", "video", "formula"],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ["clean"], // remove formatting button
    ],
  };