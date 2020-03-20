import React, { useEffect, useRef } from "react";
import { Layout } from "antd";
import EmailBoxWrapper from "./styles";
import MailOption from "../../containers/EmailBox/MailOption";
import ListMail from "../../containers/EmailBox/ListMail";
import SingleMail from "../../containers/EmailBox/SingleMail";
// import CreateMailForm from "../../containers/EmailBox/CreateMail";

export default function EmailBox() {
  const currentRef = useRef(null);
  useEffect(() => {
    currentRef.current.parentNode.style.padding='0' // Thay đổi css của class 'content'
    currentRef.current.parentNode.style.height='100%' // Thay đổi css của class 'content'
  }, []);
  return (
    <EmailBoxWrapper className="emailBoxPage" ref={currentRef}>
      <Layout className="emailLayout">
        <div className="leftWrapper">
          <MailOption />
        </div>
        <div className="middleWrapper">
          <ListMail />
        </div>
        <div className="singleMailWrapper">
          <SingleMail />
          {/* <CreateMailForm /> */}
        </div>
      </Layout>
    </EmailBoxWrapper>
  );
}
