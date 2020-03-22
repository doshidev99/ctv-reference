import React, { Component } from "react";
import { Card, Spin } from "antd";
import Scrollbar from "react-smooth-scrollbar";
import { connect } from "react-redux";
import SingleMailWrapper from "./styles";
import MailAction from "./MailAction";
import MailContent from "./MailContent";

import {} from "../../../redux/mail/actions";
// import dumpedMails from "./fakeData";

// const currentMail1 = dumpedMails[0];
class SingleMail extends Component {
  handleOnChange = () => {};

  renderNoMail = () => {
    const singleMailComponent = (
      <div className="noMailMsg">
        <Card>
          <p>Please select a mail to read</p>
        </Card>
      </div>
    );
    return singleMailComponent;
  };

  render() {
    const { currentMail, loading } = this.props;
    let content;
    if (currentMail == null) {
      content = this.renderNoMail();
    } else if (loading) {
      content = (
        <div className="loadingCurrentMail">
          <Spin />
        </div>
      );
    } else {
      content = (
        <Scrollbar className="singleMailScroll" continuousScrolling>
          <MailContent mail={currentMail} />
        </Scrollbar>
      );
    }
    return (
      <SingleMailWrapper>
        <MailAction />
        {content}
      </SingleMailWrapper>
    );
  }
}

const mapStateToProps = state => {
  const { currentMail, loading } = state.mail;
  return {
    currentMail,
    loading,
  };
};

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(SingleMail);
