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
  retrieveList,
  createRecord,
  editRecord,
} from "../../../redux/rest/actions";
import {
  getLoading,
  getTotalResources,
  getFilters,
  getListResourceData,
} from "../../../redux/rest/selectors";

import Wrapper from "./styles";

const { Item } = Form;
class DiscountTable extends Component {
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
      title: "Hiển thị",
      dataIndex: "isVisible",
      key: "isVisible",
      width: "20%",
      inputType: "switch",
      editable: true,
      render: (text, record) => {
        const editable = this.isEditing(record);
        return editable ? "" : <Switch checked={record.isVisible} disabled />;
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
              {(form) => (
                <Popconfirm
                  title="Sure to Save?"
                  onConfirm={() => this.save(form, record.id)}
                  style={{ marginRight: 8 }}
                >
                  <a>Save </a>
                </Popconfirm>
              )}
            </EditableContext.Consumer>
            {" "}
            <a onClick={() => this.cancel(record.id)}>Cancel</a>
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

  constructor(props) {
    super(props);
    const initialFilter = { limit: 5, skip: 0, order: "id", filter: {} };
    if (!this.props.discountGroup) {
      this.props.retrieveData(
        "discount-groups",
        initialFilter || { limit: 20, skip: 0, filter: {} },
        true,
      );
    }
  }

  isEditing = (record) => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: "" });
  };

  save = async (form, key) => {
    try {
      const row = await form.validateFields();
      const {
        skip, // offset = (page - 1) * limit;
        limit,
      } = this.props;
      await this.props.updateRecord("discount-groups", key, row);
      // await this.props.updateOneDiscount(key, row);
      await this.props.retrieveData("discount-groups", { limit, skip }, true);
      this.setState({ editingKey: "" });
    } catch (error) {
      message.error("Có lỗi xảy ra");
    }
  };

  edit = (key) => {
    this.setState({ editingKey: key });
  };

  onChangePage = (page, limit) => {
    const skip = (page - 1) * limit;
    this.props.retrieveData(
      "discount-groups",
      {
        limit,
        skip,
      },
      true,
    );
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = async () => {
    const { validateFields } = this.props.form;
    try {
      const payload = await validateFields();
      await this.props.createRecord("discount-groups", payload);
      this.setState({
        visible: false,
      });
    } catch (error) {
      message.error("Có lỗi xảy ra");
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
      discountGroups,
      skip, // offset = (page - 1) * limit;
      limit,
      total,
      loading,
    } = this.props;
    const { getFieldDecorator } = this.props.form;
    let page;
    if (discountGroups) {
      page = skip / limit + 1;
    }
    const components = {
      body: {
        cell: EditableCell,
      },
    };

    const columnHeaders = this.columnHeaders.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record) => ({
          record,
          inputType:
            col.dataIndex === ("isVisible" || "status") ? "switch" : "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

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
                current={page || 1}
                total={total || 0}
                pageSize={limit || 0}
              />
            </Col>
          </Row>
          <Table
            columns={columnHeaders}
            dataSource={
              discountGroups && discountGroups.map((e) => ({ ...e, key: e.id }))
            }
            components={components}
            pagination={false}
            loading={loading}
          />
          <Modal
            title="Tạo mới"
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
                  <span>Tên nhóm chiết khấu</span>
                </div>
                {getFieldDecorator("name", {
                  rules: [
                    {
                      required: true,
                      message: "Vui lòng điền tên nhóm chiết khấu",
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
                  initialValue: true,
                })(<Switch />)}
              </Item>
            </Form>
          </Modal>
        </EditableContext.Provider>
      </Wrapper>
    );
  }
}

DiscountTable.propTypes = {
  skip: PropTypes.number, // offset = (page - 1) * limit;
  limit: PropTypes.number,
  total: PropTypes.number,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    discountGroups: getListResourceData(state, "discount-groups"),
    total: getTotalResources(state, "discount-groups"),
    ...getFilters(state, "discount-groups"),

    loading: getLoading(state, "discount-groups"),
  };
};
const mapDispatchToProps = (dispatch, props) => ({
  retrieveData: (resource, filter, isRefresh) => {
    return dispatch(
      retrieveList(
        resource,
        {
          ...props.initialFilter,
          ...filter,
        },
        isRefresh,
      ),
    );
  },
  createRecord: (resource, data) => {
    dispatch(createRecord(resource, data));
  },

  updateRecord: (resource, id, data) => {
    dispatch(editRecord(resource, id, data, true));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create()(DiscountTable));
