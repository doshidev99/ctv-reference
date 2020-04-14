import styled from "styled-components";

export default styled.div `
  margin: 20px 0;

  .title {
    width: 100%
    font-size: 18px;
    font-weight: 500;
  }
  .ant-upload{
    width: 100px;
    heigh: 32px;
  }
  .upload-list-inline .ant-upload-list-item {
    float: left;
    width: 100px;
    margin-right: 10px;
  }
  .upload-list-inline .ant-upload-animate-enter {
    animation-name: uploadAnimateInlineIn;
  }
  .upload-list-inline .ant-upload-animate-leave {
    animation-name: uploadAnimateInlineOut;
  }
  .ant-upload-list-item-card-actions .anticon{
    color: red
  }
`;
