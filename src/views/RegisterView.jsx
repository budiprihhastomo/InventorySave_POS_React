import React, { Component } from "react";
import { Form, Icon, Input, Button, Row, Col } from "antd";
import Axios from "axios";
import SweetAlert from "sweetalert2-react";

export class RegisterView extends Component {
  constructor(props) {
    super();
  }
  state = {
    showSuccess: false,
    showError: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.registerProcess(values);
      }
    });
  };

  registerProcess = data => {
    Axios.post(
      `${process.env.REACT_APP_SERVER_HOST_API}api/v1/user/register`,
      data
    )
      .then(result => {
        if (result.status === 201) return this.setState({ showSuccess: true });
      })
      .catch(err => {
        return this.setState({ showError: true });
      });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div
        style={{ marginTop: 200, marginBottom: 0, padding: 0, height: "100vh" }}
      >
        <Row gutter={8} type="flex" justify="center" align="middle">
          <Col sm={12}>
            <h3>Login Page : Administrator</h3>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator("user_name", {
                  rules: [
                    { required: true, message: "Please input your username!" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Username"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("user_password", {
                  rules: [
                    { required: true, message: "Please input your Password!" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="Password"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("user_cpassword", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your confirm Password!"
                    }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="Confirm Password"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("user_role", {
                  rules: [{ required: true, message: "Please select role!" }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="text"
                    placeholder="Role Status"
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Register
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <SweetAlert
          show={this.state.showSuccess}
          type="success"
          title="Success Created!"
          text="Your data has registered on database."
          onConfirm={() => this.setState({ showSuccess: false })}
        />
        <SweetAlert
          show={this.state.showError}
          type="error"
          title="Failed !"
          text="Your data doesn't fill requirement."
          onConfirm={() => this.setState({ showError: false })}
        />
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
  RegisterView
);

export default WrappedNormalLoginForm;
