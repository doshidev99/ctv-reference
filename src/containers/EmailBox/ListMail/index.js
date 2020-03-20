import React, { Component } from 'react'
import Scrollbar from "react-smooth-scrollbar";
import MailSearchBox from './SearchMail'
import { tagColor,tags } from '../MailOption/MailTag'
import dumpedMails from "./fakeData";
import Wrapper from './styles'


export default class ListMail extends Component {
  handleChange = () => {
    
  }

  renderMailItem = (mail) => {
    // const onClick = () => {
    //   selectMail(mail.id);
    //   if (toggleListVisible) {
    //     toggleListVisible();
    //   }
    // };
    // const isSelected = selectedMail === mail.id;
    const isSelected=false
    const recpName = mail.name;
    const signature = {
      splitLet: recpName
        .match(/\b(\w)/g)
        .join('')
        .split('', 2),
    };
    const activeClass = isSelected ? 'activeMail' : '';
    const unreadClass = !mail.read ? 'unreadMail' : '';
    const tagOption = mail.tags
      // eslint-disable-next-line no-shadow
      ? tagColor[tags.findIndex(tags => tags === mail.tags)]
      : 'transparent';

    // Change later
    const rtl = "rlt"
    return (
      <div
        key={`list${mail.id}`}
        // onClick={onClick}
        className={`${activeClass} ${unreadClass} mailList`}
      >
        <span
          className="labelIndicator"
          style={
            rtl === 'rtl' ? (
              { borderRightColor: tagOption }
            ) : (
              { borderTopColor: tagOption }
            )
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
            <span className="receiveDate">{mail.date}</span>
          </div>
          <p className="subject">{mail.subject}</p>
        </div>
      </div>
    );
  }

  render() {
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
        <Scrollbar
          className="listMailScrollBar"
          continuousScrolling
          >
          <div className="listMailWrapper">
            {dumpedMails.map((mail) => this.renderMailItem(mail))}
          </div>
        </Scrollbar>
         
        
      </Wrapper>
    )
  }
}
