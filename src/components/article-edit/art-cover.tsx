import type { FC, RefObject } from "react";
import { Button,Space,Input,Avatar, InputRef } from "antd";
import { useRef } from "react";
import { Move } from "@/store/art-add-store";
import { message } from "antd";
import useArticleEditStore,{selectCover,updateCurrent,setArticleCover} from "@/store/art-edit-store";
const EditCover:FC=()=>{
    const coverURL=useArticleEditStore(selectCover)
    const iptRef:RefObject<InputRef>=useRef(null)
     const handleNext = () => {
        if (coverURL) {
          updateCurrent(Move.next);
        } else {
          return message.error("请选择文章封面!");
        }
      };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (!files || files.length === 0) return;
    //size单位是字节
    //1M=1024KB=1024*1023B
    if(files[0].size>1024*1024*2) return message.error('封面图片大小不能超过2M!')
    setArticleCover(files[0]);
  };
    return <>
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
              updateCurrent(Move.prev);
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
      </Space></>
}
export default EditCover