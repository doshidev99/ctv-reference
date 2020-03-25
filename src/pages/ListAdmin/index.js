import React from "react";
import { Layout } from "antd";
import ListAdminPageWrapper from "./styles";
import PageTitle from "../../components/common/PageTitle/index";
import AdminTable from "../../containers/AdminPage/AdminTable"
import Filter from "../../containers/AdminPage/AdminFilter"


export default function ListAdmin() {
  return (
    <ListAdminPageWrapper>
      <PageTitle>Danh sách quản trị viên</PageTitle>
      <Layout>
        <div className="filterArea">
          <Filter />
        </div>
        <AdminTable />
      </Layout>
    </ListAdminPageWrapper>
  );
}
