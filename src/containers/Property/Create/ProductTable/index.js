import React, { Component } from "react";
import { Button, Upload, Table, message } from "antd";
import { connect } from "react-redux";
import ProductTableWrapper from "./styles";
// import Floor from "./Floor";
import {
  addNewFloor,
  loadExcelSuccessAtion,
} from "../../../../redux/property/actions";
import { handleXLSX } from "../../../../utils/uploadFile";

class ProductTable extends Component {
  columnHeaders = [
    {
      title: "Mã sản phẩm",
      dataIndex: "productCode",
      key: "productCode",
      width: 100,
      // render: text => <Link to={text}>{text}</Link>,
    },
    {
      title: "Tòa nhà",
      key: "building",
      dataIndex: "building",
    },
    {
      title: "Tầng",
      dataIndex: "floor",
      key: "floor",
      sorter: (a, b) => a - b,
      sortDirections: ["descend"],
    },
    {
      title: "Mã căn",
      dataIndex: "code",
      key: "code",
      sorter: (a, b) => a - b,
      sortDirections: ["descend"],
    },
    {
      title: "Loại căn hộ",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Hướng",
      dataIndex: "direction",
      key: "direction",
    },
    {
      title: "Diện tích",
      dataIndex: "area",
      key: "area",
      render: e => {
        return `${e} m2`;
      },
    },
    {
      title: "Giá bán chưa VAT+PBT",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      sortDirections: ["descend"],
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (e) => {
        if (e === undefined) {
          return "";
        }
        return `${this.STATUSES_1[e]}`;
      },
    },
  ];

  STATUSES_1 = {
    0: "SELLING",
    1: "BOOKED",
    2: "SOLD",
    3: "RESERVED",
  };

  STATUSES_2 = {
    SELLING: 0,
    BOOKED: 1,
    SOLD: 2,
    RESERVED: 3,
  };

  onImportExcel = async ({ file, onSuccess, onError }) => {
    try {
      let df = await handleXLSX(file);
      // eslint-disable-next-line prefer-destructuring
      df = df[0];
      const result = df.map(row => {
        const obj = Object.keys(row).map(key => {
          return {
            key,
            value: row[key],
          };
        });
        return obj;
      });
      result.forEach((e, index) => {
        result[index] = {
          key: index,
          productCode: e[0].value,
          building: e[1].value || undefined,
          floor: e[2].value.toString() || undefined,
          code: e[3].value.toString(),
          type: e[4].value || undefined,
          direction: e[5].value|| undefined,
          area: e[6].value,
          price: e[7].value,
          status:   (e[8].value && this.STATUSES_2[e[8].value])|| undefined,
          image: ``,
        };
      });
      this.props.loadExcelSuccess(result);
      onSuccess("OK");
    } catch (error) {
      onError("Error cmnr =))");
    }
  };

  handleOnChange = info => {
    // console.log(info.file.status);

    if (info.file.status !== "uploading") {
      // console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  handleBeforeUpload = file => {
    const isXLSX =
      file.type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    if (!isXLSX) {
      message.error("Vui lòng upload file có phần mở rộng .xlsx");
    }
    return isXLSX;
  };

  render() {
    // const floors = this.props.floors.map(e => (
    //   <Floor key={e.id} id={e.id} name={e.name} rooms={e.rooms} />
    // ));
    return (
      <ProductTableWrapper>
        <Upload
          className="uploadExcel"
          accept=".xlsx, .xls"
          beforeUpload={this.handleBeforeUpload}
          onChange={this.handleOnChange}
          customRequest={this.onImportExcel}
        >
          <Button shape="round" icon="upload">
            Upload file Excel
          </Button>
        </Upload>
        <Table
          columns={this.columnHeaders}
          className="tableProduct"
          dataSource={this.props.productTable}
          pagination
        />
        {/* <div className="floors">{floors}</div>
        <div className="action">
          <Button type="primary" onClick={this.props.handleExpand}>
            Thêm tầng
          </Button>
        </div> */}
      </ProductTableWrapper>
    );
  }
}

const mapStateToProps = state => ({
  productTable: state.property.productTable,
});

const mapDispatchToProps = dispatch => ({
  handleExpand: () => {
    dispatch(addNewFloor());
  },

  loadExcelSuccess: data => {
    dispatch(loadExcelSuccessAtion(data));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductTable);
