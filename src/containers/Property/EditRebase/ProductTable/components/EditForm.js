import React, {Component} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import RestFormInput from "../../../../../components/RestInput/RestFormInput";
import RestSelect from "../../../../../components/RestInput/RestSelect";
import RestRow from "../../../../../components/RestLayout/RowLayout";
import { PRODUCT_TABLE } from "../../../../../configs/constants";
import UploadImage from '../../../../../components/RestInput/RestUpload';
import RestSwitch from "../../../../../components/RestInput/RestSwitch";

class ProductEditForm extends Component{
  componentDidMount(){}

  render() {
    return (
      <RestRow {...this.props}>
        <RestFormInput
          source="building"
          title="Tòa nhà"
          placeholder="Tòa nhà"
          requiredMessage="Vui lòng nhập tên tòa nhà"
        />
        <RestFormInput
          source="floor"
          title="Tầng"
          placeholder="Tầng"
        />
        <RestFormInput
          source="code"
          title="Mã căn"
          placeholder="Mã căn"
        />
        <RestFormInput
          source="type"
          title="Loại căn hộ"
          placeholder="Loại căn hộ"
        />
        <RestFormInput
          source="direction"
          title="Hướng"
          placeholder="Hướng"
        />
        <p style={{marginTop: "1em"}}>Ảnh</p>
        <UploadImage
          source="image"
          folderPrefix="PRODUCT_TABLE_IMAGE"
        />
        <RestFormInput
          source="price"
          title="Giá bán chưa VAT+PBT"
          placeholder="Giá"
          defaultValue={this.props.record.price.toString()}
          rules={[{
            // type: "number",
            pattern: new RegExp("^[0-9]+$"),
            message: 'Need to enter number',
          }]}
        />
        <RestSelect
          source="status"
          header="Trạng thái"
          valueProp="id"
          titleProp="name"
          resourceData={PRODUCT_TABLE}
        />
        <RestSwitch
          source="isVisible"
          title="Hiển thị"
        />
      </RestRow>
    );
  }

};
ProductEditForm.propTypes = {
  form: PropTypes.object,
};

export default connect()(ProductEditForm);
