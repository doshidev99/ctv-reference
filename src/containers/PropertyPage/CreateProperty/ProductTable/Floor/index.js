import React, { Component } from 'react'
import { Button, Icon} from 'antd'
import FloorWrapper from './styles'

export default class Floor extends Component {
  handleClick = () =>{
    console.log("Clicked");
    
  }

  render() {
    return (
      <FloorWrapper>
        <div className="floorName">
          <span>Tầng 1</span>
        </div>
        <div className="rooms">
          <Button className="roomItem">A101</Button>
          <Button className="roomItem">A101</Button>
          <Button className="roomItem">A101</Button>
          <Button className="roomItem"><Icon type="plus" /></Button>
        </div>
      </FloorWrapper>
    )
  }
}
