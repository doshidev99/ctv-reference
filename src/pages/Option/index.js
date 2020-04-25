import React from "react";
// import i18next from "i18next";
import { Layout, Row, Col } from "antd";
import Wrapper from "./styles";
import PageTitle from "../../components/common/PageTitle/index";
import City from "../../containers/OptionPage/City";
import PropertyType from "../../containers/OptionPage/PropertyType";
import Service from "../../containers/OptionPage/Service";
import Discount from "../../containers/OptionPage/Discount";
import Payment from "../../containers/OptionPage/Payment";


export default function Option() {
  return (
    <Wrapper>
      <PageTitle>Cấu hình</PageTitle>
      <Layout>
        <div>
          <Row gutter={[16, 24]}>
            <Col xs={24} md={12}>
              <PropertyType />
            </Col>
            <Col xs={24} md={12}>
              <City />
            </Col>
          </Row>
          <Row gutter={[16, 24]}>
            <Col xs={24} md={12}>
              <Service />
            </Col>
          
          </Row>
          <Row gutter={[16, 24]}>
            <Col xs={24} md={12}>
              <Discount />
            </Col>
            <Col xs={24} md={12}>
              <Payment />
            </Col>
          </Row>
        </div>
       
      </Layout>
    </Wrapper>
  );
}
