import React from 'react';
import moment from 'moment';
import { Typography } from 'antd';
import RestShow from '../../rest/Show';
import TextField from '../../../components/RestField/TextField';

const { Text } = Typography;

const ShowEvent = props => {
  return (
    <RestShow
      {...props}
      // hasEdit
      // noCardWrapper
      header="Thông tin cơ bản"
      resource="events"
    >
      <TextField source="name" title="Tên sự kiện" />
      <TextField
        source="beganAt"
        title="Thời gian bắt đầu"
        render={value => moment(value).format('DD-MM-YYYY hh:mm')}
       />
      <TextField
        source="endedAt"
        title="Thời gian kết thúc"
        render={value => moment(value).format('DD-MM-YYYY hh:mm')}
       />
      <TextField source="capacity" title="Số lượng" />
      <TextField source="locationDescription" title="Địa điểm" />
      <TextField
        source="isVisible"
        title="Trạng thái"
        render={value => value === false ? <Text type="danger">Không khả dụng</Text>: <Text type="warning">Khả dụng</Text>}
       />
    </RestShow>
  );
};

export default ShowEvent;
