import React from "react";
import Wrapper from "./styles";
import RealtorTable from '../../../containers/Realtor/List'

export default function ListRealtor(props) {
  return (
    <Wrapper>
      <RealtorTable {...props} />
    </Wrapper>
  );
}
