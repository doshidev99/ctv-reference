import React from "react";
import Wrapper from './styles'
import ProcessingTransactionTable from '../../../containers/Transaction/List/Processing'

export default function ListProperty(props) {
  return (
    <Wrapper>
      <ProcessingTransactionTable {...props} />
    </Wrapper>
  );
}
