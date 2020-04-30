import React from "react";
// import i18next from 'i18next';
import Wrapper from "./styles2";
import PageTitle from "../../components/common/PageTitle/index";
import BasicInfo from "../../containers/Transaction/Show/BasicInfo";
import StatusTrans from "../../containers/Transaction/Show/StatusTrans";

export default function DetailTransaction(props) {
  return (
    <Wrapper>
      <PageTitle>Chi tiết giao dịch</PageTitle>
      <BasicInfo {...props} />
      <StatusTrans {...props} />
    </Wrapper>
  );
}
