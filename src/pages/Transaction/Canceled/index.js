import React from "react";
import Wrapper from './styles'
import PageTitle from "../../../components/common/PageTitle/index";
import CanceledTransactionTable from '../../../containers/Transaction/List/Canceled'

export default function ListProperty(props) {
  return (
    <Wrapper>
      <PageTitle>Danh sách giao dịch đã hủy</PageTitle>
      <CanceledTransactionTable {...props} />
    </Wrapper>
  );
}
