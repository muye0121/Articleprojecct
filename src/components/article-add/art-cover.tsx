import type { FC, RefObject } from "react";
import { useRef } from "react";
import { Space, Button, Avatar, Input, InputRef, message } from "antd";
import useArtAddstore, {
  setCurrent,
  Move,
  setArticleCover,
  selectCover,
} from "@/store/art-add-store";
const ArticleCover: FC = () => {
  const coverURL = useArtAddstore(selectCover);
  const iptRef: RefObject<InputRef> = useRef(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (!files || files.length === 0) return;
    setArticleCover(files[0]);
  };
  const handleNext = () => {
    if (coverURL) {
      setCurrent(Move.next);
    } else {
      return message.error("请选择文章封面!");
    }
  };
  return (
    <>
      <Space direction="vertical">
        {coverURL ? (
          <Avatar size={300} shape="square" src={coverURL} />
        ) : (
          <Avatar size={300} shape="square" onClick={() => iptRef.current?.input?.click()}> 请选择图片</Avatar>
        )}
        <Space direction="horizontal">
          <Button
            type="primary"
            onClick={() => {
              setCurrent(Move.prev);
            }}
          >
            上一步
          </Button>
          {coverURL?(<Button type="primary" onClick={() => iptRef.current?.input?.click()}>
            更换封面
          </Button>):(<Button type="primary" onClick={() => iptRef.current?.input?.click()}>
            选择封面
          </Button>)}
          <Button type="primary" onClick={handleNext}>
            下一步
          </Button>
          <Input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={iptRef}
            onChange={handleFileChange}
          />
        </Space>
      </Space>
    </>
  );
};
export default ArticleCover;
