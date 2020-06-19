import React from "react";
import Wrapper from './styles'
import PageTitle from "../../../components/common/PageTitle/index";
import ProcessingTransactionTable from '../../../containers/Transaction/List/Processing'

export default function ListProperty(props) {
  return (
    <Wrapper>
      <PageTitle>Danh sách giao dịch đang xử lý</PageTitle>
      <ProcessingTransactionTable {...props} />
    </Wrapper>
  );
}
