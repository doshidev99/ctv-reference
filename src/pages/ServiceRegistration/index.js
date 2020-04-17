import React from "react";
import Wrapper from "./styles";
import ServiceTable from '../../containers/ServiceRegist/List'

export default function ListRegistService(props) {
  return (
    <Wrapper>
      <ServiceTable {...props} />
    </Wrapper>
  );
}
