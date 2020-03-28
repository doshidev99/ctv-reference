import styled from "styled-components";

export default styled.div`
  display:flex;
  margin: 15px 0;

  .title {
    margin-right: 40px
    font-size: 18px;
    font-weight: 500;
  }
  .ant-upload-list-item-name {
    overflow: hidden !important;
    text-overflow: ellipsis;
    width: 200px;
  }
`;
