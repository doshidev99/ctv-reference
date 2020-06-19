import React from "react";
import Wrapper from './styles'
import PageTitle from "../../../components/common/PageTitle/index";
import CompletedTransactionTable from '../../../containers/Transaction/List/Completed'

export default function ListProperty(props) {
  return (
    <Wrapper>
      <PageTitle>Danh sách giao dịch đã hoàn thành</PageTitle>
      <CompletedTransactionTable {...props} />
    </Wrapper>
  );
}
