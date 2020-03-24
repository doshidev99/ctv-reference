import React from "react";
// import i18next from 'i18next';
import Wrapper from "./styles";
import PageTitle from "../../components/common/PageTitle/index";
import BasicInfo from "../../containers/RealtorPage/RealtorDetail/BasicInfo";
import Transaction from "../../containers/RealtorPage/RealtorDetail/Transaction";

export default function DetailRealtor(props) {
  return (
    <Wrapper>
      <PageTitle>Chi tiết</PageTitle>
      <BasicInfo {...props} />
      <Transaction {...props} />
    </Wrapper>
  );
}
