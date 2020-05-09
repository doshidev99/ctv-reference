import React from "react";
import Wrapper from "./styles";
import PartnerTable from '../../../containers/Partner/List'

export default function ListEvent(props) {
  return (
    <Wrapper>
      <PartnerTable {...props} />
    </Wrapper>
  );
}
