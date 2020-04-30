import React from "react";
import PageWrapper from "./styles";
import PageTitle from "../../../components/common/PageTitle/index";
import DetailEventInfo from '../../../containers/Event/Show'

export default function DetailEvent(props){
  return (
    <PageWrapper>
      <PageTitle>Chi tiết sự kiện</PageTitle>
      <DetailEventInfo {...props} />
    </PageWrapper>
  
  );
  
}
