import React from "react";
import Wrapper from './styles'
import PropertyTable from '../../../containers/Property/List'

export default function ListProperty(props) {
  return (
    <Wrapper>
      <PropertyTable {...props} />
    </Wrapper>
  );
}
