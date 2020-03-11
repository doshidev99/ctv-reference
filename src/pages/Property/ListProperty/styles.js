import styled from 'styled-components';

export default styled.div`

  .ant-layout {
    background: #F5F7FA;
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
    box-shadow: 0px 0px 5px -2px rgba(0,0,0,0.64);
    .ant-table-tbody > tr:hover > td {
      background: #E6FFF7 !important;
    }
    .ant-table-tbody > tr {
      background: ${({ theme }) => theme.background.content};
    }
  }
  .ant-table-wrapper {
    background: #F5F7FA;
    td > a {
      color: rgba(0, 0, 0, 0.65)
    }
    .ant-table-pagination {
      color: ${({ theme }) => theme.color.black};
      
      .ant-pagination-item-active, .ant-pagination-item-active a {
        color: ${({ theme }) => theme.palette.lightPrimary};
        border-color: ${({ theme }) => theme.palette.lightPrimary};
      }
    }
  }

  .propertyAction {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 5px;
    background: #F5F7FA
    .actionBox {
      margin-right: 10px;
      .ant-btn {
        background: ${({ theme }) => theme.palette.lightPrimary};
        border: none
        border-radius: 15px;
      }
    }
  }


  .filterArea {
    margin-bottom: 10px;
    width: 100%;
    height: auto;
    background-color: rgb(255, 255, 255);
    margin-bottom: 30px;
    padding: 20px;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(212, 210, 244, 0.5);
    border-image: initial;
  }
`;
