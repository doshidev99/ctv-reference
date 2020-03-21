import React, { Component } from 'react'
import { Card } from 'antd'
import Scrollbar from "react-smooth-scrollbar";
import SingleMailWrapper from './styles'
import MailAction from './MailAction'
import MailContent from './MailContent'

import dumpedMails from "./fakeData";

const currentMail = dumpedMails[0];
export default class SingleMail extends Component {
  handleOnChange = () => {

  }

  renderMail = () => {
    const singleMailComponent = (
      <p className="noMailMsg">
        <Card>
          <p>Please select a mail to read</p>
        </Card>
      </p>
    );
    return singleMailComponent
  }

  render() {
    // const status = false;
    return (
      <SingleMailWrapper>
        <MailAction />
        <Scrollbar
          className="singleMailScroll"
          continuousScrolling
        >
          <MailContent mail={currentMail} />
        </Scrollbar>
      </SingleMailWrapper>
    )
  }
}
