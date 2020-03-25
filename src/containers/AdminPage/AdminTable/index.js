import React, { Component } from "react";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import i18next from "i18next";

import {
  Table,
  Pagination,
  Row,
  Col,
  message,
  Icon,
  Popconfirm,
  Modal,
  Spin,
  Form,
  Input,
  Select,
} from "antd";
import { Link } from "react-router-dom";
import CreateButton from "../../../components/RestActions/CreateButton"
import { getListAdminAction, getOneAdminInfoAction, createOneAdminAction } from "../../../redux/admin/actions";
import AdminTableWrapper from "./styles";

const {Item} = Form;
class AdminTable extends Component {
  state = { 
    visible: false,
   };

  columnHeaders = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      width: 100,
      // render: (e, record) => (
      //   <Link to={`/admins/${record.id}`}>{record.id}</Link>
      // ),
    },
    {
      title: "Họ và tên",
      key: "fullName",
      dataIndex: "fullName",
      render: (e, record) => (
        <Link to={`/admins/${record.id}`}>{record.fullName}</Link>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Vai trò",
      dataIndex: "roleName",
      key: "roleName",
    },
    {
      title: "Tùy chọn",
      key: "option",
      render: (e, record) => (
        <div className="option">
          {/* <span className="btnOption">
            <Icon type="edit" onClick={() => this.showModal(record.id)} />
          </span> */}
          <span className="btnOption">
            <Popconfirm
              title="Xóa quản trị viên?"
              onConfirm={() => this.handleDelete(record)}
              //  onCancel={cancel}
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

  orderBy = "id";

  componentDidMount() {
    this.props.getListAdmin(5, 0, null, this.orderBy);
  }

  handleDelete = e => {
    this.props.deleteOne(e.key);
    this.props.getListAdmin(
      this.props.limit,
      this.props.offset,
      null,
      this.orderBy,
    );
  };

  onChangePage = (page, limit) => {
    const offset = (page - 1) * limit;
    this.props.getListAdmin(limit, offset, null, this.orderBy);
  };

  showModal = () => {
    // this.props.getOneAdminInfo(id);
    this.setState({
      visible: true,
    });
  };

  handleOk = async () => {
    try {
      const payload = await this.props.form.validateFields()
      await this.props.createOneAdmin(payload)
      this.setState({
        visible: false,
      });
    } catch (error) {
      message.error("Có lỗi xảy ra")
    }
  };

  handleCancel = ()=> {
    this.setState({
      visible: false,
    });
  };

  render() {
    const {
      admins,
      offset, // offset = (page - 1) * limit;
      limit,
      total,
      loading,
      listAdminFailure,
    } = this.props;
    const {
      getFieldDecorator,
    } = this.props.form
    const page = offset / limit + 1;

    
    let userInfo;
    const isCreate = 1;
    if(isCreate) {
      userInfo = (
        <Form className="form-view">
          <Item>
           
            <div
              className="title"
              style={{
              lineHeight: "initial",
            }}>
              <span>Họ và tên</span>
            </div>
            {getFieldDecorator('fullName', {
              rules: [
                {
                  required:true,
                  message: "Vui lòng điền họ tên",
                },
              ],
            })(
              <Input />,
              )}
          </Item>
          <Item>
            <div
              className="title"
              style={{
              lineHeight: "initial",
            }}>
              <span>Email</span>
            </div>
            {getFieldDecorator('email', {
               rules: [
                {
                  required:true,
                  message: "Vui lòng điền email",
                },
              ],
            })(
              <Input />,
              )}
          </Item>
          <Item>
            <div
              className="title"
              style={{
              lineHeight: "initial",
            }}>
              <span>Mật khẩu</span>
            </div>
            {getFieldDecorator('password', {
               rules: [
                {
                  required:true,
                  message: "Vui lòng điền mật khẩu",
                },
              ],
            })(
              <Input type="password" />,
              )}
          </Item>
          <Item>
            <div
              className="title"
              style={{
              lineHeight: "initial",
            }}>
              <span>Vai trò</span>
            </div>
            {getFieldDecorator("roleId", {
               rules: [
                {
                  required:true,
                  message: "Vui lòng chọn vai trò",
                },
              ],
            })(
              <Select>
                <Select.Option value={1}>Super admin</Select.Option>
                <Select.Option value={2}>Admin</Select.Option>
              </Select>,
            )}
            
          </Item>
        </Form>

      )
    } else {
      userInfo = (
        <div
          className="loadingCurrentUser"
          style={{
          display: 'flex',
          justifyContent: 'center',
        }}>
          <Spin />
        </div>
      )
    }



    if (listAdminFailure) {
      message.error("Lỗi khi tải thông tin");
      return (
        <AdminTableWrapper>
          <div className="adminAction">
            <div className="actionBox">
              <CreateButton source={i18next.t("button.create")} gotoCreatePage={this.showModal} />
            </div>
          </div>
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
        </AdminTableWrapper>
      );
    }
    return (
      <AdminTableWrapper>
        <div className="adminAction">
          <div className="actionBox">
            <CreateButton source={i18next.t("button.create")} gotoCreatePage={this.showModal} />
          </div>
        </div>
        <Table
          columns={this.columnHeaders}
          dataSource={admins}
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
          <Modal
            title="Thêm thành viên"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            {userInfo}
          </Modal>
        </Row>
      </AdminTableWrapper>
    );
  }
}
AdminTable.propTypes = {
  admins: PropTypes.array,
  offset: PropTypes.number, // offset = (page - 1) * limit;
  limit: PropTypes.number,
  total: PropTypes.number,
  loading: PropTypes.bool,
};

const mapStateToProps = state => {
  const {
    admins,
    offset, // offset = (page - 1) * limit;
    limit,
    total,
    loading,
    listAdminFailure,
    currentUser,
    isCreate,
  } = state.admin;
  return {
    admins,
    offset, // offset = (page - 1) * limit;
    limit,
    total,
    loading,
    listAdminFailure,
    currentUser,
    isCreate,
  };
};
const mapDispatchToProps = dispatch => ({
  getListAdmin: (limit, offset, filter, orderBy) => {
    dispatch(getListAdminAction(limit, offset, filter, orderBy));
  },
  getOneAdminInfo: (id) => {
    dispatch(getOneAdminInfoAction(id))
  },
  createOneAdmin: (payload) => {
    dispatch(createOneAdminAction(payload))
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(AdminTable));
