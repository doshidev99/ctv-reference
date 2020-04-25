import React from "react";
import Wrapper from './styles'
import CanceledTransactionTable from '../../../containers/Transaction/List/Canceled'

export default function ListProperty(props) {
  return (
    <Wrapper>
      <CanceledTransactionTable {...props} />
    </Wrapper>
  );
}
