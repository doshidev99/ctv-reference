import React from "react";
import i18next from "i18next";
import { Layout } from "antd";
import ListTransactionPageWrapper from "./styles";
import PageTitle from "../../../components/common/PageTitle/index";
import CompletedTransactionTable from "../../../containers/TransactionPage/CompletedTransactionTable"
import Filter from "../../../containers/TransactionPage/TransactionFilter"


export default function ListProperty() {
  return (
    <ListTransactionPageWrapper>
      <PageTitle>{i18next.t("transaction.listTransactionTitle")}</PageTitle>
      <Layout>
        <div className="filterArea">
          <Filter />
        </div>
        <CompletedTransactionTable />
      </Layout>
    </ListTransactionPageWrapper>
  );
}
