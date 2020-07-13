import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Label from '../../../../components/RestField/Label';
import RestList from '../../../rest/List';
import ActionGroup from '../../../../components/RestActions/ActionGroup';
import EditCustom from '../../../../components/RestActions/CustomEditButton';
// import RestSwitch from '../../../../components/RestField/Switch';
// import Filter from '../components/Filter';
import {PRODUCT_TABLE} from '../../../../configs/constants'
import Wrapper from './styles';

class ListProduct extends Component {
  componentDidMount() {}

  render() {
    const apiUrl = `properties/${this.props.match.params.id}/sections`;
    const apiEdit = `property-sections`;
    // console.log('[this.props]', this.props);
    return (
      <Wrapper>
        <RestList
          // filter={<Filter />}
          resource={apiUrl}
          initialFilter={{ limit: 10, skip: 0, filter: {} }}
          hasCreate={false}
          {...this.props}
        >
          <Label source="productCode" title="Mã sản phẩm" />
          <Label source="building" title="Tòa nhà" />
          <Label source="floor" title="Tầng" />
          <Label source="code" title="Mã căn" />
          <Label source="type" title="Loại căn hộ" />
          <Label source="direction" title="Hướng" requiredMessage="Vui lòng nhập hướng căn hộ" />
          <Label source="area" title="Diện tích (m2)" />
          <Label
            source="price"
            title="Giá bán chưa VAT+PBT"
            render={value => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'Vnd' }).format(value)}
          />
          <Label
            source="status"
            title="Trạng thái"
            render={value => PRODUCT_TABLE.find(item => item.id === value)
            && PRODUCT_TABLE.find(item => item.id === value).name}
          />
          {/* <RestSwitch
            source="isVisible"
            title="Hiển thị"
            align="center"
            // resourceCustom='property-sections'
            // confirmMessage="Bạn có muốn thay đổi?"
            // cancelConfirmMessage="Hủy bỏ"
            // isShowConfirm
            // onChange={this.props.onChange}
            // type="switch"
          /> */}
          <ActionGroup>
            <EditCustom resourceCustom={apiEdit} />
          </ActionGroup>
        </RestList>
      </Wrapper>
    );
  }
}

ListProduct.propTypes = {
  onChange: PropTypes.func,
};

export default ListProduct;
