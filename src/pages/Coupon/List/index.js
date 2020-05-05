import React from "react";
import Wrapper from "./styles";
import CouponTable from '../../../containers/Coupon/List'

export default function ListEvent(props) {
  return (
    <Wrapper>
      <CouponTable {...props} />
    </Wrapper>
  );
}
