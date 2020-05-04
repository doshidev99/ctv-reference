import React from "react";
// import i18next from 'i18next';
import Wrapper from "./styles";
import PageTitle from "../../../components/common/PageTitle/index";
import BasicInfo from "../../../containers/Realtor/Show";
// import ListTransaction from "../../containers/Realtor/Show/Transaction";

export default function DetailRealtor(props) {
  return (
    <Wrapper>
      <PageTitle>Chi tiết</PageTitle>
      <BasicInfo {...props} />
      {/* <ListTransaction {...props} /> */}
    </Wrapper>
  );
}
