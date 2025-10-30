import { useLocation, useNavigation } from "react-router-dom";
type Method = "POST" | "PUT" | "PATCH" | "DELETE" | "GET";
export const useNavLoading = (method: Method, pathname?: string) => {
  const navigation = useNavigation();
  const location = useLocation();
  const loading =
    navigation.state === "loading" &&
    navigation.formMethod?.toUpperCase() === method &&
    navigation.formAction === (pathname || location.pathname);
  return loading;
};
export const useNavSubmitting = (method: Method, pathname?: string) => {
  const navigation = useNavigation();
  const location = useLocation();
  const submitting =
    navigation.state === "submitting" &&
    navigation.formMethod?.toUpperCase() === method &&
    navigation.formAction === (pathname || location.pathname);
  return submitting;
};
