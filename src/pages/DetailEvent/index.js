import React from "react";
// import i18next from 'i18next';
import Wrapper from "./styles";
import PageTitle from "../../components/common/PageTitle/index";
import BasicInfo from "../../containers/EventPage/EventDetail/BasicInfo";
import Registration from "../../containers/EventPage/EventDetail/Registration";

export default function DetailEvent(props) {
  return (
    <Wrapper>
      <PageTitle>Chi tiết</PageTitle>
      <BasicInfo {...props} />
      <Registration {...props} />
    </Wrapper>
  );
}
