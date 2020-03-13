import React, { Component } from 'react'
import i18n from "i18next";
import { Layout, Form, Icon, Button } from "antd";
import PropTypes from "prop-types";
import PageTitle from "../../components/common/PageTitle/index";
import MaterialInput from "../../components/common/MaterialInput/index";

const FormItem = Form.Item;

class CreatePropertyForm extends Component {
  render() {
    const { form } = this.props;
    console.log(1234);
    
    const { getFieldDecorator } = form;
    return (
      <div>
        <PageTitle>{i18n.t("property.newPropertyTitle")}</PageTitle>
        <Layout>
          <Form layout="vertical" onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator("username", {
                rules: [
                  {
                    required: true,
                    message: i18n.t("input.username.validateMsg.required"),
                  },
                ],
              })(
                <MaterialInput
                  placeholder={i18n.t("input.username.placeholder")}
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                />,
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: i18n.t("input.password.validateMsg.required"),
                  },
                ],
              })(
                <MaterialInput
                  placeholder={i18n.t("input.password.placeholder")}
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                />,
              )}
            </FormItem>
            <div className="sub-action-div">
              <a className="login-form-forgot" href="/forgot-password">
                {i18n.t("forgotPassword.title")}
              </a>
            </div>
            <div className="action-div">
              <Button
                type="primary"
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
export default CreatePropertyForm;