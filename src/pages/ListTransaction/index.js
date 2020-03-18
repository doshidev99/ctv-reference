import React from "react";
import i18next from "i18next";
import { Layout } from "antd";
// import { history } from "../../redux/store";

import ListPropertyPageWrapper from "./styles";
import PageTitle from "../../components/common/PageTitle/index";
// import CreateButton from "../../components/RestActions/CreateButton"
import TransactionTable from "../../containers/TransactionPage/TransactionTable"
import Filter from "../../containers/TransactionPage/TransactionFilter"


export default function ListProperty() {
  return (
    <ListPropertyPageWrapper>
      <PageTitle>{i18next.t("property.listPropertyTitle")}</PageTitle>
      <Layout>
        <div className="filterArea">
          <Filter />
        </div>
        <TransactionTable />
      </Layout>
    </ListPropertyPageWrapper>
  );
}
