import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Label from '../../../components/RestField/Label';
import Filter from '../components/Filter';
import ActionGroup from '../../../components/RestActions/ActionGroup';
import EditButton from '../../../components/RestActions/EditButton';
import DeleteButton from '../../../components/RestActions/DeleteButton'
import RestList from '../../rest/List';
import RestSwitch from '../../../components/RestField/Switch'
import FAQWrapper from './styles';

class ListFAQ extends Component {
  componentDidMount() {}

  render() {

    return (
      <FAQWrapper>
        <RestList
          title="Danh sách câu hỏi thường gặp"
          filter={<Filter />}
          resource="info/faqs"
          initialFilter={{ limit: 10, skip: 0, order: 'id', filter: {} }}
          {...this.props}
          redirects={{
            create: 'modal',
            edit: 'modal',
          }}
        >
          {/* <Label source="id" title="STT" width="90px" /> */}
          <Label
            source="id"
            title="Id"
            width="7%"
          />
          <Label
            source="title"
            title="Tiêu đề"
            width="30%"
          />
          <RestSwitch
            source="isVisible"
            title="Hiển thị"
            confirmMessage="Bạn có muốn thay đổi?"
            cancelConfirmMessage="Hủy bỏ"
            align="center"
            isShowConfirm
            onChange={this.props.onChange}
            type="switch"
          />
          <ActionGroup>
            <EditButton />
            <DeleteButton customMessage="Bạn có chắc muốn xóa" />
          </ActionGroup>
        </RestList>
      </FAQWrapper>
    );
  }
}

ListFAQ.propTypes = {
  onChange: PropTypes.func,
};

export default ListFAQ;
