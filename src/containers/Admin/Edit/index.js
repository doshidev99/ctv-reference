import React from "react";
import RestEdit from "../../rest/Edit";
import AdminForm from "../components/EditForm";
import EditWrapper from "./style";

const EditAdmin = (props) => {
  return (
    <EditWrapper>
      <RestEdit {...props} resource="staffs" title="Edit quản trị viên">
        <AdminForm />
      </RestEdit>
    </EditWrapper>
  )
}

export default EditAdmin;
