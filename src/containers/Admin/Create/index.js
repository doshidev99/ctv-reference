import React from "react";
import _ from "lodash";
import RestCreate from "../../rest/Create";
import AdminsForm from "../components/Form";

const formatOnSubmit = (values) => {
  return _.omit(values, ["confirmPassword"]);
};

const CreateAdmins = (props) => (
  <RestCreate
    {...props}
    formatOnSubmit={formatOnSubmit}
    resource="staffs"
    title="Thêm quản trị viên"
  >
    <AdminsForm />
  </RestCreate>
);

export default CreateAdmins;
