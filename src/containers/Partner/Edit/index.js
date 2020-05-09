import React from "react";
import RestEdit from "../../rest/Edit";
import EditForm from "../components/EditForm";
import EditWrapper from "./styles";

const EditPartner = (props) => {
  return (
    <EditWrapper>
      <RestEdit {...props} resource="partners" title="Chỉnh sửa cộng tác viên">
        <EditForm />
      </RestEdit>
    </EditWrapper>
  )
}

export default EditPartner;
