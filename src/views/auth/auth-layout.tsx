import { type PropsWithChildren, FC } from "react";
import styles from "@/views/auth/css/auth-layout.module.less";
import useAppStore, { selectorToken } from "@/store/app-store";
import { Navigate } from "react-router-dom";
const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  const token = useAppStore(selectorToken);
  if (token) {
    return <Navigate to="/" replace />;
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.boxTest}>{children}</div>
      </div>
    );
  }
};
export default AuthLayout;
