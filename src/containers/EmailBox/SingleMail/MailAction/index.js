import React, { Component } from "react";
import { Button, Popover, Popconfirm } from "antd";
import {
  SingleMailActions,
  MailActionsWrapper,
  // MailCategoryWrapper,
  MailPaginationWrapper,
  // MailActionDropdown,
} from "./styles";

export default class MailAction extends Component {
  handleClick = () => {
    // console.log("clicked");

  };

  handleDelete = () => {
    // console.log("clicked");
  };

  render() {
    const index = 0;
    return (
      <div className="mailActionWrapper">
        <SingleMailActions>
          <MailActionsWrapper className="isoMailActions">
            <Popover content={(
              <p>Chuyển sang spam</p>
            )}>
              <Button icon="info-circle" theme="filled" onClick={this.handleClick} className="mailReport" />
            </Popover>

            <Popconfirm
              title="Sure to delete This mail?"
              okText="DELETE"
              cancelText="No"
              onConfirm={this.handleDelete}
            >
              <Button icon="delete" className="mailDelete" />
            </Popconfirm>
          </MailActionsWrapper>
          
          <MailPaginationWrapper className="isoSingleMailPagination">
            {index === 0 ? (
            ''
          ) : (
            <Button
              className="prevPage"
              onClick={this.handleClick}
              icon="left" 
            />
          )}

            {index + 1 === 3 ? (
            ''
          ) : (
            <Button
              className="nextPage"
              onClick={this.handleClick}
              icon="right" 
            />
          )}
          </MailPaginationWrapper>
        </SingleMailActions>
      </div>
    );
  }
}
