import React, { Component } from "react";
import { Form, Input, Button, Row, Col, Drawer, message } from "antd";

import { connect } from "react-redux";
import {
  closeRoomFormAction,
  submitRoomFormAction,
} from "../../../../redux/property/actions";
// import { mongoObjectId } from "../../../../utils/textProcessor";
import RoomWrapper from "./styles";

class Room extends Component {
  handleSubmit = async () => {
    try {
      let room = await this.props.form.validateFields();
      const{id, floorId} = this.props.roomInfo;
      room = {
        ...room,
        id,
        floorId,
      };
      this.props.submitForm(room);
      this.props.closeForm()
    } catch {
      message.error("Lỗi khi nhập thông tin sản phẩm");
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const {productCode, area, price} =this.props.roomInfo;
    return (
      <RoomWrapper>
        <Drawer
          title="Thông tin sản phẩm"
          width={300}
          onClose={this.props.closeForm}
          visible={this.props.isShowRoom}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <Form layout="vertical" hideRequiredMark>
            <Row>
              <Col span={24}>
                <Form.Item label="Mã sản phẩm">
                  {getFieldDecorator("productCode", {
                    rules: [
                      { required: true, message: "Vui lòng nhập mã sản phẩm" },
                    ],
                    initialValue: productCode,
                  })(<Input placeholder="Mã sản phẩm" />)}
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Form.Item label="Diện tích">
                  {getFieldDecorator("area", {
                    rules: [
                      { required: true, message: "Diện tích không được trống" },
                    ],
                    initialValue: area,
                  })(<Input placeholder="Diện tích" />)}
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Form.Item label="Đơn giá (chưa bao gồm VAT)">
                  {getFieldDecorator("price", {
                    rules: [
                      { required: true, message: "Đơn giá không được trống" },
                    ],
                    initialValue: price,
                  })(<Input placeholder="Đơn giá" />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <div
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              width: "100%",
              borderTop: "1px solid #e9e9e9",
              padding: "10px 16px",
              background: "#fff",
              textAlign: "right",
            }}
          >
            <Button onClick={this.props.closeForm} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} type="primary">
              Submit
            </Button>
          </div>
        </Drawer>
      </RoomWrapper>
    );
  }
}

const mapStateToProps = state => {
  const { isShowRoom, roomInfo } = state.property;
  return {
    isShowRoom,
    roomInfo,
  };
};

const mapDispatchToProps = dispatch => ({
  closeForm: () => {
    dispatch(closeRoomFormAction());
  },
  submitForm: payload => {
    dispatch(submitRoomFormAction(payload));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create()(Room));
