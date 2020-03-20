import React, { Component } from "react";
// import { Icon, Button } from "antd";
import {
  SingleMailContents,
  SingleMailHeader,
  SingleMailInfo,
  SingleMailBody,
  SingleMailReply,
} from "./styles";
import MailComposer from "./MailComposer";

export default class MailContent extends Component {
  handleClick = () => {
    // console.log("OK");
  };

  render() {
    const { mail } = this.props;
    const recpName = mail.name;
    const signature = {
      splitLet: recpName
        .match(/\b(\w)/g)
        .join("")
        .split("", 2),
    };
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
                    <span style={{padding: 0}}>{mail.email}</span>
                    &gt;
                  </span>
                </h3>
                <span className="mailDate">{mail.date}</span>
              </div>
              <p>
                to 
                <span style={{paddingLeft: 3}}>me</span>
              </p>
            </div>
          </SingleMailInfo>

          <SingleMailBody className="mailBody">
            <p>{mail.body}</p>
          </SingleMailBody>

          {/* <SingleMailReply className="replyMail">
            <div
              // onClick={this.handleClick}
              className="replyMailBtn"
            >
              Click here to 
              <span style={{paddingLeft: 3}}>Reply</span>
            </div>
          </SingleMailReply> */}
          <SingleMailReply className="replyMail">
            <MailComposer />
          </SingleMailReply>
        </div>
      </SingleMailContents>
    );
  }
}
