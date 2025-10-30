import { type PropsWithChildren, FC } from "react";
import styles from "@/views/auth/css/auth-layout.module.less";
import useAppStore, { selectorToken } from "@/store/app-store";
import { Navigate, useLocation } from "react-router-dom";
const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  const token = useAppStore(selectorToken);
  const location=useLocation()
  if (token) {
    let nextURL=''
    if(location.search.includes('?from='))
    {
       const search=location.search.replace('?from=','')
     nextURL=search?search:'/'
    }else{
      nextURL='/'
    }
    return <Navigate to={nextURL} replace />;
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.boxTest}>{children}</div>
      </div>
    );
  }
};
export default AuthLayout;
