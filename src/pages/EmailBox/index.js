import React from "react";
import { Layout } from "antd";
import EmailBoxWrapper from "./styles";
import MailOption from "../../containers/EmailBox/MailOption"
// import ComposeMail from ""
// import 
export default function EmailBox(){
  return (
    <EmailBoxWrapper className="emailBoxPage">
      <Layout>
        <div className="leftWrapper">
          <MailOption />
        </div>
        <div className="middleWrapper" />
        <div className="singleMailWrapper" />
      </Layout>
    </EmailBoxWrapper>
  );
}


