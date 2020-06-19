/* eslint-disable global-require */
import React, { Component } from "react";
import { Form, Row, Col, Input, Typography, Button, message } from "antd";
import "leaflet/dist/leaflet.css";

import { Map, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import { connect } from "react-redux";

import LocationWrapper from "./styles";
import Editor from "../../../../components/common/Editor/index";
import { markLocationAction, submitEditChildrenProperty } from "../../../../redux/property/actions";

const FormItem = Form.Item;
const centerLocation = [16.0592, 108.2179];
// eslint-disable-next-line no-underscore-dangle
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

class Location extends Component {
  addMarker = (e) => {
    this.props.markLocation([e.latlng.lat, e.latlng.lng]);
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let payload = this.props.form.getFieldsValue([
        'address',
        'locationDescription',
      ])
      payload = {
        ...payload,
        location: {
          latitude: this.props.location[0],
          longitude: this.props.location[1],
        },
      }
      
      this.props.submitForm(this.props.id, payload);
    } catch (error) {
      message.error("Có lỗi xảy ra");
    }
  }

  render() {
    const buttonEdit =  (
      <div className="submitButton">
        <Button
          type="primary"
          size="large"
          onClick={this.handleSubmit}
          >
            Cập nhật thông tin
        </Button>
      </div>
    )
    return (
      <LocationWrapper>
        <Typography.Title level={4}>Vị trí</Typography.Title>
        <Form layout="vertical" onSubmit={this.handleSubmit}>
          <Row gutter={16}>
            <Col xs={24} lg={16} xl={12}>
              <div className="locationDescription">
                <FormItem>
                  {this.props.form.getFieldDecorator("address", {
                  initialValue: this.props.address,
                  rules: [
                    {
                      required: true,
                      message: "Địa chỉ dự án không được trống",
                    },
                  ],
                })(<Input placeholder="Nhập địa chỉ dự án" />)}
                </FormItem>
                <FormItem>
                  {this.props.form.getFieldDecorator("locationDescription")(
                    <Editor content={this.props.description} />,
                )}
                </FormItem>
              </div>
            </Col>
            <Col xs={24} lg={16} xl={12}>
              <div className="locationMap">
                <Map
                  center={
                  (this.props.location.length && this.props.location) ||
                  centerLocation
                }
                  zoom={13}
                  onClick={this.addMarker}
              >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  {this.props.location.length > 0 ? (
                    <Marker position={this.props.location} />
                ) : null}
                </Map>
              </div>
            </Col>
          </Row>
          {buttonEdit}
        </Form>
      </LocationWrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  location: state.property.location,
});

const mapDispatchToProps = (dispatch) => ({
  markLocation: (latlg) => {
    dispatch(markLocationAction(latlg));
  },
  submitForm: (id, payload) => {
    dispatch(submitEditChildrenProperty(id, payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Location));
