import React from "react";
import { Layout } from "antd";
import EventPageWrapper from "./styles";
import PageTitle from "../../../components/common/PageTitle/index";
import CreateEventForm from '../../../containers/Event/Create/index'



export default function CreateEvent(){
  return (
    <EventPageWrapper>
      <PageTitle>Thêm sự kiện</PageTitle>
      <Layout>
        <CreateEventForm />
      </Layout>
    </EventPageWrapper>
  
  );
  
}
