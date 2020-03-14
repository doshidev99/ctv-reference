import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Table, Icon, Tag } from "antd";
import { getListPropertyAction } from "../../../redux/property/actions";


const columns = [
  {
    title: "Tên dự án",
    dataIndex: "name",
    key: "name",
    width: 500,
    render: text => <Link to={text}>{text}</Link>,
  },
  {
    title: "Tỉnh thành",
    dataIndex: "city",
    key: "city",
  },
  {
    title: "Ngày đăng",
    dataIndex: "date",
    key: "date",
  },
  {
    title: 'Trạng thái',
    key: 'status',
    dataIndex: 'status',
    render: tags => (
      <span>
        {tags.map(tag => {
          let color = tag.length > 5 ? "geekblue" : "green";
          switch (tag.key) {
            case "done":
              color = "green";
              break;
            case "terminated":
              color ="volcano";
              break;
            case "postpond":
              color ="gold";
              break;
            default:
              color ="geekblue";
              break;
          }
          return (
            <Tag color={color} key={tag}>
              {tag.text.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
  {
    title: "Tùy chọn",
    key: "option",
    render:  () => (
      <div className="option">
        <span className="btnOption"><Icon type="edit" /></span>
        <span className="btnOption"><Icon type="delete" /></span>
      </div>
    ),
  },
];



class PropertyTable extends Component {
  componentDidMount() {
    this.props.getListProperty();
  }

  render() {
    return (
      <div>
        <Table columns={columns} dataSource={this.props.data} />
      </div>
    )
  }
}
PropertyTable.propTypes = {
  data: PropTypes.array,
};



const mapStateToProps = state => ({
  data: state.property.properties,
})

const mapDispatchToProps = dispatch => ({
  getListProperty: () => {
    dispatch(getListPropertyAction())
  },
})
export default connect(mapStateToProps, mapDispatchToProps)(PropertyTable)