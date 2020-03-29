import React, { Component } from "react";
import { connect } from "react-redux";
import { Descriptions } from "antd";
import Wrapper from "./styles";
import { getOneEventAction } from "../../../../redux/event/actions";

class BasicInfo extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.getEventInfo(id);
  }

  render() {
    const { name, content, happenAt, locationDescription  } = this.props.currentEvent;
    // let { digitalContract } = this.props.currentEvent;
    return (
      <Wrapper>
        <div className="section-header">
          <span>Thông tin chung</span>
        </div>
        <Descriptions column={1}>
          <Descriptions.Item label="Tên sự kiên">{name}</Descriptions.Item>
          <Descriptions.Item label="Thời gian">{happenAt}</Descriptions.Item>
          <Descriptions.Item label="Địa điểm">{locationDescription}</Descriptions.Item>
          <div className="content-detail">
            <span>Nội dung miêu tả: </span>
          </div>
          <Descriptions.Item> 
            {content}
          </Descriptions.Item>
        </Descriptions>
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
export default connect(mapStateToProps, mapDispatchToProps)(BasicInfo);
