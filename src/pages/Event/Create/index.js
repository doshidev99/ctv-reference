import React from "react";
import i18n from "i18next";
import { Layout } from "antd";
import EventPageWrapper from "./styles";
import PageTitle from "../../../components/common/PageTitle/index";
// import CreateEventForm from '../../../containers/Event/Create/index'



export default function CreateEvent(){
  return (
    <EventPageWrapper>
      <PageTitle>{i18n.t("property.newEventTitle")}</PageTitle>
      <Layout>
        {/* <CreateEventForm /> */}
      </Layout>
    </EventPageWrapper>
  
  );
  
}
