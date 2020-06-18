import React from "react";
import RestEdit from "../../rest/Edit";
import AnswerForm from "../components/AnswerForm";
import AnswerFormWrapper from "./styles";

const EditFAQ = (props) => {
  const {id} = props.match.params
  return (
    <AnswerFormWrapper>
      <RestEdit {...props} resource={`properties/${id}/faqs`} title="Chỉnh sửa câu hỏi thường gặp của một dự án">
        <AnswerForm />
      </RestEdit>
    </AnswerFormWrapper>
  )
}

export default EditFAQ;
