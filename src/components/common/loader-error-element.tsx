import type { FC } from "react";
import { useState,useEffect} from "react";
import {Result,Button,Spin} from 'antd'
import { useRevalidator,useAsyncError} from "react-router-dom";
const LoaderErrorElement:FC=()=>{
    const revalidator=useRevalidator()
    const error=useAsyncError()
    const [reload,setReload]=useState(false)
    useEffect(()=>{
        if(error){
        setReload(false)
        }
    },[error])
    const reloadHandler=()=>{
        revalidator.revalidate()
         setReload(true)
    }
     return (
    <Spin spinning={reload} tip="重新加载中...">
      <Result
        status="warning"
        title="数据加载失败，请稍后再试！"
        extra={
          <Button type="primary" key="reload" onClick={reloadHandler}>
            重新加载
          </Button>
        }
      />
    </Spin>
  )
}
export default LoaderErrorElement