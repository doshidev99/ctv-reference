import React, { Component } from 'react'
import { Upload, Icon, Modal, Button, message } from 'antd';
import { connect } from "react-redux";
import i18n from "i18next";
import OrderImageWrapper from './styles'
import { uploadImageAction, uploadImageSuccessAction, confirmOrderImageAction} from "../../../../redux/transaction/actions";
import { getSignedUrlS3, uploadFile } from "../../../../utils/uploadFile";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class StandingOrderImage extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleOnChange = async info => {
    if (info.file.status !== "uploading") {
      // console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      let newFileName = this.props.file;
      newFileName = newFileName.substring(newFileName.lastIndexOf("/") + 1);
      info.file.name = newFileName;
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  handleUpload = async ({ file, onSuccess, onError }) => {
    try {
      this.props.uploadImage();
      const signedUrlS3 = await getSignedUrlS3(
        file.name,
        file.type,
        "standingOrderImage",
      );

      uploadFile(file, signedUrlS3.url).then(response => {
        this.props.uploadImageSuccess(response.url);
        onSuccess("OK");
      });
    } catch (error) {
      onError("Error cmnr =)))");
    }
  };

  render() {
    const { previewVisible, previewImage } = this.state;
    const { isLoadingUpload, file } = this.props;
    

    // fileList = fileList.map((e, index) => ({
    //   url: e,
    //   status: 'done',
    //   uid: index,
    // }))
    const uploadButton = (
      <div>
        <Icon type={isLoadingUpload ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <OrderImageWrapper>
        <div className="title">
          <span>
            Upload ủy nhiệm chi
          </span>
        </div>
        <Upload
          // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          showUploadList={false}
          onPreview={this.handlePreview}
          onChange={this.handleOnChange}
          customRequest={this.handleUpload}
          onRemove={this.handleRemove}
        >
          {file ? <img src={file} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
        <Button
          type="primary"
          onClick={() => this.props.confirmOrder(this.props.id, file)}>
          {i18n.t("transaction.detail.depositConfirm")}
        </Button>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </OrderImageWrapper>
    );
  }
}


const mapStateToProps = state => ({
  file: state.transaction.fileUrl,
  image: state.transaction.standingOrderImage,
  isLoadingUpload: state.transaction.isLoadingUpload,
});

const mapDispatchToProps = dispatch => ({
  uploadImage: () => {
    dispatch(uploadImageAction())
  },
  uploadImageSuccess: fileUrl => {
    dispatch(uploadImageSuccessAction(fileUrl, "create"));
  },
  confirmOrder: (id, file) => {
    dispatch(confirmOrderImageAction(id, file))
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(StandingOrderImage);
