import styled from 'styled-components';

export default styled.div`
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
        box-shadow: 0 0 0 1px ${({ theme }) => theme.palette.lightPrimary};
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

`