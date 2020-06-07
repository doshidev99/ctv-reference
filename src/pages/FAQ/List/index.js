import React from "react";
import Wrapper from "./styles";
import FAQTable from '../../../containers/FAQ/List'

export default function ListEvent(props) {
  return (
    <Wrapper>
      <FAQTable {...props} />
    </Wrapper>
  );
}
