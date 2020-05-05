import React from "react";
// import _ from "lodash";
import RestCreate from "../../rest/Create";
import CouponForm from "../components/Form";


const CreateCoupon = (props) => (
  <RestCreate
    {...props}
    resource="coupons"
    title="Thêm ưu đãi"
  >
    <CouponForm />
  </RestCreate>
);

export default CreateCoupon;
