import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Label from "../../../components/RestField/Label";
import ActionGroup from "../../../components/RestActions/ActionGroup";
import EditButton from "../../../components/RestActions/EditButton";
import DeleteButton from "../../../components/RestActions/DeleteButton";
import RestList from "../../rest/List";
import Filter from "../components/Filter";
// import { Property_ROLES } from '../../../configs/constants';
import PropertyWrapper from "./styles";
import { formatDate } from "../../../utils/textProcessor";


class ListProperty extends Component {
  componentDidMount() {}

  render() {

    return (
      <PropertyWrapper>
        <RestList
          title="Danh sách dự án"
          filter={<Filter />}
          resource="properties"
          initialFilter={{ limit: 10, skip: 0, order: "-updatedAt", filter: {} }}
          {...this.props}
          redirects={{
            create: 'newPage',
            edit: 'newPage',
          }}
        >
          <Label
            source="name"
            title="Tên dự án"
            // isRedirect
            render={( value, record) => {
            return <Link to={`/properties/${record.id}/edit`}>{value}</Link>
          }}

          />
          <Label source="type.name" title="Loại dự án" />
          <Label source="city.name" title="Tỉnh thành" />
          <Label
            source="createdAt"
            title="Ngày đăng"
            render={(value) => formatDate(value)}
          />
          <ActionGroup>
            <DeleteButton customMessage="Bạn có chắc chắn muốn xóa ?" />
            <EditButton />
          </ActionGroup>
        </RestList>
      </PropertyWrapper>
    );
  }
}

ListProperty.propTypes = {
  onChange: PropTypes.func,
};

export default ListProperty;
