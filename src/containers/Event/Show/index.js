import React, { Component } from "react";
import { connect } from "react-redux";
import { Descriptions, Typography, Tag } from "antd";
import moment from 'moment'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css';
import Wrapper, {QuillEditorWrapper} from "./styles";
import { getOneEventAction } from "../../../redux/event/actions";
import RestList from '../../rest/List';
import Label from '../../../components/RestField/Label';

const { Text, Title } = Typography;

class ShowEvent extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getEventInfo(id);
  }

  render() {
    const EVENT_REGIST_STATUS = [
      {
        id: 0,
        text: "Chưa xác nhận",
      },
      {
        id: 1,
        text: "Không tham gia",
      },
      {
        id: 2,
        text: "Có thể tham gia",
      },
      {
        id: 3,
        text: "Sẽ tham gia",
      },
    ]
    const { currentEvent  } = this.props;
    const tags = currentEvent.tags? currentEvent.tags.map((e) => (
      e === 1 ? (<Tag key={e} color="green">New</Tag>) : (<Tag key={e} color="red">Hot</Tag>)
    )): [];
    // let { digitalContract } = this.props.currentEvent;
    return (
      <Wrapper>
        <Descriptions column={1}>
          <Descriptions.Item label="Tên sự kiên">{currentEvent.name}</Descriptions.Item>
          <Descriptions.Item label="Thời gian bắt đầu">{moment(currentEvent.happenAt).format("DD/MM/YYYY HH:mm")}</Descriptions.Item>
          <Descriptions.Item label="Thời gian kết thúc">{moment(currentEvent.endedAt).format("DD/MM/YYYY HH:mm")}</Descriptions.Item>
          <Descriptions.Item label="Địa điểm">{currentEvent.locationDescription}</Descriptions.Item>
          <Descriptions.Item label="Nội dung miêu tả" />
          <QuillEditorWrapper>
            <ReactQuill value={currentEvent.content} readOnly style={{height: '300px', display: 'block'}} />
          </QuillEditorWrapper>
          <Descriptions.Item label="Số lượng khách"> 
            {currentEvent.capacity}
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái">
            <Text type={currentEvent.isVisible ? 'warning': 'danger'}>{currentEvent.isVisible ? "Khả dụng": "Không khả dụng"}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Tags"> 
            {tags}
          </Descriptions.Item>
          <Descriptions.Item label="Số lượng đăng kí"> 
            {currentEvent.registrationQuantity}
          </Descriptions.Item>
        </Descriptions>
        <Title level={4}>Danh sách đăng kí</Title>
        <RestList
          resource={`events/${this.props.match.params.id}/registrations`}
          initialFilter={{ limit: 10, skip: 0, order: 'id', filter: {} }}
          hasCreate={false}
          {...this.props}
        >
          <Label
            source="fullName"
            title="Họ và tên"
            width="15%"
          />
          <Label
            source="email"
            title="Email"
          />
          <Label
            source="phone"
            title="Số điện thoại"
          />
          <Label
            source="note"
            title="Ghi chú"
            width="30%"
          />
          <Label
            source="status"
            title="Trạng thái"
            render={value => EVENT_REGIST_STATUS.find(item => item.id === value)
              && EVENT_REGIST_STATUS.find(item => item.id === value).text}
          />
          <Label
            source="createdAt"
            title="Thời gian đăng kí"
            render={value => moment(value).format("DD/MM/YYYY HH:mm")}
          />
        </RestList>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  const { currentEvent } = state.event;
  return {
    currentEvent,
  };
};

const mapDispatchToProps = dispatch => ({
  getEventInfo: id => {
    dispatch(getOneEventAction(id));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ShowEvent);
