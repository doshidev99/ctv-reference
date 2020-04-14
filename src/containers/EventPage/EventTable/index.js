import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Table, Pagination, Row, Col, message, Popconfirm, Switch } from "antd";
import { getListEventAction, updateOneEventAction } from "../../../redux/event/actions";
import EventTableWrapper from "./styles";

class EventTable extends Component {
  columnHeaders = [
    {
      title: "Thời gian",
      dataIndex: "beganAt",
      key: "beganAt",
      width: "110px",
    },
    {
      title: "Tên sự kiện",
      key: "name",
      dataIndex: "name",
      render: (e, record) => (
        <Link to={`/events/${record.id}`}>{record.name}</Link>
      ),
    },
    {
      title: "Địa điểm",
      dataIndex: "locationDescription",
      key: "locationDescription",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: "105px",
      render: (e, record) => {
        return (
          <div>
            <Popconfirm
              title="Lưu thay đổi?"
              onConfirm={() => this.handleSaveSwitch(!e, record)}
              onCancel={() => this.handleSaveSwitch(e, record)}
              okText="Yes"
              cancelText="No">
              <Switch
                checked={record.status}
                />

            </Popconfirm>
          </div>
        )
      },
    },
  ];

  orderBy="beganAt";

  fields=["id", "name","beganAt","locationDescription"]

  componentDidMount() {
    this.props.getListEvent(10, 0, null, this.orderBy, JSON.stringify(this.fields));
  }

  handleSaveSwitch = (e, record) => {
    if(e !== record.status) {
      const payload = {...record};
      delete payload.key;
      payload.status = e
      this.props.updateEvent(payload.id, payload)
    }
  };

  onChangePage = (page, limit) => {
    const offset = (page - 1) * limit;
    this.props.getListEvent(limit, offset, null, this.orderBy, JSON.stringify(this.fields))
  };

  render() {
    const {
      events,
      offset, // offset = (page - 1) * limit;
      limit,
      total,
      loading,
      listEventFailure,
    } = this.props;
    const page = offset / limit + 1;
    if (listEventFailure) {
      message.error("Lỗi khi tải thông tin");
      return (
        <EventTableWrapper>
          <Table
            columns={this.columnHeaders}
            dataSource={[]}
            pagination={false}
          />
          <Row type="flex" justify="center">
            <Col xs={24} sm={20} md={12} className="pagination">
              <Pagination defaultCurrent={1} />
            </Col>
          </Row>
        </EventTableWrapper>
      );
    }
    return (
      <EventTableWrapper>
        <Table
          columns={this.columnHeaders}
          dataSource={events}
          loading={loading}
          pagination={false}
        />
        <Row type="flex" justify="center">
          <Col xs={24} sm={20} md={12} className="pagination">
            <Pagination
              showTotal={(totalItem, range) =>
                `${range[0]}-${range[1]} of ${totalItem} items`}
              onChange={this.onChangePage}
              defaultCurrent={1}
              current={page}
              total={total}
              pageSize={limit}
            />
          </Col>
        </Row>
      </EventTableWrapper>
    );
  }
}
EventTable.propTypes = {
  events: PropTypes.array,
  offset: PropTypes.number, // offset = (page - 1) * limit;
  limit: PropTypes.number,
  total: PropTypes.number,
  loading: PropTypes.bool,
};

const mapStateToProps = state => {
  const {
    events,
    offset, // offset = (page - 1) * limit;
    limit,
    total,
    loading,
    listEventFailure,
  } = state.event;
  return {
    events,
    offset, // offset = (page - 1) * limit;
    limit,
    total,
    loading,
    listEventFailure,
  };
};
const mapDispatchToProps = dispatch => ({
  getListEvent: (limit, offset, filter,  orderBy, fields) => {
    dispatch(getListEventAction(limit, offset, filter, orderBy, fields));
  },
  updateEvent: (id, payload) => {
    dispatch(updateOneEventAction(id, payload));
  },

});
export default connect(mapStateToProps, mapDispatchToProps)(EventTable);
