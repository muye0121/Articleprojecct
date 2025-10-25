import type { FC } from "react";
import {
  delCateApi,
  editCateApi,
  getCateListApi,
  postCateApi,
} from "@/api/cate-api";
import to from "await-to-js";
import { ActionFunctionArgs, useLoaderData } from "react-router-dom";
import { Table, Space, message } from "antd";
import type { TableProps } from "antd";
import ButtonAdd from "@/components/article-cate/btn-add";
import ButtonEdit from "@/components/article-cate/btn-edit";
import ButtonDelete from "@/components/article-cate/btn-del";
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
  const loaderData = useLoaderData() as { cates: CateItem[] };
  return (
    loaderData && (
      <div>
        <Space direction="vertical" style={{ display: "flex" }}>
          <ButtonAdd />
          <Table
            dataSource={loaderData.cates}
            columns={columns}
            size="middle"
            rowKey="id"
            pagination={false}
            bordered
          />
        </Space>
      </div>
    )
  );
};
export default ArticleCate;
export const loader = async () => {
  const [err, res] = await to(getCateListApi());
  if (err) return null;
  return { cates: res.data };
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
