/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-classes-per-file */
import React, { Component } from "react";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Table,
  Popconfirm,
  Form,
  message,
  Switch,
  Row,
  Col,
  Pagination,
  Button,
  Modal,
  Input,
} from "antd";

import {
  EditableCell,
  EditableContext,
} from "../../../components/RestLayout/EditableLayout";
import {
  getListCityAction,
  updateOneCityAction,
  createOneCityAction,
} from "../../../redux/city/actions";
import Wrapper from "./styles";

const { Item } = Form;
class CityTable extends Component {
  state = {
    editingKey: "",
    visible: false,
  };

  columnHeaders = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      width: 100,
      editable: true,
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      width: "15%",
      editable: true,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: "20%",
      editable: true,
      render: (text, record) => {
        const editable = this.isEditing(record);
        return editable ? "" : <Switch checked={record.status} disabled />;
      },
    },
    {
      title: "Tùy chọn",
      width: "20%",
      dataIndex: "operation",
      render: (text, record) => {
        const { editingKey } = this.state;
        const editable = this.isEditing(record);
        return editable ? (
          <span>
            <EditableContext.Consumer>
              {form => (
                <a
                  onClick={() => this.save(form, record.id)}
                  style={{ marginRight: 8 }}
                >
                  Save
                </a>
              )}
            </EditableContext.Consumer>
            <Popconfirm
              title="Sure to cancel?"
              onConfirm={() => this.cancel(record.id)}
            >
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <a disabled={editingKey !== ""} onClick={() => this.edit(record.id)}>
            Edit
          </a>
        );
      },
    },
  ];

  orderBy = "id";

  fields = ["id", "name", "isVisible", "code"];

  componentDidMount() {
    try {
      this.props.getListCity(
        5,
        0,
        null,
        this.orderBy,
        JSON.stringify(this.fields),
      );
    } catch (error) {
      message.error("Có lỗi xảy ra")
    }
  }

  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: "" });
  };

  save = async (form, key) => {
    try {
      const row = await form.validateFields();
      const {
        offset, // offset = (page - 1) * limit;
        limit,
      } = this.props;
      await this.props.updateOneCity(key, row);
      await this.props.getListCity(
        limit,
        offset,
        null,
        this.orderBy,
        JSON.stringify(this.fields),
      );
      this.setState({ editingKey: "" });
    } catch (error) {
      message.error("Có lỗi xảy ra");
    }
  };

  edit = key => {
    this.setState({ editingKey: key });
  };

  onChangePage = (page, limit) => {
    const offset = (page - 1) * limit;
    this.props.getListCity(
      limit,
      offset,
      null,
      this.orderBy,
      JSON.stringify(this.fields),
    );
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = async () => {
   const {validateFields} = this.props.form;
   try {
     const payload = await validateFields();
     await this.props.createOneCity(payload)
     this.setState({
      visible: false,
    });
   } catch (error) {
     message.error("Có lỗi xảy ra")
     this.setState({
      visible: false,
    });
   }
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const {
      cities,
      offset, // offset = (page - 1) * limit;
      limit,
      total,
      loading,
      listCityFailure,
    } = this.props;
    const { getFieldDecorator } = this.props.form;
    const page = offset / limit + 1;

    const components = {
      body: {
        cell: EditableCell,
      },
    };

    const columnHeaders = this.columnHeaders.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === "status" ? "switch" : "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });
    if (listCityFailure) {
      return (
        <Wrapper>
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
        </Wrapper>
      );
    }
    return (
      <Wrapper>
        <EditableContext.Provider value={this.props.form}>
          <Row type="flex" justify="end">
            <Col xs={6} className="createButton">
              <Button type="primary" icon="plus" onClick={this.showModal}>
                Thêm
              </Button>
            </Col>
            <Col xs={18} className="pagination">
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
          <Table
            columns={columnHeaders}
            dataSource={cities}
            components={components}
            pagination={false}
            loading={loading}
          />
          <Modal
            title="Basic Modal"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Form className="form-view">
              <Item>
                <div
                  className="title"
                  style={{
                    lineHeight: "initial",
                  }}
                >
                  <span>Tên thành phố</span>
                </div>
                {getFieldDecorator("name", {
                  rules: [
                    {
                      required: true,
                      message: "Vui lòng điền tên thành phố",
                    },
                  ],
                })(<Input />)}
              </Item>
              <Item>
                <div
                  className="title"
                  style={{
                    lineHeight: "initial",
                  }}
                >
                  <span>Mã thành phố</span>
                </div>
                {getFieldDecorator("code", {
                  rules: [
                    {
                      required: true,
                      message: "Vui lòng điền mã thành phố",
                    },
                  ],
                })(<Input />)}
              </Item>
              <Item>
                <div
                  className="title"
                  style={{
                    lineHeight: "initial",
                  }}
                >
                  <span>Trạng thái</span>
                </div>
                {getFieldDecorator("isVisible", {
                  valuePropName: "checked",
                  initialValue:true,
                })(<Switch  />)}
              </Item>
              
            </Form>
          </Modal>
        </EditableContext.Provider>
      </Wrapper>
    );
  }
}

CityTable.propTypes = {
  cities: PropTypes.array,
  offset: PropTypes.number, // offset = (page - 1) * limit;
  limit: PropTypes.number,
  total: PropTypes.number,
  loading: PropTypes.bool,
};

const mapStateToProps = state => {
  const {
    cities,
    offset, // offset = (page - 1) * limit;
    limit,
    total,
    loading,
    listCityFailure,
  } = state.city;
  return {
    cities,
    offset, // offset = (page - 1) * limit;
    limit,
    total,
    loading,
    listCityFailure,
  };
};
const mapDispatchToProps = dispatch => ({
  getListCity: (limit, offset, filter, orderBy, fields) => {
    dispatch(getListCityAction(limit, offset, filter, orderBy, fields));
  },

  updateOneCity: (id, payload) => {
    dispatch(updateOneCityAction(id, payload));
  },
  createOneCity: (payload) => {
    dispatch(createOneCityAction(payload))
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create()(CityTable));
