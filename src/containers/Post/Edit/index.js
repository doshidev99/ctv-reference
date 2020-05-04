import React from "react";
import RestEdit from "../../rest/Edit";
import PostForm from "../components/EditForm";
import EditWrapper from "./style";

const EditPost = (props) => {
  return (
    <EditWrapper>
      <RestEdit {...props} resource="posts" title="Edit tin tức">
        <PostForm />
      </RestEdit>
    </EditWrapper>
  )
}

export default EditPost;
