import React, { Component } from 'react'
import { Upload, Button, message, Row, Col } from 'antd'
import { connect } from "react-redux";
import PriceListWrapper from './styles'
import { getSignedUrlS3, uploadFile } from '../../../../utils/uploadFile';
import {addPriceListAction, uploadFileSuccessAction, removePriceListAction  } from "../../../../redux/property/actions";

class PriceList extends Component {
  handleOnChange = async info => {
    if (info.file.status !== "uploading") {
      // console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      let newFileName = this.props.file;
      newFileName = newFileName.substring(newFileName.lastIndexOf("/") + 1);
      // eslint-disable-next-line no-param-reassign
      info.file.name = newFileName;
      // eslint-disable-next-line no-param-reassign
      // info.file.originFileObj.name = newFileName
      // console.log(info.file, info.fileList);
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  handleRemove = () => {
    this.props.removePriceList()
  };

  handleUpload = async ({ file, onSuccess, onError }) => {
    try {
      const signedUrlS3 = await getSignedUrlS3(
        file.name,
        file.type,
        "PRICE_LIST",
      );
      const response = await uploadFile(file, signedUrlS3.url);
      this.props.uploadFileSuccess(response.url);
      this.props.addPriceList(response.url, file.type);
      onSuccess("OK");
    } catch (error) {
      message.error("Xảy ra lỗi, vui lòng thử lại");
      onError("Error cmnr =)))");
    }
  };

  render() {
    return (
      <PriceListWrapper>
        <Row>
          <div className="title">
            <p>
            Bảng giá
            </p>
          </div>
        </Row>
        <Row>
          <Col>
            <Upload
              className="upload"
              onChange={this.handleOnChange}
              onRemove={this.handleRemove}
              customRequest={this.handleUpload}
            >
              <Button icon="upload" className="uploadPriceButton" />
            </Upload>
          </Col>
        </Row>
      </PriceListWrapper>
    )
  }
}


const mapStateToProps = state => ({
  priceList: state.property.priceList,
  file: state.property.fileUrl,
})

const mapDispatchToProps = dispatch => ({
  uploadFileSuccess: fileUrl => {
    dispatch(uploadFileSuccessAction(fileUrl, "create"));
  },
  addPriceList: (fileUrl, type) => {
    dispatch(addPriceListAction(fileUrl, type));
  },
  removePriceList: () => {
    dispatch(removePriceListAction());
  },

})


export default connect(mapStateToProps, mapDispatchToProps)(PriceList);
