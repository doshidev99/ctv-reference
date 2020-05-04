import React from "react";
import RestEdit from "../../../../rest/Edit";
import PaymentEditForm from "../components/EditForm"
import EditWrapper from "./styles";

const EditPayment = (props) => {
  return (
    <EditWrapper>
      <RestEdit {...props} resource="transaction-payments" title="Chỉnh sửa giao dịch">
        <PaymentEditForm />
      </RestEdit>
    </EditWrapper>
  )
}

export default EditPayment;
