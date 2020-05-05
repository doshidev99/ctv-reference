import React from "react";
import RestEdit from "../../rest/Edit";
import EditForm from "../components/EditForm";
import EditWrapper from "./styles";

const EditCoupon = (props) => {
  return (
    <EditWrapper>
      <RestEdit {...props} resource="coupons" title="Chỉnh sửa ưu đãi">
        <EditForm />
      </RestEdit>
    </EditWrapper>
  )
}

export default EditCoupon;
