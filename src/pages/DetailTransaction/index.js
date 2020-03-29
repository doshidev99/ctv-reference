import React from "react";
import i18n from "i18next";
import { Layout } from "antd";
import TransactionPageWrapper from "./styles";
import PageTitle from "../../components/common/PageTitle/index";
import DetailTransaction from '../../containers/TransactionPage/DetailTransaction/index'


export default function DetailTransactionPage(){
  return (
    <TransactionPageWrapper>
      <PageTitle>{i18n.t("transaction.detail.title")}</PageTitle>
      <Layout>
        <DetailTransaction />
      </Layout>
    </TransactionPageWrapper>
  );
}
