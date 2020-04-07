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
  Icon,
} from "antd";
import Editor from "../../../components/common/Editor/index";

import {
  getListDocumentAction,
  updateOneDocumentAction,
  createOneDocumentAction,
  removeFileAction,
  getOneDocumentAction,
  deleteOneAction,
} from "../../../redux/training/actions";
import Wrapper, { EditorWrapper } from "./styles";
import AttachmentFile from "./AttachmentFile";

const { Item } = Form;

class DocumentTable extends Component {
  state = {
    editingKey: "",
    visible: false,
    editVisible: false,
  };

  columnHeaders = [
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
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
              cancelText="No"
            >
              <Switch checked={record.status} />
            </Popconfirm>
          </div>
        );
      },
    },
    {
      title: "Tùy chọn",
      width: "100px",
      dataIndex: "operation",
      render: (text, record) => (
        <div className="option">
          <span className="btnOption">
            <Icon type="edit" onClick={() => this.showEditModal(record.id)} />
          </span>
          <span className="btnOption">
            <Popconfirm
              title="Xóa tài liệu?"
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

  fields = ["id", "title", "isVisible"];

  currentPage = 1;

  componentDidMount() {
    try {
      this.props.getListDocument(
        5,
        0,
        null,
        this.orderBy,
        JSON.stringify(this.fields),
      );
    } catch (error) {
      message.error("Có lỗi xảy ra");
    }
  }

  handleSaveSwitch = (e, record) => {
    if (e !== record.status) {
      const payload = { ...record };
      delete payload.key;
      payload.status = e;
      this.props.updateOneDocument(payload.id, payload);
    }
  };

  onChangePage = (page, limit) => {
    const offset = (page - 1) * limit;
    this.props.getListDocument(
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
    await this.props.getOneDocument(id);
    this.setState({
      editVisible: true,
    });
  };

  handleOk = async () => {
    const { validateFields } = this.props.form;
    const { file } = this.props;
    if (file === null) {
      message.error("Vui lòng tải file đính kèm");
      return;
    }
    try {
      const payload = await validateFields();
      payload.link = file;
      await this.props.createOneDocument(payload);
      const limit = this.props.limit || 5;
      const offset = (this.currentPage - 1) * limit;
      this.props.getListDocument(
        limit,
        offset,
        null,
        this.orderBy,
        JSON.stringify(this.fields),
      );
      this.setState({
        visible: false,
        editVisible: false,
      });
      this.props.removeFile();
    } catch (error) {
      message.error("Có lỗi xảy ra");
      this.setState({
        visible: false,
      });
    }
  };

  handleEditOk = async (id) => {
    const { validateFields } = this.props.form;
    const { file } = this.props;
    if (file === null) {
      message.error("Vui lòng tải file đính kèm");
      return;
    }
    try {
      const payload = await validateFields();
      payload.link = file;
      await this.props.updateOneDocument(id, payload);
      const limit = this.props.limit || 5;
      const offset = (this.currentPage - 1) * limit;
      this.props.getListDocument(
        limit,
        offset,
        null,
        this.orderBy,
        JSON.stringify(this.fields),
      );
      this.setState({
        visible: false,
        editVisible: false,
      });
      this.props.removeFile();
    } catch (error) {
      message.error("Có lỗi xảy ra");
      this.setState({
        visible: false,
        editVisible: false,
      });
    }
  };


  handleCancel = () => {
    this.setState({
      visible: false,
      editVisible: false,
    });
  };

  handleDelete = async e => {
    await this.props.deleteOne(e.key);
    const limit = this.props.limit || 5;
    const offset = (this.currentPage - 1) * limit;
    this.props.getListDocument(
      limit,
      offset,
      null,
      this.orderBy,
      JSON.stringify(this.fields),
    );
  };

  render() {
    const {
      documents,
      offset, // offset = (page - 1) * limit;
      limit,
      totalDocument,
      loadingDocument,
      listDocumentFailure,
      currentDocument,
    } = this.props;
    const { getFieldDecorator } = this.props.form;
    const page = offset / limit + 1;
    this.currentPage = page;
    if (listDocumentFailure) {
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
        <Row gutter={[16, 16]}>
          <Col xs={6} className="createButton">
            <Button type="primary" icon="plus" onClick={this.showModal}>
              Thêm Document
            </Button>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col>
            <Table
              columns={this.columnHeaders}
              dataSource={documents}
              pagination={false}
              loading={loadingDocument}
            />
          </Col>
        </Row>
        <Row type="flex" justify="end" gutter={[16, 16]}>
          <Col xs={18} className="pagination">
            <Pagination
              showTotal={(totalItem, range) =>
                `${range[0]}-${range[1]} of ${totalItem} items`}
              onChange={this.onChangePage}
              defaultCurrent={1}
              current={page}
              total={totalDocument}
              pageSize={limit}
            />
          </Col>
        </Row>
        <Modal
          width={720}
          title="Thêm tài liệu"
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
                <span>Tiêu đề</span>
              </div>
              {getFieldDecorator("title", {
                rules: [
                  {
                    required: true,
                    message: "Vui lòng điền tiêu đề tài liệu",
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
            <Row>
              <Col xs={12}>
                <AttachmentFile />
              </Col>
              <Col offset={6} xs={6}>
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
              </Col>
            </Row>
          </Form>
        </Modal>
        <Modal
          width={720}
          title="Sửa tài liệu"
          visible={this.state.editVisible}
          onOk={() => this.handleEditOk(currentDocument.id)}
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
                <span>Tiêu đề</span>
              </div>
              {getFieldDecorator("title", {
                initialValue: currentDocument.title,
                rules: [
                  {
                    required: true,
                    message: "Vui lòng điền tiêu đề tài liệu",
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
                })(<Editor content={currentDocument.description} />)}
              </EditorWrapper>
              ,
            </Item>
            <Row>
              <Col xs={12}>
                <AttachmentFile />
              </Col>
              <Col offset={6} xs={6}>
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
                    initialValue: currentDocument.status,
                  })(<Switch />)}
                </Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </Wrapper>
    );
  }
}

DocumentTable.propTypes = {
  documents: PropTypes.array,
  offset: PropTypes.number, // offset = (page - 1) * limit;
  limit: PropTypes.number,
  totalDocument: PropTypes.number,
  loadingDocument: PropTypes.bool,
};

const mapStateToProps = state => {
  const {
    documents,
    offset, // offset = (page - 1) * limit;
    limit,
    totalDocument,
    loadingDocument,
    listDocumentFailure,
    fileUrl,
    currentDocument,
  } = state.training;
  return {
    documents,
    offset, // offset = (page - 1) * limit;
    limit,
    totalDocument,
    loadingDocument,
    listDocumentFailure,
    file: fileUrl,
    currentDocument,
  };
};
const mapDispatchToProps = dispatch => ({
  getListDocument: (limit, offset, filter, orderBy, fields) => {
    dispatch(getListDocumentAction(limit, offset, filter, orderBy, fields));
  },

  updateOneDocument: (id, payload) => {
    dispatch(updateOneDocumentAction(id, payload));
  },
  createOneDocument: payload => {
    dispatch(createOneDocumentAction(payload));
  },
  getOneDocument: id => {
    dispatch(getOneDocumentAction(id));
  },
  deleteOne: id => {
    dispatch(deleteOneAction(id));
  },
  removeFile: () => {
    dispatch(removeFileAction());
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create()(DocumentTable));
