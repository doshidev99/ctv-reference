import React from "react";
import RestEdit from "../../rest/Edit";
import EditForm from "../components/EditForm";
import EditWrapper from "./styles";

const EditServiceRegist = (props) => {
  return (
    <EditWrapper>
      <RestEdit {...props} resource="service-registrations" title="Đặt lịch hẹn">
        <EditForm />
      </RestEdit>
    </EditWrapper>
  )
}

export default EditServiceRegist;
