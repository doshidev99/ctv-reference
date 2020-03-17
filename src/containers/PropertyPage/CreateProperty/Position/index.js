/* eslint-disable global-require */
import React, { Component } from "react";
import { Form, Row, Col } from "antd";
import 'leaflet/dist/leaflet.css'

import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import L from 'leaflet';

import PostionWrapper from "./styles";
import Editor from "../../../../components/common/Editor/index";

const FormItem = Form.Item;
const position = [16.0592, 108.2179];
// eslint-disable-next-line no-underscore-dangle
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
export default class Postion extends Component {
  render() {
    return (
      <PostionWrapper>
        <Row>
          <Col xs={16} lg={12}>
            <div className="positionDescription">
              <label className="positionLabel">Vị trí</label>
              <FormItem>
                <Editor label="Mô tả" onChange={this.handleChange} />
              </FormItem>
          
            </div>
          </Col>
          <Col xs={8} lg={12}>
            <div className="positionMap">
              <Map center={position} zoom={13}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
                <Marker position={position}>
                  <Popup>
                A pretty CSS3 popup.
                    <br />
                Easily customizable.
                  </Popup>
                </Marker>
              </Map>
            </div>
          </Col>
         
        </Row>
       
      </PostionWrapper>
    );
  }
}
