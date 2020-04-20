/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from "react";
import { connect } from "react-redux";
// import dumpedMails from "./fakeData";
import {
  getReceivedMailAction,
  unComposeMailAction,
  getMailListAction,
} from "../../../../redux/mail/actions";

const buckets = [
  {
    id: 1,
    name: "Đã nhận",
    key: "inbox",
  },
  {
    id: 2,
    name: "Đã gửi",
    key: "sent",
  },
];

class MailBucket extends Component {

  state = {
    currentKey: "inbox",
  }

  componentDidMount = () => {
    this.props.loadReceived();
  };

  handleChangeView = (key) => {
    this.setState({
      currentKey: key,
    })
    if(key === 'sent') {
      const applyFilter = { limit: 50, offset: 0, orderBy: "-updatedAt", filter: {
        "sender": 2,
      }};
      this.props.getListMail(applyFilter);
    }
    if(key === 'inbox') {
      const applyFilter = { limit: 50, offset: 0, orderBy: "-updatedAt", filter: {
        "sender":{"$not":2},
      }};
      this.props.getListMail(applyFilter);
    }
    this.props.changeView();
  };

  renderSingleBucket = bucket => {
    const filterAttr = {};
    filterAttr.bucket = "Inbox";
    const selectedBucket = bucket.key === this.state.currentKey
    const activeClass = selectedBucket ? "active" : "";
    return (
      <li
        key={`bucket-${bucket.id}`}
        onClick={() => this.handleChangeView(bucket.key)}
        className={`singleBucket ${activeClass}`}
      >
        <span>{bucket.name}</span>
        <span className="mailBadge">
          {/* {unread[bucket.name] ? unread[bucket.name] : ""} */}
          {bucket.key === "inbox" ? this.props.received: ""}
        </span>
      </li>
    );
  };

  render() {
    return (
      <ul className="mailBucketList">
        {buckets.map(bucket => this.renderSingleBucket(bucket))}
      </ul>
    );
  }
}

const mapStateToProps = state => {
  const { received, sended } = state.mail;
  return {
    received,
    sended,
  };
};

const mapDispatchToProps = dispatch => ({
  loadReceived: () => {
    dispatch(getReceivedMailAction());
  },
  getListMail: (filterParams) => {
    dispatch(getMailListAction(filterParams));
  },

  changeView: () => {
    dispatch(unComposeMailAction());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(MailBucket);
