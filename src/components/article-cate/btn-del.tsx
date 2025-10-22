import type { FC } from "react";
import { useState,useEffect} from "react";
import { Button, message, Popconfirm } from "antd";
import type { PopconfirmProps } from "antd";
import { useSubmit } from "react-router-dom";
import { useNavLoading, useNavSubmitting } from "@/utils/hooks";
import { useActionData } from "react-router-dom";
const ButtonDelete: FC<{ id: number }> = ({ id }) => {
  const [open, setOpen] = useState(false);
  const submit=useSubmit()
  const actionData=useActionData() as boolean
  const submitting=useNavSubmitting('DELETE')
  const loading=useNavLoading('DELETE')
  useEffect(()=>{
    if(loading&&actionData){
        setOpen(false)
    }
  },[loading,actionData])
  const handleDelete = () => {
    if (id === 1 || id === 2) {
      return message.error("管理员不允许删除此分类！");
    }
    setOpen(true)
  };
  const confirm=()=>{
    submit({id},{method:'DELETE'})
  }
  const handleOpenChange:PopconfirmProps['onOpenChange']=(isOpen,e)=>{
    const btnType=e?.currentTarget.dataset.type
    if(!isOpen&&btnType!=='btn-ok'){
        setOpen(false)
    }
  }
  return (
    <>
      <Popconfirm
        open={open} // 控制气泡确认框的显示和隐藏
        title="操作提示"
        description="您确定删除此文章分类吗？"
        onConfirm={confirm} // 确认按钮的点击事件处理函数
        onCancel={()=>setOpen(false)} // 取消按钮的点击事件处理函数
        okText="确定"
        cancelText="取消"
        onOpenChange={handleOpenChange}
        okButtonProps={{
            'data-type':'btn-ok',
            loading:submitting&&{delay:200}
        }}
      ></Popconfirm>
      <Button type="link" size="small" onClick={handleDelete}>
        删除
      </Button>
    </>
  );
};

export default ButtonDelete;
