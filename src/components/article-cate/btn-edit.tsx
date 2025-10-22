import type { FC } from "react";
import { useState, useEffect } from "react";
import { Button, message, Modal, Form, Input } from "antd";
import { useActionData, useSubmit } from "react-router-dom";
import { useNavLoading, useNavSubmitting } from "@/utils/hooks";
const ButtonEdit: FC<{ cate: CateItem }> = ({ cate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formRef] = Form.useForm<CateItem>();
  const submitting = useNavSubmitting("PUT");
  const submit = useSubmit();
  const loading = useNavLoading("PUT");
  const actionData = useActionData() as boolean;
  const showEditModal = () => {
    if (cate.id === 1 || cate.id === 2) {
      message.error("管理员不允许修改此数据");
      return;
    }
    formRef.setFieldsValue(cate);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    formRef
      .validateFields()
      .then((values) => {
        submit(values, { method: "PUT" });
      })
      .catch();
  };
  useEffect(() => {
    if (loading && actionData) {
      setIsModalOpen(false);
    }
  }, [loading, actionData]);
  return (
    <>
      <Button type="link" size="small" onClick={showEditModal}>
        修改
      </Button>
      <Modal
        title="修改文章分类"
        cancelText="取消"
        okText="保存"
        okButtonProps={{ loading: submitting && { delay: 200 } }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        afterClose={()=>formRef.resetFields()}
      >
        <Form autoComplete="off" style={{ marginTop: 25 }} form={formRef}>
          <Form.Item label="id" name="id" hidden>
            <Input readOnly />
          </Form.Item>
          <Form.Item
            label="分类名称"
            name="cate_name"
            rules={[
              { required: true, message: "请填写分类名称!" },
              {
                pattern: /^\S{1,10}$/,
                message: "分类名称必须是1-10位的非空字符!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="分类别名"
            name="cate_alias"
            rules={[
              { required: true, message: "请填写分类别名!" },
              {
                pattern: /^[a-zA-Z0-9]{1,15}$/,
                message: "分类别名必须是1-15位的字母数字!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ButtonEdit;
