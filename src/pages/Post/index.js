import React from "react";
import Wrapper from "./styles";
import PostTable from '../../containers/Post/List'

export default function ListAdmin(props) {
  return (
    <Wrapper>
      <PostTable {...props} />
    </Wrapper>
  );
}
