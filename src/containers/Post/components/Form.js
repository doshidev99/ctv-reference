import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import RestFormInput from "../../../components/RestInput/RestFormInput";
import RestRow from "../../../components/RestLayout/RowLayout";
// import {EditorWrapper} from "./styles";
import { getResources } from "../../../redux/rest/selectors";
import RestEditor from "../../../components/RestInput/RestEditor"
import RestSwitch from "../../../components/RestInput/RestSwitch";
import UploadImage from '../../../components/RestInput/RestUpload';

class PostForm extends Component {
  state = {
    confirmDirty: false,
  };

  render() {
    // const { roleData } = this.props;
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
        <p style={{"marginTop": "1em"}}>Nội dung</p>
        <RestEditor
          source="content"
          label="Nội dung"
        />
        <p style={{"margin-top": "1em"}}>Ảnh đính kèm</p>
        <UploadImage
          source="mainImage.link"
          folderPrefix="POST_IMAGE"
        />
        <RestSwitch
          source="isVisible"
          title="Trạng thái"
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
