import React, {Component} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import RestFormInput from "../../../components/RestInput/RestFormInput";
import RestRow from "../../../components/RestLayout/RowLayout";
import { formatDate } from "../../../utils/textProcessor";
import Editor from "../../../components/common/Editor/index";
import {EditorWrapper} from "./styles";

class PostForm extends Component{
  componentDidMount(){}

  render() {
    // const { roleData } = this.props;
    // const role = localStorage.getItem('role');
    const currentDocument = this.props;
    const { getFieldDecorator } = this.props.form;
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
          // render={(value) => formatDate(value)}
          placeholder="Mô tả"
          requiredMessage="Please input description"
        />
        <RestFormInput
          required
          source="content"
          title="Nội dung"
          // render={(value) => formatDate(value)}
          placeholder="Nội dung"
          requiredMessage="Please input content"
        >
          <EditorWrapper>
            {getFieldDecorator("content", {
              initialValue: currentDocument.content,
              rules: [
                {
                  required: true,
                  message: "Vui lòng nhập nội dung",
                },
              ],
            })(<Editor />)}
          </EditorWrapper>
        </RestFormInput>
        <EditorWrapper>
          {getFieldDecorator("content", {
            initialValue: currentDocument.content,
            rules: [
              {
                required: true,
                message: "Vui lòng nhập nội dung",
              },
            ],
          })(<Editor />)}
        </EditorWrapper>
        <RestFormInput
          required
          source="createdAt"
          title="Ngày đăng"
          render={(value) => formatDate(value)}
          placeholder="Ngày đăng"
          requiredMessage="Please input date created"
        />
      </RestRow>
    );
  }

};

const mapStateToProps = (state) => {
  const {
    currentDocument,
  } = state;
  return {
    currentDocument,
  };
};

PostForm.propTypes = {
  form: PropTypes.object,
};

export default connect(mapStateToProps, {})(PostForm);
