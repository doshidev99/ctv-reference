import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Label from '../../../components/RestField/Label';
import Filter from '../components/Filter';
import RestSwitch from '../../../components/RestField/Switch';
import ActionGroup from '../../../components/RestActions/ActionGroup';
import EditButton from '../../../components/RestActions/EditButton';
import DeleteButton from '../../../components/RestActions/DeleteButton'
import RestList from '../../rest/List';
// import Filter from '../components/Filter';
// import { EVENT_TAGS } from '../../../configs/constants';
import CouponWrapper from './styles';

class ListCoupon extends Component {
  componentDidMount() {}

  render() {
    
    return (
      <CouponWrapper>
        <RestList
          title="Danh sách sự kiện"
          filter={<Filter />}
          resource="coupons"
          initialFilter={{ limit: 10, skip: 0, order: '-createdAt', filter: {} }}
          {...this.props}
          redirects={{
            create: 'modal',
            edit: 'modal',
          }}
        >
          <Label
            source="title"
            title="Tên coupon"
            width="30%"
              />
          <Label
            source="beganAt"
            title="Thời gian bắt đầu"
            render={value => value ? moment(value).format('DD/MM/YYYY HH:mm') : ''}
          />
          <Label
            source="endedAt"
            title="Thời gian kết thúc"
            render={value => value ? moment(value).format('DD/MM/YYYY HH:mm') : ''}
          />
          <RestSwitch
            source="isVisible"
            title="Hiển thị"
            confirmMessage="Bạn có muốn thay đổi?"
            cancelConfirmMessage="Hủy bỏ"
            align="center"
            isShowConfirm
            onChange={this.props.onChange}
            type="switch"
          />
          <ActionGroup>
            <EditButton />
            <DeleteButton customMessage="Bạn có chắc muốn xóa" />
          </ActionGroup>
        </RestList>
      </CouponWrapper>
    );
  }
}

ListCoupon.propTypes = {
  onChange: PropTypes.func,
};

export default ListCoupon;
