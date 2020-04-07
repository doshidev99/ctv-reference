import React from "react";
import Wrapper from "./styles";
import AdminTable from '../../containers/Admin/List'

export default function ListAdmin(props) {
  return (
    <Wrapper>
      <AdminTable {...props} />
    </Wrapper>
  );
}
