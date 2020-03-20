import React, { Component } from "react";
import Scrollbar from "react-smooth-scrollbar";
import { Button } from "antd";
import MailOptionWrapper from "./styles";
import MailBucket from './MailBucket';
import MailTag from './MailTag';




export default class MailOption extends Component {

  
  handleClick = () => {};

  render(){
  
    return (
      // eslint-disable-next-line no-return-assign
      <MailOptionWrapper>
        <div className="composeBtn">
          <Button>Soạn thư</Button>
        </div>
        <Scrollbar
          className="mailScrollBar"
          continuousScrolling
        >
          <MailBucket />
          <MailTag />
        </Scrollbar>
      </MailOptionWrapper>
    );
  }
}
