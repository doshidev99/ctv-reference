import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Label from '../../../components/RestField/Label';
import ActionGroup from '../../../components/RestActions/ActionGroup';
import EditButton from '../../../components/RestActions/EditButton';
import DeleteButton from '../../../components/RestActions/DeleteButton';
import RestList from '../../rest/List';
import Filter from '../components/Filter';
import { ADMIN_ROLES } from '../../../configs/constants';
import AdminWrapper from './style';

class ListAdmin extends Component {
  componentDidMount() {}

  render() {
    
    return (
      <AdminWrapper>
        <RestList
          title="Danh sách quản trị viên"
          filter={<Filter />}
          resource="staffs"
          initialFilter={{ limit: 10, skip: 0, order: 'roleId', filter: {} }}
          {...this.props}
        >
          <Label source="id" title="ID" width="90px" />
          <Label source="fullName" title="Họ và tên" />
          <Label source="email" title="Email" />
          <Label
            source="roleId"
            title="Vai trò"
            render={value =>
              ADMIN_ROLES.find(item => item.id === value) &&
              ADMIN_ROLES.find(item => item.id === value).titleProp}
          />
          <ActionGroup>
            <EditButton />
            <DeleteButton />
          </ActionGroup>
        </RestList>
      </AdminWrapper>
    );
  }
}

ListAdmin.propTypes = {
  onChange: PropTypes.func,
};

export default ListAdmin;
