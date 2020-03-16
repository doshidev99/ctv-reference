import React, { Component } from 'react'
import { Form } from 'antd'
import PostionWrapper from './styles'
import Editor from "../../../../components/common/Editor/index";

const FormItem = Form.Item
export default class Postion extends Component {
  render() {
    return (
      <PostionWrapper>
        <div className="positionDescription">
          <label className="positionLabel">Vị trí</label>
          <FormItem>
            <Editor
              label="Mô tả"
              onChange={this.handleChange}
              />
          </FormItem>
        </div>
        <div className="positionMap" />
      </PostionWrapper>
    )
  }
}
