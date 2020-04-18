import React from "react";
import Wrapper from './styles'
import TransactionTable from '../../../containers/Transaction/List/Processing'

export default function ListProperty(props) {
  return (
    <Wrapper>
      <TransactionTable {...props} />
    </Wrapper>
  );
}
