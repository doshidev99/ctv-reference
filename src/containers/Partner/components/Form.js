import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import RestFormInput from "../../../components/RestInput/RestFormInput";
import RestRow from "../../../components/RestLayout/RowLayout";
import RestUpload from "../../../components/RestInput/RestUpload";
import RestSelect from "../../../components/RestInput/RestSelect";
import RestEditor from "../../../components/RestInput/RestEditor";
import RestInputAdditon from "../../../components/RestInput/RestInputAddition";
// import RestFormDatePicker from "../../../components/RestInput/RestDatePicker";
import RestDatePicker from "../../../components/form/FormDatePicker";
import { getListPropertyAction } from "../../../redux/property/actions";

class PartnerForm extends Component {
  componentDidMount(){
    this.props.getListProperty()
  }

  render() {
    const GENDER = [
      {
        id: 1,
        name: "Nam",
      },
      {
        id: 2,
        name: "Nữ",
      },
    ];
    const { properties } = this.props;
    return (
      <RestRow {...this.props}>
        <RestFormInput
          required
          source="fullName"
          title="Họ và tên"
          placeholder="Họ và tên"
          requiredMessage="Vui lòng nhập họ và tên"
        />
        <p style={{marginTop: "1em"}}>Giới tính</p>
        <RestSelect
          source="gender"
          valueProp="id"
          titleProp="name"
          placeholder="Giới tính"
          resourceData={GENDER}
          title="Giới tính"
        />
        <RestUpload
          source="avatar"
          folderPrefix="PARTNER_IMAGE"
          title="Avatar"
        />
        <RestFormInput
          required
          source="email"
          title="Email"
          placeholder="Email"
          requiredMessage="Vui lòng nhập email"
        />
        <RestFormInput
          required
          source="occupation"
          title="Nghề nghiệp"
          placeholder="Nghề nghiệp"
          requiredMessage="Vui lòng nhập nghề nghiệp"
        />
        {/* <RestFormInput
          required
          source="workExperience"
          title="Kinh nghiệm làm việc"
          placeholder="Kinh nghiệm làm việc"
          requiredMessage="Vui lòng nhập kinh nghiệm làm việc"
        /> */}
        <RestEditor
          required
          source="workExperience"
          label="Kinh nghiệm làm việc"
        />
        <RestFormInput
          required
          source="phone"
          title="Số điện thoại"
          placeholder="Số điện thoại"
          requiredMessage="Vui lòng nhập số điện thoại"
        />
        <RestInputAdditon 
          source="assistance"
          header="Các dự án đang thực hiện"
          numberOfCols={2}
        >
          {properties ? (
            <RestSelect
              source="propertyId"
              valueProp="key"
              titleProp="name"
              placeholder="Dự án"
              resourceData={properties}
              title="Dự án"
            />
          ) : ( null )}
          <RestDatePicker
            source="supportedFrom"
            header="Ngày bắt đầu hỗ trợ"
          />
        </RestInputAdditon>
      </RestRow>
    );
  }
}

const mapStateToProps = (state) => {
  const {properties} = state.property
  return {
    properties,
  };
};

const mapDispatchToProps = dispatch => ({
  getListProperty: () => {
    dispatch(getListPropertyAction(-1))
  },
})

PartnerForm.propTypes = {
  form: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(PartnerForm);
