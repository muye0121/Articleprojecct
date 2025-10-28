import ArticleListSearch from "@/components/article-list/list-search";
import { Button, Flex, message, Space, Skeleton, Spin } from "antd";
import { ActionFunctionArgs, redirect, useNavigate } from "react-router-dom";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import type { FC } from "react";
import { getCateListApi } from "@/api/cate-api";
import to from "await-to-js";
import { deleteArticleApi, getArticleListApi } from "@/api/article-api";
import ArticleListTable from "@/components/article-list/list-table";
import { useNavigation } from "react-router-dom";
import { defer, Await } from "react-router-dom";
import { Suspense, useMemo } from "react";
import LoaderErrorElement from "@/components/common/loader-error-element";
const ArticleList: FC = () => {
  const loaderData = useLoaderData() as {
    result: Promise<[BaseResponse<CateItem[]>, ArticleListResponse]>;
    q: ArtListQuery;
  };
  const navigate = useNavigate();
  const navigation = useNavigation();
  const navLoading = useMemo(() => {
    return navigation.state === "loading" &&
      navigation.location.pathname === "/art-list"
      ? true
      : false;
  }, [navigation]);
  return (
    <Suspense fallback={<Skeleton active />}>
      <Await resolve={loaderData.result} errorElement={<LoaderErrorElement />}>
        {(result: [BaseResponse<CateItem[]>, ArticleListResponse]) => {
          const arrListResult: ArticleListResponse = result[1];
          return (
            <Spin spinning={navLoading}>
              <Space direction="vertical" style={{ display: "flex" }}>
                <Flex justify="space-between">
                  <ArticleListSearch />
                  <Button type="primary" onClick={() => navigate("/art-add")}>
                    添加文章
                  </Button>
                </Flex>
                <ArticleListTable
                  dataSource={arrListResult.data}
                  rowKey="id"
                  size="middle"
                  bordered
                  total={arrListResult.total}
                  {...loaderData?.q}
                />
              </Space>
            </Spin>
          );
        }}
      </Await>
    </Suspense>
  );
};
export default ArticleList;
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const searchParams = new URL(request.url).searchParams;
  const q: ArtListQuery = {
    pagenum: Number(searchParams.get("pagenum")) || 1,
    pagesize: Number(searchParams.get("pagesize")) || 2,
    cate_id: Number(searchParams.get("cate_id")) || "",
    state: searchParams.get("state") || "",
  };
  const result = Promise.all([getCateListApi(), getArticleListApi(q)]);
  //return { result: res.data, q, list: res2.data,total:res2.total};
  return defer({ result, q });
};
export const action = async ({ request }: ActionFunctionArgs) => {
  const fd = await request.formData();
  const [err] = await to(deleteArticleApi(fd));
  if (err) return null;
  message.success("删除成功!");
  //如果删除成功了要判断页码值是否需要回退
  if (fd.get("needBack") === "true") {
    const url = new URL(request.url);
    const newPage = Number(url.searchParams.get("pagenum")) - 1;
    url.searchParams.set("pagenum", newPage.toString());
    return redirect(url.toString());
  }
  return true;
};
