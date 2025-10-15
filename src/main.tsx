import ReactDOM from 'react-dom/client'
// App 根组件
import {RouterProvider} from 'react-router-dom'
import root from './router'
ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={root}></RouterProvider>)
