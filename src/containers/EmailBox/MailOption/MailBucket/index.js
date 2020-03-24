/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from "react";
import { connect } from "react-redux";
// import dumpedMails from "./fakeData";
import {
  getUnreadMailAction,
  unComposeMailAction,
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
    this.props.loadUnread();
  };

  handleChangeView = (key) => {
    this.setState({
      currentKey: key,
    })
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
          {bucket.key === "inbox" ? this.props.unRead: ""}
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
  const { unRead } = state.mail;
  return {
    unRead,
  };
};

const mapDispatchToProps = dispatch => ({
  loadUnread: () => {
    dispatch(getUnreadMailAction());
  },
  changeView: () => {
    dispatch(unComposeMailAction());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(MailBucket);
