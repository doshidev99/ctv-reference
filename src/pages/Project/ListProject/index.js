import React from "react";
import i18next from "i18next";
import { Layout } from "antd";
import ProjectPageWrapper from "./styles";
import PageTitle from "../../../components/common/PageTitle/index";
import CreateButton from "../../../components/RestActions/CreateButton"
import ProjectTable from "../../../containers/ProjectTable"
import Filter from "./Filter"


export default function Project() {
  return (
    <ProjectPageWrapper>
      <PageTitle>{i18next.t("project.listProjectTitle")}</PageTitle>
      <Layout>
        <div className="filterArea">
          <Filter />
        </div>
        <div className="projectAction">
          <div className="actionBox">
            <CreateButton source={i18next.t("button.create")} />
          </div>
        </div>
        <ProjectTable />
      </Layout>
    </ProjectPageWrapper>
  );
}
