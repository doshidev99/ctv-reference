import React, { Component } from 'react'
import i18n from "i18next";
import { Layout, Form, Icon, Button } from "antd";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Editor from '../../../components/common/Editor/index'
import MaterialInput from "../../../components/common/MaterialInput/index";

const FormItem = Form.Item;

class CreatePropertyForm extends Component {
  handleChange = () => {
    console.log('abc');
    
  }

  render() {
    const { form } = this.props;

    const { getFieldDecorator } = form;
    return (
      <div>
        <Layout>
          <Form layout="vertical" onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator("propertyName", {
                rules: [
                  {
                    required: true,
                    message: i18n.t("input.propertyName.validateMsg.required"),
                  },
                ],
              })(
                <MaterialInput
                  placeholder={i18n.t("input.propertyName.placeholder")}
                  prefix={
                    <span />
                  }
                />,
              )}
            </FormItem>
            <FormItem>
              <Editor
                value=""
                onChange={this.handleChange} />
            </FormItem>
            <div className="sub-action-div">
              <a className="login-form-forgot" href="/forgot-password">
                {i18n.t("forgotPassword.title")}
              </a>
            </div>
            <div className="action-div">
              <Button
                type="secondary"
                htmlType="submit"
                className="login-form-button"
              >
                {i18n.t("login.loginBtn")}
              </Button>
            </div>
          </Form>
        
  
        </Layout>
      </div>
    
    );
  }
}

CreatePropertyForm.propTypes = {
  form: PropTypes.object,
};
export default withRouter((Form.create()(CreatePropertyForm)));