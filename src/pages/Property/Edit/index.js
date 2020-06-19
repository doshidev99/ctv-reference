import React from "react";
// import i18n from "i18next";
import { Layout } from "antd";
import PropertyPageWrapper from "./styles";
import PageTitle from "../../../components/common/PageTitle/index";
import EditPropertyForm from '../../../containers/Property/EditRebase/index'
// import EditPropertyForm from '../../../containers/Property/Edit/index'


export default function NewProperty(props){
  return (
    <PropertyPageWrapper>
      <PageTitle>Chỉnh sửa thông tin dự án</PageTitle>
      <Layout>
        <EditPropertyForm {...props} />
      </Layout>
    </PropertyPageWrapper>
  
  );
  
}
