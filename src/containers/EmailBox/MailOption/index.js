import React, { Component } from "react";
import Scrollbar from "react-smooth-scrollbar";
import { Button } from "antd";
import { connect } from 'react-redux'
import MailOptionWrapper from "./styles";
import MailBucket from './MailBucket';
// import MailTag from './MailTag';
import { composeLargeMailAction } from "../../../redux/mail/actions";



class MailOption extends Component {

  
  handleExpandComposer = () => {
    this.props.expandComposer()
  };

  render(){
  
    return (
      // eslint-disable-next-line no-return-assign
      <MailOptionWrapper>
        <div className="composeBtn">
          <Button onClick={this.handleExpandComposer}>Soạn thư</Button>
        </div>
        <Scrollbar
          className="mailScrollBar"
          continuousScrolling
        >
          <MailBucket />
          {/* <MailTag /> */}
        </Scrollbar>
      </MailOptionWrapper>
    );
  }
}


// eslint-disable-next-line no-unused-vars
const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => ({
  expandComposer: ()=> {
    dispatch(composeLargeMailAction())
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MailOption);


