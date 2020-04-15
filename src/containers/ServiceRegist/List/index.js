import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from "react-redux";
import Label from '../../../components/RestField/Label';
import ActionGroup from '../../../components/RestActions/ActionGroup';
import EditButton from '../../../components/RestActions/EditButton';
import ConfirmButton from '../../../components/RestActions/ConfirmButton';
import RestList from '../../rest/List';
import {REGISTRATION_STATUS} from "../../../configs/constants";
import Filter from '../components/Filter';

import ServiceTableWrapper from './styles';

class ListServiceRegist extends Component {
  state = {
    editVisible: false,
  }

  componentDidMount() {}

  showEditModal = async id => {
    await this.props.getOneService(id);
    this.setState({
      editVisible: true,
    });
  };

  render() {

    return (
      <ServiceTableWrapper>
        <RestList
          title="Danh sách dịch vụ đăng kí"
          filter={<Filter />}
          resource="service-registrations"
          initialFilter={{ limit: 10, skip: 0, order:"-updatedAt", filter: { status: 1} }}
          hasCreate={false}
          {...this.props}
        >
          <Label source="service.name" title="Tên dịch vụ" />
          <Label source="realtor.fullName" title="Tên CTV" />
          <Label source="realtor.phone" title="SDT" />
          <Label source="transaction.code" title="Mã giao dịch" />
          <Label
            source="status"
            title="Trạng thái đăng kí"
            render={value => REGISTRATION_STATUS.find(item => item.id === value)
            && REGISTRATION_STATUS.find(item => item.id === value).text} 
          />
          <Label
            source="happenAt"
            title="Thời gian xác nhận"
            render={value => value ? moment(value).format('DD/MM/YYYY HH:mm') : ''}
          />
          <ActionGroup>
            <EditButton />
            <ConfirmButton />
          </ActionGroup>
        </RestList>
      </ServiceTableWrapper>
    );
  }
}

ListServiceRegist.propTypes = {
  onChange: PropTypes.func,
};

export default connect() (ListServiceRegist);
