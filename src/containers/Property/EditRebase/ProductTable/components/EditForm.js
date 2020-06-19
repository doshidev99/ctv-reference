import React, {Component} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import RestFormInput from "../../../../../components/RestInput/RestFormInput";
import RestSelect from "../../../../../components/RestInput/RestSelect";
import RestRow from "../../../../../components/RestLayout/RowLayout";
import { PRODUCT_TABLE } from "../../../../../configs/constants";

class ProductEditForm extends Component{
  componentDidMount(){}

  render() {
    return (
      <RestRow {...this.props}>
        <RestFormInput
          source="building"
          title="Tòa nhà"
          placeholder="Tòa nhà"
          required
          requiredMessage="Vui lòng nhập tên tòa nhà"
        />
        <RestFormInput
          source="floor"
          title="Tầng"
          placeholder="Tầng"
          // requiredMessage="Vui lòng nhập tên sự kiện"
        />
        <RestFormInput
          source="code"
          title="Mã căn"
          placeholder="Mã căn"
          // requiredMessage="Vui lòng nhập tên sự kiện"
        />
        <RestFormInput
          source="type"
          title="Loại căn hộ"
          placeholder="Loại căn hộ"
          // requiredMessage="Vui lòng nhập tên sự kiện"
        />
        <RestFormInput
          source="direction"
          title="Hướng"
          placeholder="Hướng"
          // requiredMessage="Vui lòng nhập tên sự kiện"
        />
        {/* <RestFormInput
          source="area"
          title="Diện tích (m2)"
          placeholder="Tòa nhà"
          disable
          // requiredMessage="Vui lòng nhập tên sự kiện"
        />
        <RestFormInput
          source="price"
          title="Giá tiền"
          placeholder="Giá tiền"
          disable
          // requiredMessage="Vui lòng nhập tên sự kiện"
        /> */}
        <RestSelect
          source="status"
          header="Trạng thái"
          valueProp="id"
          titleProp="name"
          resourceData={PRODUCT_TABLE}
        />
      </RestRow>
    );
  }

};
ProductEditForm.propTypes = {
  form: PropTypes.object,
};

export default connect()(ProductEditForm);
