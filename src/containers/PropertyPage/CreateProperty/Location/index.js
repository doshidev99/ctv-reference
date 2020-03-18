/* eslint-disable global-require */
import React, { Component } from "react";
import { Form, Row, Col } from "antd";
import "leaflet/dist/leaflet.css";

import { Map, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import { connect } from "react-redux";

import LocationWrapper from "./styles";
import Editor from "../../../../components/common/Editor/index";
import { markLocationAction, onChangeLocationDescriptionAction } from "../../../../redux/property/actions";

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
  addMarker = e => {
    this.props.markLocation([e.latlng.lat, e.latlng.lng]);
  };

  handleChange = (e) => {
    this.props.onChangeText(e)
  };

  render() {
    return (
      <LocationWrapper>
        <Row>
          <Col xs={16} lg={12}>
            {this.props.form.getFieldDecorator("locationDescription")(
              <div className="locationDescription">
                <label className="locationLabel">Vị trí</label>
                <FormItem>
                  <Editor label="Mô tả" onChange={this.handleChange} />
                </FormItem>
              </div>,
            )}
          </Col>
          <Col xs={8} lg={12}>
            <div className="locationMap">
              <Map center={centerLocation} zoom={13} onClick={this.addMarker}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {this.props.location.length > 0 ? (
                  <Marker position={this.props.location} />
                ) : null}
              </Map>
            </div>
          </Col>
        </Row>
      </LocationWrapper>
    );
  }
}

const mapStateToProps = state => ({
  location: state.property.location,
});

const mapDispatchToProps = dispatch => ({
  markLocation: latlg => {
    dispatch(markLocationAction(latlg));
  },
  onChangeText: text => {
    dispatch(onChangeLocationDescriptionAction(text))
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create()(Location));
