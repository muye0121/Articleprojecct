import type { FC } from "react";
import { Move } from "@/store/art-add-store";
import useArticleEditStore, {
  selectBase,
  updateCurrent,
  updateBase,
} from "@/store/art-edit-store";
import {LoadingOutlined} from '@ant-design/icons'
import { Form, Input, Select, Button } from "antd";
import { Suspense, useEffect } from "react";
import { useLoaderData, Await } from "react-router-dom";
import LoaderErrorElement from "../common/loader-error-element";
const EditBase: FC = () => {
  const baseForm = useArticleEditStore(selectBase);
  const loaderData = useLoaderData() as {
    cates: Promise<BaseResponse<CateItem[]>>;
    flag: Promise<null |true>;
  };
  const [formRef] = Form.useForm();
  const onFinish = () => {
    updateCurrent(Move.next);
    formRef.setFieldsValue(baseForm);
  };
  const handleValuesChange = (values: ArticleEditBaseForm) => {
    updateBase(values);
  };
  useEffect(() => {
    formRef.setFieldsValue(baseForm);
  }, [baseForm, formRef]);
  return (
    <Form
      initialValues={baseForm}
      form={formRef}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      autoComplete="off"
      onValuesChange={handleValuesChange}
    >
      <Suspense
        fallback={
          <Form.Item
            label="文章标题"
            rules={[{ required: true, message: "请填写文章标题!" }]}
          >
            <Input
              placeholder="请填写文章标题"
              suffix={<LoadingOutlined style={{fontSize:12,color:'#d3d3d3'}}/>}
            />
          </Form.Item>
        }
      >
        <Await resolve={loaderData.flag} errorElement={<LoaderErrorElement />}>
          {() => {
            return (
              <Form.Item
                label="文章标题"
                name="title"
                rules={[{ required: true, message: "请填写文章标题!" }]}
              >
                <Input
                  placeholder="请填写文章标题"
                  maxLength={30}
                  showCount
                  allowClear
                />
              </Form.Item>
            );
          }}
        </Await>
      </Suspense>

      <Suspense
        fallback={
          <div>
            <Form.Item
              label="文章分类"
              rules={[{ required: true, message: "请选择文章分类!" }]}
            >
              <Select placeholder="请选择文章分类" options={[]} loading />
            </Form.Item>
          </div>
        }
      >
        <Await resolve={loaderData.cates} errorElement={<LoaderErrorElement />}>
          {(cates: BaseResponse<CateItem[]>) => {
            return (
              <div>
                <Form.Item
                  label="文章分类"
                  name="cate_id"
                  rules={[{ required: true, message: "请选择文章分类!" }]}
                >
                  <Select
                    placeholder="请选择文章分类"
                    allowClear
                    options={cates.data ? cates.data : []}
                    fieldNames={{ label: "cate_name", value: "id" }}
                  />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    下一步
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Await>
      </Suspense>
    </Form>
  );
};
export default EditBase;
