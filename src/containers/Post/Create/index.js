import React from "react";
import _ from "lodash";
import RestCreate from "../../rest/Create";
import PostForm from "../components/Form";

const formatOnSubmit = (values) => {
  return _.omit(values);
};

const CreatePosts = (props) => (
  <RestCreate
    {...props}
    formatOnSubmit={formatOnSubmit}
    resource="posts"
    title="Thêm tin tức"
  >
    <PostForm />
  </RestCreate>
);

export default CreatePosts;
