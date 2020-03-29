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
  DatePicker,
  Upload,
} from "antd";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import CreateButton from "../../../components/RestActions/CreateButton"
import { getListPartnerAction, getOnePartnerInfoAction, createOnePartnerAction } from "../../../redux/partner/actions";
import { getSignedUrlS3, uploadFile } from "../../../utils/uploadFile";
import PartnerTableWrapper from "./styles";
import CreateWrapper from "./createStyles";

const { Item } = Form;
class PartnerTable extends Component {
  state = {
    visible: false,
    avatarUrl: null,
    avatarLoading: false,
  };

  columnHeaders = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      width: 100,
      // render: (e, record) => (
      //   <Link to={`/partners/${record.id}`}>{record.id}</Link>
      // ),
    },
    {
      title: "Họ và tên",
      key: "fullName",
      dataIndex: "fullName",
      render: (e, record) => (
        <Link to={`/partners/${record.id}`}>{record.fullName}</Link>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
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
              title="Xóa partner?"
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
    this.props.getListPartner(5, 0, null, this.orderBy);
  }

  handleDelete = e => {
    this.props.deleteOne(e.key);
    this.props.getListPartner(
      this.props.limit,
      this.props.offset,
      null,
      this.orderBy,
    );
  };

  onChangePage = (page, limit) => {
    const offset = (page - 1) * limit;
    this.props.getListPartner(limit, offset, null, this.orderBy);
  };

  showModal = () => {
    // this.props.getOnePartnerInfo(id);
    this.setState({
      visible: true,
    });
  };

  handleOk = async () => {
    try {
      const payload = await this.props.form.validateFields();
      payload.avatar = this.state.avatarUrl;
      await this.props.createOnePartner(payload)
      this.setState({
        visible: false,
      });
    } catch (error) {
      message.error("Có lỗi xảy ra");
    }
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  handleUpload = async ({ file, onSuccess, onError }) => {
    try {
      const signedUrlS3 = await getSignedUrlS3(
        file.name,
        file.type,
        "AVATAR_IMAGE",
      );
      const response = await uploadFile(file, signedUrlS3.url);
      this.setState({ avatarUrl: response.url });
      onSuccess("OK");
    } catch (error) {
      onError("Error cmnr =)))");
    }
  };

  handleChangeAvatar = info => {
    if (info.file.status === 'uploading') {
      this.setState({ avatarLoading: true });
      return;
    }
    if (info.file.status === 'done') {
      this.setState({ avatarLoading: false });
    }
  };

  render() {
    const {
      partners,
      offset, // offset = (page - 1) * limit;
      limit,
      total,
      loading,
      listPartnerFailure,
    } = this.props;
    const {
      getFieldDecorator,
    } = this.props.form
    const page = offset / limit + 1;


    let userInfo;
    const isCreate = 1;
    if (isCreate) {
      const { avatarUrl } = this.state;
      const uploadButton = (
        <div>
          {this.state.avatarLoading ? <LoadingOutlined /> : <PlusOutlined />}
          <div className="ant-upload-text">Upload</div>
        </div>
      );
      userInfo = (
        <CreateWrapper>
          <Form className="form-view">
            <Item>
              <div
                className="title"
                style={{
                  lineHeight: "initial",
                }}>
                <span>Avatar</span>
              </div>
              <Upload
                listType="picture-card"
                showUploadList={false}
                customRequest={this.handleUpload}
                onChange={this.handleChangeAvatar}
              >
                {avatarUrl ? <img src={avatarUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
              </Upload>
            </Item>
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
                    required: true,
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
                    required: true,
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
                <span>Địa chỉ</span>
              </div>
              {getFieldDecorator('address', {
                rules: [
                  {
                    required: true,
                    message: "Vui lòng điền địa chỉ",
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
                <span>Nghề nghiệp</span>
              </div>
              {getFieldDecorator('occupation', {
                rules: [
                  {
                    required: true,
                    message: "Vui lòng điền nghề nghiệp",
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
                <span>Giới tính</span>
              </div>
              {getFieldDecorator("gender", {
                rules: [
                  {
                    required: true,
                    message: "Vui lòng chọn giới tính",
                  },
                ],
              })(
                <Select>
                  <Select.Option value={1}>Nam</Select.Option>
                  <Select.Option value={2}>Nữ</Select.Option>
                </Select>,
              )}

            </Item>
            <Item>
              <div
                className="title"
                style={{
                  lineHeight: "initial",
                }}>
                <span>Số điện thoại</span>
              </div>
              {getFieldDecorator('phone', {
                rules: [
                  {
                    required: true,
                    message: "Vui lòng điền số điện thoại",
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
                <span>Ngày sinh</span>
              </div>
              {getFieldDecorator('birthday', {
                rules: [
                  {
                    required: true,
                    message: "Vui lòng điền ngày sinh",
                  },
                ],
              })(
                <DatePicker />,
              )}
            </Item>
            <Item>
              <div
                className="title"
                style={{
                  lineHeight: "initial",
                }}>
                <span>CMT/ Căn cước</span>
              </div>
              {getFieldDecorator('identityNumber', {
                rules: [
                  {
                    required: true,
                    message: "Vui lòng điền số CMT/ Căn cước",
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
                <span>Ngày cấp</span>
              </div>
              {getFieldDecorator('identityProvidedDate', {
                rules: [
                  {
                    required: true,
                    message: "Vui lòng điền ngày cấp",
                  },
                ],
              })(
                <DatePicker />,
              )}
            </Item>
            <Item>
              <div
                className="title"
                style={{
                  lineHeight: "initial",
                }}>
                <span>Nơi cấp</span>
              </div>
              {getFieldDecorator('identityProvidedLocation', {
                rules: [
                  {
                    required: true,
                    message: "Vui lòng điền nơi cấp",
                  },
                ],
              })(
                <Input />,
              )}
            </Item>
          </Form>
        </CreateWrapper>
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



    if (listPartnerFailure) {
      message.error("Lỗi khi tải thông tin");
      return (
        <PartnerTableWrapper>
          <div className="partnerAction">
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
        </PartnerTableWrapper>
      );
    }
    return (
      <PartnerTableWrapper>
        <div className="partnerAction">
          <div className="actionBox">
            <CreateButton source={i18next.t("button.create")} gotoCreatePage={this.showModal} />
          </div>
        </div>
        <Table
          columns={this.columnHeaders}
          dataSource={partners}
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
            title="Thêm partner"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            {userInfo}
          </Modal>
        </Row>
      </PartnerTableWrapper>
    );
  }
}
PartnerTable.propTypes = {
  partners: PropTypes.array,
  offset: PropTypes.number, // offset = (page - 1) * limit;
  limit: PropTypes.number,
  total: PropTypes.number,
  loading: PropTypes.bool,
};

const mapStateToProps = state => {
  const {
    partners,
    offset, // offset = (page - 1) * limit;
    limit,
    total,
    loading,
    listPartnerFailure,
    currentUser,
    isCreate,
  } = state.partner;
  return {
    partners,
    offset, // offset = (page - 1) * limit;
    limit,
    total,
    loading,
    listPartnerFailure,
    currentUser,
    isCreate,
  };
};
const mapDispatchToProps = dispatch => ({
  getListPartner: (limit, offset, filter, orderBy) => {
    dispatch(getListPartnerAction(limit, offset, filter, orderBy));
  },
  getOnePartnerInfo: (id) => {
    dispatch(getOnePartnerInfoAction(id))
  },
  createOnePartner: (payload) => {
    dispatch(createOnePartnerAction(payload))
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(PartnerTable));
