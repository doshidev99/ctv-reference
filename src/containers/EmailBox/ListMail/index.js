/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from "react";
import Scrollbar from "react-smooth-scrollbar";
import { connect } from "react-redux";
import moment from "moment";
import { message, Spin } from "antd";
import MailSearchBox from "./SearchMail";
import { tagColor, tags } from "../MailOption/MailTag";
import Wrapper from "./styles";
import {
  getMailListAction,
  getOneMailAction,
} from "../../../redux/mail/actions";

class ListMail extends Component {
  state = {
    currentMailId: null,
  };

  componentDidMount() {
    const orderBy="-updatedAt"
    const filter = `{"deletedAt":null}`
    this.props.getListMail(10, 0,filter,orderBy);
  }

  handleChange = () => {};

  onClick = id => {

    this.props.getOneMail(id);
    if (!this.props.getOneMaiFailure) {
      this.setState({
        currentMailId: id,
      });
    } else {
      message.error("Có lỗi xảy ra");
      this.setState({
        currentMailId: null,
      });
    }
  };

  renderMailItem = mail => {
    const isSelected = this.state.currentMailId === mail.id;
    const recpName = mail.name;
    const signature = {
      splitLet: recpName
        .match(/\b(\w)/g)
        .join("")
        .split("", 2),
    };
    const activeClass = isSelected ? "activeMail" : "";

    const unreadClass = !mail.isRead ? "unreadMail" : "";
    const tagOption = mail.tags
      ? // eslint-disable-next-line no-shadow
        tagColor[tags.findIndex(tags => tags === mail.tags)]
      : "transparent";

    // Change later
    const rtl = "rlt";
    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      <div
        key={`list ${mail.id}`}
        onClick={() => this.onClick(mail.id)}
        className={`${activeClass} ${unreadClass} mailList`}
      >
        <span
          className="labelIndicator"
          style={
            rtl === "rtl"
              ? { borderRightColor: tagOption }
              : { borderTopColor: tagOption }
          }
        />
        <div className="recipentsImg">
          {mail.img ? (
            <img alt="#" src={mail.img} />
          ) : (
            <span>{signature.splitLet}</span>
          )}
        </div>

        <div className="mailInfo">
          <div className="infoHead">
            <p className="recipents">{mail.name}</p>
            <span className="receiveDate">{moment(mail.date).fromNow()}</span>
          </div>
          <p className="subject">{mail.subject}</p>
        </div>
      </div>
    );
  };

  render() {
    const { mails, listMailLoading } = this.props;
    const content = listMailLoading ? (
      <div className="loadingList">
        <Spin />
      </div>
    ) : (
      <Scrollbar className="listMailScrollBar" continuousScrolling>
        <div className="listMailWrapper">
          {mails.length > 0 ? (
            mails.map(mail => this.renderMailItem(mail))
          ) : ''}
        </div>
      </Scrollbar>
    );
    return (
      <Wrapper>
        <div className="bucketLabel">
          {/* <h3>{filterAttr.bucket}</h3> */}
          <h3>Inbox</h3>
          {/* <PaginationControl /> */}
        </div>
        <div className="searchMailWrapper">
          <MailSearchBox />
        </div>
        {content}
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  const {
    mails,
    offset, // offset = (page - 1) * limit;
    limit,
    total,
    loading,
    listMailLoading,
    getOneMaiFailure,
    listMailFailure,
  } = state.mail;
  return {
    mails,
    offset, // offset = (page - 1) * limit;
    limit,
    total,
    loading,
    listMailLoading,
    getOneMaiFailure,
    listMailFailure,
  };
};

const mapDispatchToProps = dispatch => ({
  getListMail: (limit, offset, filter, orderBy) => {
    dispatch(getMailListAction(limit, offset, filter, orderBy));
  },

  getOneMail: id => {
    dispatch(getOneMailAction(id));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ListMail);
