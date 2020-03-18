import styled from 'styled-components';

export default styled.div`
  display:flex;

  .ant-row {
    width: 100%;
  }
  .locationDescription {
    .ql-container{
      height: 200px;
    }
    width: 95%;
    margin-right: 20px
    
    .locationLabel {
      font-size: 18px;
      font-weight: 500;
    }
  }

  .locationMap {
    width: 100%;
    .leaflet-container {
      width: 100%;
      height: 300px;
      margin-top: 30px;
    }
  }
`