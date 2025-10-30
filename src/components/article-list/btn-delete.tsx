import type { FC } from "react";
import { useState, useEffect } from "react";
import { Button, Popconfirm } from "antd";
import { PopconfirmProps } from "antd";
import { useSubmit, useLocation, useLoaderData, useAsyncValue } from "react-router-dom";
import { useNavSubmitting, useNavLoading } from "@/utils/hooks";
import { useActionData } from "react-router-dom";
const BtnDeleteArticle: FC<{ id: number }> = ({ id }) => {
  const [open, setOpen] = useState(false);
  const submit = useSubmit();
  const location = useLocation();
  const loaderData = useLoaderData() as {q: ArtListQuery;} | null;
  const [,arrListResult]=useAsyncValue() as [BaseResponse<CateItem[]>, ArticleListResponse]
  const loading = useNavLoading("DELETE", location.pathname + location.search);
  const submitting = useNavSubmitting(
    "DELETE",
    location.pathname + location.search
  );
  const actionData = useActionData() as boolean | null;
  const confirm = () => {
    //判断是否为最后一页
    //判断不能是第一页
    //判断是否这个页面只有一个文章了
    let needBack = false;
    if (loaderData&&arrListResult) {
       const {q}=loaderData
       const list =arrListResult.data||[]
       const total=arrListResult.total
      needBack =
        list.length === 1 &&
        q.pagenum !== 1 &&
        q.pagenum === Math.ceil(total / q.pagesize)
    }
    submit({ id,needBack}, { method: "DELETE" });
  };
  useEffect(() => {
    if (loading && actionData) {
      setOpen(false);
    }
  }, [loading, actionData]);
  const cancel = () => {
    console.log("取消删除！");
  };
  const handleOpenChange: PopconfirmProps["onOpenChange"] = (isOpen, e) => {
    const btnType = e?.currentTarget.dataset.type;
    if (!isOpen && btnType !== "btn-ok") {
      setOpen(false);
    }
  };
  return (
    <Popconfirm
      title="操作提示"
      description="您确认删除此文章吗？"
      onConfirm={confirm}
      onCancel={cancel}
      okText="确认"
      cancelText="取消"
      open={open}
      onOpenChange={handleOpenChange}
      okButtonProps={{
        "data-type": "btn-ok",
        loading: submitting && { delay: 200 },
      }}
    >
      <Button type="link" size="small" onClick={() => setOpen(true)}>
        删除
      </Button>
    </Popconfirm>
  );
};
export default BtnDeleteArticle;
