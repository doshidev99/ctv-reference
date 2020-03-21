import React, { Component } from 'react'
import dumpedMails from './fakeData'

const tags = [
  {
    id: 1,
    name: "Friend",
  },
  {
    id: 2,
    name: "Family",
  },
  {
    id: 3,
    name: "Colleague",
  },
  {
    id: 4,
    name: "Teachers",
  },
  {
    id: 5,
    name: "Students",
  },
  {
    id: 6,
    name: "ClassMates",
  },
];
const tagColor = [
  '#CD3131',
  '#74B49B',
  '#0962EA',
  '#141829',
  '#FFCD38',
  '#61105E',
];



const  gettags = (mails, filterAttr) => {
  // eslint-disable-next-line no-shadow
  const tags = {};
  mails.forEach(mail => {
    if (mail.tags && mail.bucket === filterAttr.bucket) {
      mail.tags.split(' ').forEach(tag => {tags[tag] = 1});
    }
  });
  return tags;
}
export default class MailTag extends Component {
  handleClick = () => {};

  renderSingleTag = (tag) => {
    // const onClick = () => {
    //   filterAction({ tag });
    //   if (onDrawerClose) {
    //     onDrawerClose();
    //   }
    // };
    // const selectedTag = tag === filterAttr.tag;
    const selectedTag = undefined;
    const activeClass = selectedTag ? 'active' : '';
    const background = tagColor[tags.findIndex(tagItem => tagItem.id === tag.id)];
    return (
      <li
        key={`tag-${tag.id}`}
        // onClick={this.handleClick}
        className={`mailTag ${activeClass}`}
      >
        <span className="labelIndicatorColor" style={{ background }} />
        <span>{tag.name}</span>
      </li>
    );
  };

  render()
   {
    const Tags = gettags(dumpedMails, "School");
   
    return (
      <ul className="mailTagList">
        <p className="sectionLabel">Label</p>
        {Object.keys(Tags).map((tag) => this.renderSingleTag(tag))}
      </ul>
    )
  }
}

export { tags, tagColor };