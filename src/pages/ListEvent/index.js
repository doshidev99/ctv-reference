import React from "react";
import i18next from "i18next";
import { Layout } from "antd";
import { history } from "../../redux/store";
import ListEventPageWrapper from "./styles";
import PageTitle from "../../components/common/PageTitle/index";
import CreateButton from "../../components/RestActions/CreateButton";
import EventTable from "../../containers/EventPage/EventTable";
import Filter from "../../containers/EventPage/EventFilter";

export default function ListEvent() {
  return (
    <ListEventPageWrapper>
      <PageTitle>Danh sách sự kiện</PageTitle>
      <Layout>
        <div className="filterArea">
          <Filter />
        </div>
        <div className="eventAction">
          <div className="actionBox">
            <CreateButton
              source={i18next.t("button.create")}
              gotoCreatePage={() => history.push("/events/create")}
            />
          </div>
        </div>
        <EventTable />
      </Layout>
    </ListEventPageWrapper>
  );
}
