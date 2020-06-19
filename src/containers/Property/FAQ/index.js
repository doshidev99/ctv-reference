import React, { Component } from "react";
import PropTypes from "prop-types";
import Label from "../../../components/RestField/Label";
import ActionGroup from "../../../components/RestActions/ActionGroup";
import DeleteButton from "../../../components/RestActions/DeleteButton";
import RestList from "../../rest/List";
import Filter from "../components/FilterFAQ";
import PropertyWrapper from "./styles";
import { formatDate } from "../../../utils/textProcessor";
import FAQButton from "../../../components/RestActions/FAQButton";


class ListFAQsProperty extends Component {
  componentDidMount() {}

  render() {
    const {id} = this.props.match.params;
    return (
      <PropertyWrapper>
        <RestList
          filter={<Filter />}
          resource={`properties/${id}/faqs`}
          initialFilter={{ limit: 10, skip: 0, order: "-updatedAt", filter: {} }}
          {...this.props}
          hasCreate={false}
          redirects={{
            edit: 'modal',
          }}
        >
          <Label
            source="realtor.fullName"
            title="Tên CTV"
            width="15%"
          />
          <Label source="title" title="Tiêu đề" />
          <Label
            source="createdAt"
            title="Ngày đăng"
            render={(value) => formatDate(value)}
          />
          <ActionGroup>
            <DeleteButton customMessage="Bạn có chắc chắn muốn xóa ?" />
            <FAQButton />
          </ActionGroup>
        </RestList>
      </PropertyWrapper>
    );
  }
}

ListFAQsProperty.propTypes = {
  onChange: PropTypes.func,
};

export default ListFAQsProperty;
