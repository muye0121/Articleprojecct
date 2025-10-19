import type{FC, PropsWithChildren} from 'react'
import useAppStore,{selectorToken} from '@/store/app-store'
import { Navigate } from 'react-router-dom'
const AuthRoot:FC<PropsWithChildren>=({children})=>{
    const token=useAppStore(selectorToken)
    if(token){
        return <>{children}</>
    }else{
        return <Navigate to='/login' replace/>
    }
}
export default AuthRoot