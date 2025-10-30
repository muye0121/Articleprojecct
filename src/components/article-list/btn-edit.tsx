import type { FC } from "react";
import { Button } from "antd";
import {useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const BtnEditArticle: FC<{ id: number }> = ({ id }) => {
  const location=useLocation()
  const navigate = useNavigate();
  return (
    <Button
      type="link"
      size="small"
      onClick={() => navigate("/art-edit/" + id,{state:location.search})}
    >
      修改
    </Button>
  );
};
export default BtnEditArticle;
