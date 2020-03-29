import React from "react";
import { Layout } from "antd";
import PropertyPageWrapper from "./styles";
import PageTitle from "../../components/common/PageTitle/index";
import CreateEventForm from '../../containers/EventPage/CreateEvent/index'



export default function NewEvent(){
  return (
    <PropertyPageWrapper>
      <PageTitle>Tạo mới sự kiện</PageTitle>
      <Layout>
        <CreateEventForm />
      </Layout>
    </PropertyPageWrapper>
  );
}
