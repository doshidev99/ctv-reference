import React, { Component } from "react";
import Scrollbar from "react-smooth-scrollbar";
import { Button } from "antd";
import MailOptionWrapper from "./styles";

const dumpedMails = [
  {
    id: 30,
    key: 30,
    name: "Friedrich Mitchell",
    cc: "Devon90@hotmail.com",
    email: "Giovanny12@hotmail.com",
    body:
      "Doloribus voluptas itaque blanditiis repudiandae. Est libero in. Id enim et vero velit enim nostrum cum aut libero. Dignissimos non et. Qui inventore ducimus debitis qui perspiciatis iure. Eligendi omnis eos et iste iusto ipsa iste dolor. Porro consequatur iste. Incidunt rerum mollitia dolore sit. Officia maxime doloremque esse eaque ad. Architecto animi at qui deserunt.",
    subject: "voluptas excepturi voluptates",
    date: "2017-06-10T22:16:42.057Z",
    bucket: "Important",
    read: false,
  },
  {
    id: 31,
    key: 31,
    name: "Friedrich Mitchell",
    cc: "Devon90@hotmail.com",
    email: "Giovanny12@hotmail.com",
    body:
      "Doloribus voluptas itaque blanditiis repudiandae. Est libero in. Id enim et vero velit enim nostrum cum aut libero. Dignissimos non et. Qui inventore ducimus debitis qui perspiciatis iure. Eligendi omnis eos et iste iusto ipsa iste dolor. Porro consequatur iste. Incidunt rerum mollitia dolore sit. Officia maxime doloremque esse eaque ad. Architecto animi at qui deserunt.",
    subject: "voluptas excepturi voluptates",
    date: "2017-06-10T22:16:42.057Z",
    bucket: "Drafts",
    read: true,
  },
  {
    id: 32,
    key: 32,
    name: "Friedrich Mitchell",
    cc: "Devon90@hotmail.com",
    email: "Giovanny12@hotmail.com",
    body:
      "Doloribus voluptas itaque blanditiis repudiandae. Est libero in. Id enim et vero velit enim nostrum cum aut libero. Dignissimos non et. Qui inventore ducimus debitis qui perspiciatis iure. Eligendi omnis eos et iste iusto ipsa iste dolor. Porro consequatur iste. Incidunt rerum mollitia dolore sit. Officia maxime doloremque esse eaque ad. Architecto animi at qui deserunt.",
    subject: "voluptas excepturi voluptates",
    date: "2017-06-10T22:16:42.057Z",
    bucket: "Important",
    read: false,
  },
  {
    id: 33,
    key: 33,
    name: "Friedrich Mitchell",
    cc: "Devon90@hotmail.com",
    email: "Giovanny12@hotmail.com",
    body:
      "Doloribus voluptas itaque blanditiis repudiandae. Est libero in. Id enim et vero velit enim nostrum cum aut libero. Dignissimos non et. Qui inventore ducimus debitis qui perspiciatis iure. Eligendi omnis eos et iste iusto ipsa iste dolor. Porro consequatur iste. Incidunt rerum mollitia dolore sit. Officia maxime doloremque esse eaque ad. Architecto animi at qui deserunt.",
    subject: "voluptas excepturi voluptates",
    date: "2017-06-10T22:16:42.057Z",
    bucket: "Inbox",
    read: false,
  },
];
const buckets = [
  "Inbox",
  "Sent",
  "Drafts",
  "Trash",
  "Important",
  "spam",
  "Starred",
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

export default class MailOption extends Component {
  handleClick = () => {};

  render() {
    console.log(this.props);
    
    const unread = getUnread(dumpedMails);
    return (
      <MailOptionWrapper>
        <div className="composeBtn">
          <Button>Soạn thư</Button>
        </div>
        <Scrollbar
          className="mailScrollBar"
          continuousScrolling
        >
          <ul className="mailBucketList">
            {buckets.map((bucket, key) => (
              <li
                key={`bucket${key}`}
                onClick={this.handleClick}
                className="singleBucket"
              >
                <span>{bucket}</span>
                <span className="mailBadge">
                  {unread[bucket] ? unread[bucket] : ""}
                </span>
              </li>
            ))}
          </ul>

          {/* {mailBuckets(allMails, filterAction, filterAttr)}
              {mailTags(allMails, filterAction, filterAttr)} */}
        </Scrollbar>
      </MailOptionWrapper>
    );
  }
}
