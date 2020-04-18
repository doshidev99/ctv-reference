import React from "react";
// import i18next from "i18next";
import { Layout, Row, Col } from "antd";
import Wrapper from "./styles";
import PageTitle from "../../components/common/PageTitle/index";
import City from "../../containers/OptionPage/City";
import PropertyType from "../../containers/OptionPage/PropertyType";
import Service from "../../containers/OptionPage/Service";


export default function Option() {
  return (
    <Wrapper>
      <PageTitle>Cấu hình</PageTitle>
      <Layout>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <PropertyType />
          </Col>
          <Col xs={24} md={12}>
            <City />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Service />
          </Col>
        </Row>
      </Layout>
    </Wrapper>
  );
}
