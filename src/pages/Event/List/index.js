import React from "react";
import Wrapper from "./styles";
import EventTable from '../../../containers/Event/List'

export default function ListEvent(props) {
  return (
    <Wrapper>
      <EventTable {...props} />
    </Wrapper>
  );
}
