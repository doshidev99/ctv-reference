import React from "react";
// import _ from "lodash";
import RestCreate from "../../rest/Create";
import PartnerForm from "../components/Form";


const CreatePartner = (props) => (
  <RestCreate
    {...props}
    resource="partners"
    title="Thêm cộng tác viên"
  >
    <PartnerForm />
  </RestCreate>
);

export default CreatePartner;
