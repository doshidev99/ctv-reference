import React, { useEffect, useRef } from "react";
import { Layout } from "antd";
import { connect } from "react-redux";
import EmailBoxWrapper from "./styles";
import MailOption from "../../containers/EmailBox/MailOption";
import ListMail from "../../containers/EmailBox/ListMail";
import SingleMail from "../../containers/EmailBox/SingleMail";
import CreateMailForm from "../../containers/EmailBox/CreateMail";

function EmailBox(props) {
  const currentRef = useRef(null);
  useEffect(() => {
    currentRef.current.parentNode.style.padding = "0"; // Thay đổi css của class 'content'
    currentRef.current.parentNode.style.height = "100%"; // Thay đổi css của class 'content'
  }, []);
  const { isComposeLarge } = props;
  return (
    <EmailBoxWrapper className="emailBoxPage" ref={currentRef}>
      <Layout className="emailLayout">
        <div className="leftWrapper">
          <MailOption />
        </div>
        {!isComposeLarge ? (
          <div className="listMailAndSingleMail">
            <div className="middleWrapper">
              <ListMail />
            </div>
            <div className="singleMailWrapper">
              <SingleMail />
            </div>
          </div>
        ) : (
          <div className="createMailForm">
            <CreateMailForm />
          </div>
        )}
      </Layout>
    </EmailBoxWrapper>
  );
}

const mapStateToProps = state => {
  const { isComposeLarge } = state.mail;
  return {
    isComposeLarge,
  };
};

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = dispatch => ({
  // expandComposer: ()=> {
  //   dispatch(composeMailAction())
  // },
});
export default connect(mapStateToProps, mapDispatchToProps)(EmailBox);
