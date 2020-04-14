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
      color: rgb(54, 112, 212);
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
    background: ${({ theme }) => theme.background.container};
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

    .filterForm {
      display:flex;
      justify-content: space-between;

      .filterGroup {
        display:flex;
        justify-content: space-evenly;
        .cityFilter, .sortFilter {
          width: 300px;
          margin-right: 40px;
        }

        .ant-select-selection:active, .ant-select-selection:focus {
          border-color: ${({ theme }) => theme.palette.lightPrimary};
          box-shadow: 0 0 0 0.5px ${({ theme }) => theme.palette.lightPrimary};
        }
        .ant-select-selection:hover {
          border-color: ${({ theme }) => theme.palette.lightPrimary};
        }
        .ant-calendar-picker-input:hover  {
          border-color: ${({ theme }) => theme.palette.lightPrimary};
        }

      }

      .btnGroup {
        display: flex;
        justify-content: space-evenly;
        .filterBtn, .cancelFilterBtn {
          width: 75px;
          margin: 5px;
          border: none
        }
        .filterBtn {
          background: ${({ theme }) => theme.palette.lightPrimary};
          color:#ffff
        }
        .cancelFilterBtn {
          background:${({ theme }) => theme.color.gray};
          color:#ffff
        }
      }
    }


    @media (max-width: 1200px) {
      .cityFilter, .sortFilter {
        max-width: 200px;
        margin-right: 10px;
      }
    }
  }
`;
