import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Label from '../../../components/RestField/Label';
import Filter from '../components/Filter';
import ActionGroup from '../../../components/RestActions/ActionGroup';
import EditButton from '../../../components/RestActions/EditButton';
import DeleteButton from '../../../components/RestActions/DeleteButton'
import RestList from '../../rest/List';
// import Filter from '../components/Filter';
// import { EVENT_TAGS } from '../../../configs/constants';
import PartnerWrapper from './styles';

class ListPartner extends Component {
  componentDidMount() {}

  render() {

    return (
      <PartnerWrapper>
        <RestList
          title="Danh sách cộng tác viên"
          filter={<Filter />}
          resource="partners"
          initialFilter={{ limit: 10, skip: 0, order: '-createdAt', filter: {} }}
          {...this.props}
          redirects={{
            create: 'modal',
            edit: 'modal',
          }}
        >
          {/* <Label source="id" title="STT" width="90px" /> */}
          <Label
            source="fullName"
            title="Họ và tên"
            width="30%"
          />
          <Label
            source="email"
            title="Email"
          />
          <Label
            source="phone"
            title="Số điện thoại"
          />
          <ActionGroup>
            <EditButton />
            <DeleteButton customMessage="Bạn có chắc muốn xóa" />
          </ActionGroup>
        </RestList>
      </PartnerWrapper>
    );
  }
}

ListPartner.propTypes = {
  onChange: PropTypes.func,
};

export default ListPartner;
