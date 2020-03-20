import React, { Component } from "react";
import dumpedMails from "./fakeData";

const buckets = [
  {
    id: 1,
    name: "Inbox",
  },
  {
    id: 2,
    name: "Sent",
  },
  {
    id: 3,
    name: "Drafts",
  },
  {
    id: 4,
    name: "Trash",
  },
  {
    id: 5,
    name: "Important",
  },
  {
    id: 6,
    name: "spam",
  },
  {
    id: 7,
    name: "Starred",
  },
];
const getUnread = mails => {
  const unread = {};
  mails.forEach(mail => {
    if (!unread[mail.bucket]) {
      unread[mail.bucket] = 0;
    }
    if (!mail.read) {
      unread[mail.bucket] += 1;
    }
  });
  return unread;
};
export default class MailBucket extends Component {
  handleClick = () => {
  };

  renderSingleBucket = (bucket) => {
    const filterAttr = {};
    filterAttr.bucket = "Inbox"
    const unread = getUnread(dumpedMails);
    const selectedBucket = bucket === filterAttr.bucket;
    const activeClass = selectedBucket ? 'active' : '';
    return (
      <li
        key={`bucket-${bucket.id}`}
      // onClick={this.handleClick}
        className={`singleBucket ${activeClass}`}
    >
        <span>{bucket.name}</span>
        <span className="mailBadge">
          {unread[bucket.name] ? unread[bucket.name] : ""}
        </span>
      </li>
    )
  }

  render() {
    return (
      <ul className="mailBucketList">
        {buckets.map((bucket) => this.renderSingleBucket(bucket))}
      </ul>
    );
  }
}
