import styled from "styled-components";

export default styled.div`
  margin: 15px 0;

  .title {
    margin-right: 40px
    font-size: 18px;
    font-weight: 500;
  }
  .ant-upload-list {
    width: 200px;
    .ant-upload-list-item {
      height: 120px;
      .ant-upload-list-item-info {
        .ant-upload-list-item-thumbnail {
          width: auto;
          height: auto;
          img {
            width: auto;
            height: 100px;
          }
        }
        .ant-upload-list-item-card-actions {
          right: -7px;
          top: 50px;
        }
      }
    }
  }
  .upload-list-inline .ant-upload-list-item {
    float: left;
    width: 200px;
    margin-right: 8px;
  }
  .upload-list-inline .ant-upload-animate-enter {
    animation-name: uploadAnimateInlineIn;
  }
  .upload-list-inline .ant-upload-animate-leave {
    animation-name: uploadAnimateInlineOut;
  }
  .buttonUpload {
    border: 1px dashed transparent;
  }
  .ant-upload-list-item-card-actions .anticon:hover {
    color: red;
  }
`;
