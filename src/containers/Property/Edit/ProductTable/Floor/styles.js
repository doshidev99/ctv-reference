import styled from "styled-components";

export default styled.div`
  margin-bottom: 10px;
  .rooms {
    display: flex;
    margin-top: 5px;

    .addNew {
      width: 120px;
      height: 80px;
    }

    .item {
      width: 120px;
      height: 80px;
      margin-right: 20px;
    }
    .roomItem {
      width: 120px;
      height: 80px;
      padding: 0;
    }

    .removeIcon {
    }
  }
  .floorName {
    display: flex;
    width: 300px;
    .ant-btn {
      margin-left: 5px;
      margin-bottom: 5px;
    }
  }
`;
