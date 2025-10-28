import type { FC } from "react";
import {
  delCateApi,
  editCateApi,
  getCateListApi,
  postCateApi,
} from "@/api/cate-api";
import { Suspense } from "react";
import { Await } from "react-router-dom";
import to from "await-to-js";
import { ActionFunctionArgs, defer, useLoaderData } from "react-router-dom";
import { Table, Space, message } from "antd";
import type { TableProps } from "antd";
import ButtonAdd from "@/components/article-cate/btn-add";
import ButtonEdit from "@/components/article-cate/btn-edit";
import ButtonDelete from "@/components/article-cate/btn-del";
import LoaderErrorElement from "@/components/common/loader-error-element";
const columns: TableProps<CateItem>["columns"] = [
  {
    title: "序号",
    render(_, __, index) {
      return index + 1;
    },
  },
  {
    title: "分类名称",
    dataIndex: "cate_name",
  },
  {
    title: "分类别名",
    dataIndex: "cate_alias",
  },
  {
    title: "操作",
    render(_, record, __) {
      return (
        <>
          <ButtonEdit cate={record} />
          <ButtonDelete id={record.id} />
        </>
      );
    },
  },
];
const ArticleCate: FC = () => {
  const loaderData = useLoaderData() as { result: Promise<BaseResponse<CateItem[]>> };
  return (
    <Suspense fallback={<Table loading={true}/>}>
      <Await
        resolve={loaderData.result}
        errorElement={<LoaderErrorElement></LoaderErrorElement>}
      >
        {(result:BaseResponse<CateItem[]>) =>
      <div>
        <Space direction="vertical" style={{ display: "flex" }}>
          <ButtonAdd />
          <Table
            dataSource={result.data}
            columns={columns}
            size="middle"
            rowKey="id"
            pagination={false}
            bordered
          />
        </Space>
      </div>}
      </Await>
    </Suspense>
  );
};
export default ArticleCate;
export const loader = async () => {
  //调用接口，请求分类的列表数据
  const result = getCateListApi();
  return defer({ result });
};
export const action = async ({ request }: ActionFunctionArgs) => {
  const fd = await request.formData();
  const method = request.method.toUpperCase() as
    | "POST"
    | "PUT"
    | "PATCH"
    | "DELETE";
  if (method === "POST") {
    const [err] = await to(postCateApi(fd));
    if (err) return null;
    message.success("添加成功");
  } else if (method === "PUT") {
    const [err] = await to(editCateApi(fd));
    if (err) return null;
    message.success("修改成功");
  } else if (method === "DELETE") {
    const [err] = await to(delCateApi(fd));
    if (err) return null;
    message.success("删除成功");
  }
  return true;
};
