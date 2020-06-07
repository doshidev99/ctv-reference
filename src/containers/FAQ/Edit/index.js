import React from "react";
import RestEdit from "../../rest/Edit";
import EditForm from "../components/EditForm";
import EditWrapper from "./styles";

const EditFAQ = (props) => {
  return (
    <EditWrapper>
      <RestEdit {...props} resource="info/faqs" title="Chỉnh sửa câu hỏi thường gặp">
        <EditForm />
      </RestEdit>
    </EditWrapper>
  )
}

export default EditFAQ;
