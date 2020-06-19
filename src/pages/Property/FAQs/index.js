import React from "react";
import Wrapper from './styles'
import PageTitle from "../../../components/common/PageTitle/index";
import FAQPropertyTable from '../../../containers/Property/FAQ'

export default function ListProperty(props) {
  return (
    <Wrapper>
      <PageTitle>Danh sách câu hỏi thường gặp của dự án</PageTitle>
      <FAQPropertyTable {...props} />
    </Wrapper>
  );
}
