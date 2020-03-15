import React, { Component } from 'react'
import { Button} from 'antd'
import ProductTableWrapper from './styles'
import Floor from './Floor'

export default class ProductTable extends Component {
  handleExpand = () => {
    console.log("Expand!");
    
  }

  render() {
    const floors = [];
    for (let i = 0; i < 4; i+=1) {
      floors.push(<Floor />)
    }
    return (
      <ProductTableWrapper>
        <div className="floors">
          {floors}
        </div>
        <div className="action">
          <Button type="primary">Thêm tầng</Button>
        </div>
      </ProductTableWrapper>
    )
  }
}
