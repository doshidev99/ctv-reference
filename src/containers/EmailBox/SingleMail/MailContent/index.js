/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from "react";
// import { Icon, Button } from "antd";
import { connect } from "react-redux";
import moment from "moment";
import {
  SingleMailContents,
  SingleMailHeader,
  SingleMailInfo,
  SingleMailBody,
  SingleMailReply,
} from "./styles";
import MailComposer from "./MailComposer";
import { composeMailAction } from "../../../../redux/mail/actions";

class MailContent extends Component {
  handleClick = () => {
    // console.log("OK");
  };

  render() {
    const { mail, isCompose } = this.props;
    const recpName = mail.name;
    const signature = {
      splitLet: recpName
        .match(/\b(\w)/g)
        .join("")
        .split("", 2),
    };
    const replyArea = isCompose ? (
      <SingleMailReply className="replyMail">
        <MailComposer />
      </SingleMailReply>
    ) : (
      <SingleMailReply className="replyMail">
        <div onClick={this.props.composeMail} className="replyMailBtn">
          Click here to
          <span style={{ paddingLeft: 3 }}>Reply</span>
        </div>
      </SingleMailReply>
    );
    return (
      <SingleMailContents>
        <div className="singleMail">
          <SingleMailHeader className="mailHeader">
            <h2>{mail.subject}</h2>
            {/* <span className="label">
              {mail.tags ? mail.tags : mail.bucket}
            </span> */}
          </SingleMailHeader>

          <SingleMailInfo className="mailInfo">
            <div className="recipentsImg">
              {mail.img ? (
                <img alt="#" src={mail.img} />
              ) : (
                <span>{signature.splitLet}</span>
              )}
            </div>
            <div className="mailAddress">
              <div className="address">
                <h3>
                  {mail.name}
                  <span>
                    &lt;
                    <span style={{ padding: 0 }}>{mail.email}</span>
                    &gt;
                  </span>
                </h3>

                <span className="mailDate">{moment(mail.date).calendar()}</span>
              </div>
              {!this.props.viewer ? (
                <p>
                  to
                  <span style={{ paddingLeft: 3 }}>me</span>
                </p>
              ) : (
                ""
              )}
            </div>
          </SingleMailInfo>

          <SingleMailBody className="mailBody">
            {/* eslint-disable-next-line react/no-danger */}
            <p dangerouslySetInnerHTML={{__html: mail.body}} />
          </SingleMailBody>
          {replyArea}
        </div>
      </SingleMailContents>
    );
  }
}

const mapStateToProps = (state) => {
  const { isCompose, viewer } = state.mail;
  return {
    isCompose,
    viewer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  composeMail: () => {
    dispatch(composeMailAction());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(MailContent);
