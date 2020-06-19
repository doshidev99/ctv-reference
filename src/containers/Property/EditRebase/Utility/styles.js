import styled from "styled-components";

export default styled.div`
  .dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
  }
  .dynamic-delete-button:hover {
    color: #777;
  }
  .dynamic-delete-button[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
  .ant-upload-list-item {
    margin-bottom: 8px;
    .ant-upload-list-item-info {
      max-width: 200px;
    }
  }
`