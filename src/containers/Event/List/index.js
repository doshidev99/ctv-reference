import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Tag } from 'antd';
import { Link } from 'react-router-dom';
import Label from '../../../components/RestField/Label';
import Filter from '../components/Filter';
import RestSwitch from '../../../components/RestField/Switch';
import ActionGroup from '../../../components/RestActions/ActionGroup';
import EditButton from '../../../components/RestActions/EditButton';
import DeleteButton from '../../../components/RestActions/DeleteButton'
import RestList from '../../rest/List';
// import Filter from '../components/Filter';
// import { EVENT_TAGS } from '../../../configs/constants';
import EventWrapper from './styles';

class ListEvent extends Component {
  componentDidMount() {}

  render() {

    return (
      <EventWrapper>
        <RestList
          title="Danh sách sự kiện"
          filter={<Filter />}
          resource="events"
          initialFilter={{ limit: 10, skip: 0, order: '-createdAt', filter: {} }}
          {...this.props}
          redirects={{
            create: 'newPage',
            edit: 'modal',
            show: 'newPage',
          }}
        >
          <Label
            source="name"
            title="Tên sự kiện"
            width="30%"
            render={( value, record) => {
            return <Link to={`/events/${record.id}/show`}>{value}</Link>
          }}  />
          <Label
            source="beganAt"
            title="Thời gian bắt đầu"
            render={value => value ? moment(value).format('DD/MM/YYYY HH:mm') : ''}
          />
          <Label source="locationDescription" title="Địa điểm" />
          {/* <Label
            source="isVisible"
            title="Trạng thái"
            render={value => value === true ? "Khả dụng": "Không khả dụng"}
          /> */}
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
          <Label
            source="tags"
            title="Tags"
            render={value=> value.map(tag => (
              tag === 1 ? (<Tag key={tag} color="green">New</Tag>) : (<Tag key={tag} color="red">Hot</Tag>)
            ))}
           />
          <ActionGroup>
            <EditButton />
            <DeleteButton customMessage="Bạn có chắc muốn xóa" />
          </ActionGroup>
        </RestList>
      </EventWrapper>
    );
  }
}

ListEvent.propTypes = {
  onChange: PropTypes.func,
};

export default ListEvent;
