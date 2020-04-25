import React from "react";
import RestEdit from "../../../rest/Edit";
// import PaymentForm from "../components/EditPaymentForm";
import RestFormInput from "../../../../components/RestInput/RestFormInput";
import RestRow from "../../../../components/RestLayout/RowLayout";
import EditWrapper from "./styles";

const EditPayment = (props) => {
  console.log('ok');
    
  return (
    <EditWrapper>
      <RestEdit {...props} resource="transaction-payments" title="Chỉnh sửa payment">
        {/* <PaymentForm />
         */}
        <RestRow>
          <RestFormInput
            required
            source="fullName"
            title="Họ và tên"
            placeholder="Họ và tên"
            requiredMessage="Please input fullname"
        />
        </RestRow>
      </RestEdit>
    </EditWrapper>
  )
}

export default EditPayment;
