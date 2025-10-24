import type { FC } from 'react'
import { Result, Button } from 'antd'
import { useActionData, useNavigate } from 'react-router-dom'
import { resetCurrent } from '@/store/art-add-store'

const ArticleResult: FC = () => {
    const navigate=useNavigate()
  const actionData = useActionData() as { msg: string } | null
  const gotoList=()=>{
    resetCurrent()
    navigate('/art-list')
  }
  return (
    <Result
      status="success"
      title={actionData ? actionData.msg : '文章发表成功！'}
      subTitle=""
      extra={[
        <Button type="primary" key="list"  onClick={gotoList}>
          去文章列表
        </Button>,
        <Button key="rewrite" onClick={()=>resetCurrent()}>再写一篇</Button>
      ]}
    />
  )
}

export default ArticleResult