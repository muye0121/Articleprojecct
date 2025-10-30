import { useLayoutEffect, type FC } from "react";
import { Button, Select, Form, Input,FormProps} from "antd";
import { useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import { Await } from "react-router-dom";
import useArtAddStore, { setArticleBase, setCurrent } from "@/store/art-add-store";
import { Move, selectArticleBase } from "@/store/art-add-store";
const ArticleBase: FC = () => {
  const loader = useLoaderData() as { result:Promise<BaseResponse<CateItem[]>> } | null;
  const baseForm = useArtAddStore(selectArticleBase);
  const [formRef] = Form.useForm();
  const onFinish = () => {
    setCurrent(Move.next);
  };
  const handleValuesChange:FormProps['onValuesChange']=(changedValues)=>{
    setArticleBase(changedValues)
  }
  useLayoutEffect(() => {
    formRef.setFieldsValue(baseForm);
  }, [formRef, baseForm]);
  return (
    <>
      <Form
        form={formRef}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
        onValuesChange={handleValuesChange}
      >
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

       <Suspense fallback={<Form.Item
          label="文章分类"
          rules={[{ required: true, message: "请选择文章分类!" }]}
        >
          <Select
            placeholder="请选择文章分类"
            options={[]}
            loading
          />
        </Form.Item>}>
        <Await resolve={loader?.result}>
          {(result:BaseResponse<CateItem[]>)=>{return (
             <div>
              <Form.Item
          label="文章分类"
          name="cate_id"
          rules={[{ required: true, message: "请选择文章分类!" }]}
        >
          <Select
            placeholder="请选择文章分类"
            allowClear
            fieldNames={{ label: "cate_name", value: "id" }}
            options={result ? result.data : []}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="submit">
            下一步
          </Button>
        </Form.Item>
             </div>
          )}}
        </Await>
       </Suspense>

        
      </Form>
    </>
  );
};
export default ArticleBase;
