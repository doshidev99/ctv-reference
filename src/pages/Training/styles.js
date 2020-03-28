import styled from "styled-components";

export default styled.div`
  .ant-layout {
    background: #f5f7fa;
  }
  .option {
    display: flex;
    .btnOption {
      cursor: pointer;
      margin:  0 10px;
    }
  }
  .ant-table-thead > tr > th {
    background: ${({ theme }) => theme.palette.lightPrimary};
    color: #ffff;
  }
  .ant-table-thead > tr:first-child > th:first-child {
    border-top-left-radius: 0px;
  }
  .ant-table-thead > tr:first-child > th:last-child {
    border-top-right-radius: 0px;
  }
  .ant-table-content {
    .ant-table-tbody > tr:hover > td {
      background: #e6fff7 !important;
    }
    .ant-table-tbody > tr {
      background: ${({ theme }) => theme.background.content};
    }
  }
  .ant-table-wrapper {
    background: #f5f7fa;
    td > a {
      color: rgb(38, 38, 38);
    }
    .ant-table-pagination {
      color: ${({ theme }) => theme.color.black};

      .ant-pagination-item-active,
      .ant-pagination-item-active a {
        color: ${({ theme }) => theme.palette.lightPrimary};
        border-color: ${({ theme }) => theme.palette.lightPrimary};
      }
    }
  }
`;
