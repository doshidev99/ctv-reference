import styled from 'styled-components';

export default styled.div`
  .ant-row {
    width: 100%;
  }
  .locationLabel {
    font-size: 18px;
    font-weight: 500;
  }
  .locationDescription {
    .ql-container{
      height: 270px;
    }
  }

  .locationMap {
    width: 100%;
    .leaflet-container {
      width: 100%;
      height: 362px;
    }
  }
`