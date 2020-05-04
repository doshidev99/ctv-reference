import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import RestFormInput from "../../../components/RestInput/RestFormInput";
import RestRow from "../../../components/RestLayout/RowLayout";
// import {EditorWrapper} from "./styles";
import { getResources } from "../../../redux/rest/selectors";
import { formatDate } from "../../../utils/textProcessor";
import Editor from "../../../components/common/Editor/index";

class PostForm extends Component {
  state = {
    confirmDirty: false,
  };

  render() {
    return (
      <RestRow {...this.props}>
        <RestFormInput
          required
          source="title"
          title="Tiêu đề"
          placeholder="Tiêu đề"
          requiredMessage="Please input title"
        />
        <RestFormInput
          required
          source="description"
          title="Mô tả"
          placeholder="Mô tả"
          requiredMessage="Please input description"
        />
        <RestFormInput
          required
          source="content"
          title="Nội dung"
          placeholder="Nội dung"
          Component={<Editor />}
          requiredMessage="Please input content"
        >
          <Editor />
        </RestFormInput>
        <Editor />
        {/* <Editor
          required
          source="content"
          title="Nội dung"
        >
        </Editor> */}
        {/* <EditorWrapper>
          {getFieldDecorator("content", {
            rules: [
              {
                required: true,
                message: "Vui lòng nhập nội dung",
              },
            ],
          })(<Editor />)}
          <Editor />
        </EditorWrapper> */}
        <RestFormInput
          required
          source="createdAt"
          title="Ngày đăng"
          render={(createdAt) => formatDate(createdAt)}
          placeholder="Ngày đăng"
          requiredMessage="Please input date created"
        />
      </RestRow>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    roleData: getResources(state, "roles"),
  };
};

PostForm.propTypes = {
  form: PropTypes.object,
};

export default connect(mapStateToProps, {})(PostForm);
