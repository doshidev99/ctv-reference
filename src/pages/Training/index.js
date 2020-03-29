import React from "react";
// import i18next from "i18next";
import { Layout, Row, Col } from "antd";
import Wrapper from "./styles";
import PageTitle from "../../components/common/PageTitle/index";
import Document from "../../containers/TrainingPage/Document";
import Video from "../../containers/TrainingPage/Video";


export default function Option() {
  return (
    <Wrapper>
      <PageTitle>Đào tạo</PageTitle>
      <Layout>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Document />
          </Col>
          <Col xs={24} md={12}>
            <Video />
          </Col>
        </Row>
      </Layout>
    </Wrapper>
  );
}
