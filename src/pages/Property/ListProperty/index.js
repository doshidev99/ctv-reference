import React from "react";
import i18next from "i18next";
import { Layout } from "antd";
import { history } from "../../../redux/store";
import PropertyPageWrapper from "./styles";
import PageTitle from "../../../components/common/PageTitle/index";
import CreateButton from "../../../components/RestActions/CreateButton"
import PropertyTable from "../../../containers/PropertyTable"
import Filter from "./Filter"


export default function ListProperty() {
  return (
    <PropertyPageWrapper>
      <PageTitle>{i18next.t("property.listPropertyTitle")}</PageTitle>
      <Layout>
        <div className="filterArea">
          <Filter />
        </div>
        <div className="propertyAction">
          <div className="actionBox">
            <CreateButton source={i18next.t("button.create")} gotoCreatePage={() => history.push("/du-an/tao-moi")} />
          </div>
        </div>
        <PropertyTable />
      </Layout>
    </PropertyPageWrapper>
  );
}
