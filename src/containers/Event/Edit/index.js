import React from "react";
import RestEdit from "../../rest/Edit";
import EditForm from "../components/EditForm";
import EditWrapper from "./styles";

const EditEvent = (props) => {
  return (
    <EditWrapper>
      <RestEdit {...props} resource="events" title="Chỉnh sửa sự kiện">
        <EditForm />
      </RestEdit>
    </EditWrapper>
  )
}

export default EditEvent;
