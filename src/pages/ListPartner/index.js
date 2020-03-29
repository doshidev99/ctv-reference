import React from "react";
import { Layout } from "antd";
import ListPartnerPageWrapper from "./styles";
import PageTitle from "../../components/common/PageTitle/index";
import PartnerTable from "../../containers/PartnerPage/PartnerTable"
import Filter from "../../containers/PartnerPage/PartnerFilter"


export default function ListPartner() {
  return (
    <ListPartnerPageWrapper>
      <PageTitle>Danh sách partner</PageTitle>
      <Layout>
        <div className="filterArea">
          <Filter />
        </div>
        <PartnerTable />
      </Layout>
    </ListPartnerPageWrapper>
  );
}
