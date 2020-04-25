import React from "react";
import Wrapper from './styles'
import CompletedTransactionTable from '../../../containers/Transaction/List/Completed'

export default function ListProperty(props) {
  return (
    <Wrapper>
      <CompletedTransactionTable {...props} />
    </Wrapper>
  );
}
