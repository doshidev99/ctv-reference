import React from "react";
import { Layout } from "antd";

import ListRealtorPageWrapper from "./styles";
import PageTitle from "../../components/common/PageTitle/index";
// import CreateButton from "../../components/RestActions/CreateButton"
import RealtorTable from "../../containers/RealtorPage/RealtorTable"
import Filter from "../../containers/RealtorPage/RealtorFilter"


export default function ListRealtor() {
  return (
    <ListRealtorPageWrapper>
      <PageTitle>Danh sách người môi giới</PageTitle>
      <Layout>
        <div className="filterArea">
          <Filter />
        </div>
        <RealtorTable />
      </Layout>
    </ListRealtorPageWrapper>
  );
}
