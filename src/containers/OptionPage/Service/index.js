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
  Row,
  Col,
  Icon,
  Pagination,
  Button,
  Modal,
  Input,
} from "antd";
import {
  getListServiceAction,
  updateOneServiceAction,
  createOneServiceAction,
  getOneServiceAction,
  deleteOneAction,
} from "../../../redux/service/actions";
import Wrapper, { EditorWrapper } from "./styles";
import Editor from "../../../components/common/Editor/index";

const { Item } = Form;
class ServiceTable extends Component {
  state = {
    editingKey: "",
    visible: false,
    editVisible: false,
  };

  columnHeaders = [
    {
      title: "Tên dịch vụ",
      dataIndex: "name",
      key: "name",
      width: 100,
      editable: true,
    },
    {
      title: "Tùy chọn",
      width: "20%",
      dataIndex: "operation",
      render: (text, record) => (
        <div className="option">
          <span className="btnOption">
            <Icon type="edit" onClick={() => this.showEditModal(record.id)} />
          </span>
          <span className="btnOption">
            <Popconfirm
              title="Xóa dịch vụ?"
              onConfirm={() => this.handleDelete(record)}
              okText="Yes"
              cancelText="No"
            >
              <Icon type="delete" />
            </Popconfirm>
          </span>
        </div>
      ),
    },
  ];

  orderBy = "-updatedAt";

  fields = ["id", "name"];

  currentPage = 1;

  componentDidMount() {
    try {
      this.props.getListService(
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

  handleEditOk = async (id) => {
    const { validateFields } = this.props.form;
    try {
      const payload = await validateFields();
      await this.props.updateOneService(id, payload);
      const limit = this.props.limit || 5;
      const offset = (this.currentPage - 1) * limit;
      this.props.getListService(
        limit,
        offset,
        null,
        this.orderBy,
        JSON.stringify(this.fields),
      );
      this.setState({
        visible: false,
        editVisible: false,
        loading: true,
      });
    } catch (error) {
      message.error("Có lỗi xảy ra");
      this.setState({
        visible: false,
        editVisible: false,
      });
    }
  };

  onChangePage = (page, limit) => {
    const offset = (page - 1) * limit;
    this.props.getListService(
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

  showEditModal = async id => {
    await this.props.getOneService(id);
    this.setState({
      editVisible: true,
    });
  };

  handleOk = async () => {
   const {validateFields} = this.props.form;
   try {
      const payload = await validateFields();
      await this.props.createOneService(payload)
      const limit = this.props.limit || 5;
      const offset = (this.currentPage - 1) * limit;
      this.props.getListService(
        limit,
        offset,
        null,
        this.orderBy,
        JSON.stringify(this.fields),
      );
      this.setState({
        visible: false,
        loading: true,
      });
   } catch (error) {
     message.error("Có lỗi xảy ra");
     this.setState({
      visible: false,
      loading: false,
    });
   }
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      editVisible: false,
    });
  };

  handleDelete = async (e) => {
    try {
      await this.props.deleteOne(e.key);
      const limit = this.props.limit || 5;
      const offset = (this.currentPage - 1) * limit;
      this.props.getListService(
        limit,
        offset,
        null,
        this.orderBy,
        JSON.stringify(this.fields),
      );
    } catch (error) {
      message.error("Có lỗi xảy ra");
      this.setState({
        loading: false,
      });
    }
    
  };

  render() {
    const {
      services,
      offset, // offset = (page - 1) * limit;
      limit,
      total,
      loading,
      listServiceFailure,
      currentService,
    } = this.props;
    const { getFieldDecorator } = this.props.form;
    const page = offset / limit + 1;
    this.currentPage = page;

    if (listServiceFailure) {
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
          columns={this.columnHeaders}
          dataSource={services}
          pagination={false}
          loading={loading}
        />
        <Modal
          title="Thêm dịch vụ"
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
                <span>Tên dịch vụ</span>
              </div>
              {getFieldDecorator("name", {
                rules: [
                  {
                    required: true,
                    message: "Vui lòng điền tên dịch vụ",
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
                <span>Mô tả</span>
              </div>
              <EditorWrapper>
                {getFieldDecorator("description", {
                  rules: [
                    {
                      required: true,
                      message: "Vui lòng nhập thông tin mô tả",
                    },
                  ],
                })(<Editor />)}
              </EditorWrapper>
              ,
            </Item>
          </Form>
        </Modal>
        {/* --------------------------- */}
        <Modal
          title="Sửa dịch vụ"
          visible={this.state.editVisible}
          onOk={() => this.handleEditOk(currentService.id)}
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
                <span>Tên dịch vụ</span>
              </div>
              {getFieldDecorator("name", {
                initialValue: currentService.name,
                rules: [
                  {
                    required: true,
                    message: "Vui lòng điền tên dịch vụ",
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
                <span>Mô tả</span>
              </div>
              <EditorWrapper>
                {getFieldDecorator("description", {
                  rules: [
                    {
                      required: true,
                      message: "Vui lòng nhập thông tin mô tả",
                    },
                  ],
                })(<Editor />)}
              </EditorWrapper>
              ,
            </Item>
          </Form>
        </Modal>
      </Wrapper>
    );
  }
}

ServiceTable.propTypes = {
  services: PropTypes.array,
  offset: PropTypes.number, // offset = (page - 1) * limit;
  limit: PropTypes.number,
  total: PropTypes.number,
  loading: PropTypes.bool,
};

const mapStateToProps = state => {
  const {
    services,
    offset, // offset = (page - 1) * limit;
    limit,
    total,
    loading,
    listServiceFailure,
    currentService,
  } = state.service;
  return {
    services,
    offset, // offset = (page - 1) * limit;
    limit,
    total,
    loading,
    listServiceFailure,
    currentService,
  };
};
const mapDispatchToProps = dispatch => ({
  getListService: (limit, offset, filter, orderBy, fields) => {
    dispatch(getListServiceAction(limit, offset, filter, orderBy, fields));
  },

  updateOneService: (id, payload) => {
    dispatch(updateOneServiceAction(id, payload));
  },
  createOneService: (payload) => {
    dispatch(createOneServiceAction(payload))
  },
  getOneService: id => {
    dispatch(getOneServiceAction(id));
  },
  deleteOne: id => {
    dispatch(deleteOneAction(id));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create()(ServiceTable));
