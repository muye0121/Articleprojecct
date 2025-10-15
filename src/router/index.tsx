import {createBrowserRouter} from 'react-router-dom'
import Reg from '@/views/auth/reg'
import Login from '@/views/auth/login'
import Root from '@/views/root/root'
import AuthLayout from '@/views/auth/auth-layout'
const rooter=createBrowserRouter([
    {path:'/reg',element:<AuthLayout><Reg/></AuthLayout>},
    {path:'/login',element:<AuthLayout><Login/></AuthLayout>},
    {path:'/',element:<Root/>},
])
export default rooter;