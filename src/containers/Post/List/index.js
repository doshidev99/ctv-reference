import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Label from '../../../components/RestField/Label';
import ActionGroup from '../../../components/RestActions/ActionGroup';
import EditButton from '../../../components/RestActions/EditButton';
import DeleteButton from '../../../components/RestActions/DeleteButton';
import RestList from '../../rest/List';
import Filter from '../components/Filter';
import RestSwitch from '../../../components/RestField/Switch';
// import { ADMIN_ROLES } from '../../../configs/constants';
import { formatDate } from "../../../utils/textProcessor";
import PostWrapper from './style';

class ListPost extends Component {
  componentDidMount() {}

  // filter = {
  //   roleId: {"$in": [1,2]},
  // }

  render() {

    return (
      <PostWrapper>
        <RestList
          title="Tin tức"
          filter={<Filter />}
          resource="posts"
          initialFilter={{ limit: 10, skip: 0, order: 'id', filter: {} }}
          {...this.props}
        >
          <Label source="id" title="ID" width="90px" />
          <Label
            source="createdAt"
            title="Ngày đăng"
            render={(value) => formatDate(value)}
            width="120px"
          />
          <Label source="title" title="Tiêu đề" />
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
            <DeleteButton />
          </ActionGroup>
        </RestList>
      </PostWrapper>
    );
  }
}

ListPost.propTypes = {
  onChange: PropTypes.func,
};

export default ListPost;
