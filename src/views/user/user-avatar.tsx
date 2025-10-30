import type { FC, RefObject } from "react";
import { Space, Button, Avatar, Input, InputRef, message} from "antd";
import useUserStore, { selectAvatar } from "@/store/user-stores";
import { useRef, useState } from "react";
import { useMemo } from "react";
import { updateAvatarApi } from "@/api/user-api";
import to from "await-to-js";
import { ActionFunctionArgs } from "react-router-dom";
import { useSubmit} from "react-router-dom";
import { useNavSubmitting } from "@/utils/hooks";
const UserAvatar: FC = () => {
  const avatar = useUserStore(selectAvatar);
  const iptRef: RefObject<InputRef> = useRef(null);
  const [newAvatar, setNewAvatar] = useState("");
  const submitting=useNavSubmitting('PATCH')
  const submit = useSubmit();
  const saveAvatar = () => {
    if(submitting) return 
    submit({ avatar: newAvatar }, { method: "PATCH" });
  };
  const isDisabled = useMemo(
    () => !newAvatar || newAvatar === avatar,
    [newAvatar, avatar]
  );
  const showDialog = () => {
    iptRef.current?.input?.click();
  };
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (!files || files.length === 0) return;
    const fr = new FileReader();
    fr.readAsDataURL(files[0]);
    fr.onload = () => {
      if (fr.result) {
        setNewAvatar(fr.result as string);
      }
    };
  };
  return (
    <Space direction="vertical">
      {/* 按需渲染头像组件 */}
      {newAvatar || avatar ? (
        <Avatar size={300} shape="square" src={newAvatar || avatar} />
      ) : (
        <Avatar size={300} shape="square" onClick={showDialog}>
          请选择头像
        </Avatar>
      )}

      <Space direction="horizontal">
        <Input
          ref={iptRef}
          type="file"
          style={{ display: "none" }}
          accept="jpg/*"
          onChange={onFileChange}
        />
        <Button onClick={showDialog}>选择照片</Button>
        <Button
          type="primary"
          disabled={isDisabled}
          onClick={saveAvatar}
          loading={submitting&& { delay: 200 }}
        >
          保存头像
        </Button>
      </Space>
    </Space>
  );
};
export default UserAvatar;
export const action = async ({ request }: ActionFunctionArgs) => {
  const fd = await request.formData();
  const [err] = await to(updateAvatarApi(fd));
  if (err) return;
  message.success("更新头像成功");
  return null;
};
