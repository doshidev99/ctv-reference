import React, { Component } from 'react'
import { Input, Button } from 'antd'
import Scrollbar from "react-smooth-scrollbar";
import MailComposerWrapper from './styles';
import Editor from '../../../components/common/Editor'

export default class CreateMailForm extends Component {
  handleClick = () => {
    
  }

  render() {
    return (
      <Scrollbar
        className="singleMailScroll"
        continuousScrolling
    >
        <MailComposerWrapper>
          <Input placeholder="To" className="inputBox"  />
          <Input placeholder="CC" className="inputBox"  />
          <Input placeholder="Subject" className="inputBox" />
          <Editor placeholder="Write something" className="mailEditor" />
          <div className="composeMailBtnWrapper">
            <Button
              type="primary"
              onClick={this.handleClick}
              className="sendMailBtn"
          >
            Send
            </Button>
          </div>
       
        </MailComposerWrapper>
      </Scrollbar>
      
    )
  }
}
