import React from "react";
import RestEdit from "../../../../rest/Edit";
import EditForm from "../components/EditForm";
import EditWrapper from "./styles";

const EditProduct = (props) => {
  return (
    <EditWrapper>
      <RestEdit {...props} resource="property-sections" title="Chỉnh sửa bảng hàng">
        <EditForm />
      </RestEdit>
    </EditWrapper>
  )
}

export default EditProduct;
