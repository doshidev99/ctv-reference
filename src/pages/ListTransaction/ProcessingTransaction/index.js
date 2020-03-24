import React from "react";
import i18next from "i18next";
import { Layout } from "antd";
import ListTransactionPageWrapper from "./styles";
import PageTitle from "../../../components/common/PageTitle/index";
import ProcessingTransactionTable from "../../../containers/TransactionPage/ProcessingTransactionTable"
import Filter from "../../../containers/TransactionPage/TransactionFilter"


export default function ListProperty() {
  return (
    <ListTransactionPageWrapper>
      <PageTitle>{i18next.t("transaction.listTransactionTitle")}</PageTitle>
      <Layout>
        <div className="filterArea">
          <Filter />
        </div>
        <ProcessingTransactionTable />
      </Layout>
    </ListTransactionPageWrapper>
  );
}
