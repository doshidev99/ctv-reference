import React from "react";
// import _ from "lodash";
import RestCreate from "../../rest/Create";
import CreateForm from "../components/Form";


const CreatePartner = (props) => (
  <RestCreate
    {...props}
    resource="info/faqs"
    title="Thêm câu hỏi thường gặp"
  >
    <CreateForm />
  </RestCreate>
);

export default CreatePartner;
