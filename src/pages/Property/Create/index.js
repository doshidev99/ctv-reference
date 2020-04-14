import React from "react";
import i18n from "i18next";
import { Layout } from "antd";
import PropertyPageWrapper from "./styles";
import PageTitle from "../../../components/common/PageTitle/index";
import CreatePropertyForm from '../../../containers/Property/Create/index'



export default function NewProperty(){
  return (
    <PropertyPageWrapper>
      <PageTitle>{i18n.t("property.newPropertyTitle")}</PageTitle>
      <Layout>
        <CreatePropertyForm />
      </Layout>
    </PropertyPageWrapper>
  
  );
  
}
