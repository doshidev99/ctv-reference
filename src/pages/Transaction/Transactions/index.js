import React from "react";
import Wrapper from './styles'
import TransactionTable from '../../../containers/Transaction/List/Transactions'

export default function ListProperty(props) {
  return (
    <Wrapper>
      <TransactionTable {...props} />
    </Wrapper>
  );
}
