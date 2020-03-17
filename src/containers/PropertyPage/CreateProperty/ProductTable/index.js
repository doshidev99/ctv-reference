import React, { Component } from "react";
import { Button } from "antd";
import { connect } from "react-redux";
import ProductTableWrapper from "./styles";
import Floor from "./Floor";
import { addNewFloor } from "../../../../redux/property/actions";

class ProductTable extends Component {
  handleChange = () => {
    // console.log("Expand!");
  };

  render() {
    // console.log(this.props.floors);
    
    const floors = this.props.floors.map(e => (
      <Floor key={e.id} id={e.id} name={e.name} rooms={e.rooms} />
    ));
    return (
      <ProductTableWrapper>
        <div className="floors">{floors}</div>
        <div className="action">
          <Button type="primary" onClick={this.props.handleExpand}>
            Thêm tầng
          </Button>
        </div>
      </ProductTableWrapper>
    );
  }
}

const mapStateToProps = state => ({
  floors: state.property.productTable,
});

const mapDispatchToProps = dispatch => ({
  handleExpand: () => {
    dispatch(addNewFloor());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductTable);
