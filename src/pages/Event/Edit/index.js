import React from "react";
// import i18n from "i18next";
import { Layout } from "antd";
import EventPageWrapper from "./styles";
import PageTitle from "../../../components/common/PageTitle/index";
import EditEventForm from '../../../containers/Property/Edit/index'



export default function NewProperty(props){
  return (
    <EventPageWrapper>
      <PageTitle>Chỉnh sửa thông tin sự kiện</PageTitle>
      <Layout>
        <EditEventForm {...props} />
      </Layout>
    </EventPageWrapper>
  );
}
