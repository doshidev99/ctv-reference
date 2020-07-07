import React, { Component } from 'react'
import { Button, Icon, Modal, Badge} from 'antd'
import { connect } from "react-redux";
import FloorWrapper from './styles'
import {removeOneFloorAction, openRoomFormAction, deleteOneRoomAction  } from "../../../../../redux/property/actions";

const {confirm} = Modal
class Floor extends Component {
  
  showDeleteFloorConfirm = () => {
    const {handleRemoveOneFloor, id} = this.props;
    confirm({
      title: 'Bạn có chắc chắn xóa thông tin tầng này không ?',
      content: 'Mọi thông tin sẽ không được khôi phục',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        handleRemoveOneFloor(id)
      },
    });
  }

  showDeleteRoomConfirm = (roomId) => {
    const {removeRoom, id} = this.props;
    confirm({
      title: 'Bạn có chắc chắn xóa thông tin phòng này không ?',
      content: 'Mọi thông tin sẽ không được khôi phục',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
         removeRoom(roomId, id)
      },
    });
  }

  handleAddNew = () => {
    this.props.openForm(null, this.props.id)
  }

  handleEdit = (e) => {
    this.props.openForm(e, this.props.id)
  }

  render() {

    const {name, rooms} = this.props;
    // console.log(rooms);
    
    const roomList = rooms.map(e => (
      <Badge className="item" key={e.id} count={<Button onClick={()=>this.showDeleteRoomConfirm(e.id)} className="removeIcon" icon="minus" shape="circle" size="small" type="danger" />}>
        <Button className="roomItem" onClick={() => this.handleEdit(e)}>{e.productCode}</Button>
      </Badge>
    ))
    return (
      <FloorWrapper>
        <div className="floorName">
          <label>{name}</label>
          <Button
            size="small"
            icon="minus"
            shape="round"
            onClick={this.showDeleteFloorConfirm}
          />
        </div>
        <div className="rooms">
          {roomList}
          <Button className="addNew" onClick={this.handleAddNew}><Icon type="plus" /></Button>
        </div>
          
      </FloorWrapper>
    )
  }
}


const mapStateToProps = state => ({
  floors: state.property.productTable,

});

const mapDispatchToProps = dispatch => ({
  handleRemoveOneFloor: (id) => {
    dispatch(removeOneFloorAction(id));
  },
  openForm: (roomInfo, floorId) => {
    dispatch(openRoomFormAction(roomInfo, floorId));
  },

  removeRoom: (id, floorId) => {
    dispatch(deleteOneRoomAction(id, floorId));
  },
 
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Floor);