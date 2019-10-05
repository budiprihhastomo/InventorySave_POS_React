import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Icon, Input, Button, Row, Col } from "antd";
import Axios from "axios";
import SweetAlert from "sweetalert2-react";

const isAuth = () => {
  if (localStorage.getItem("auth-token"))
    return (window.location = `${process.env.REACT_APP_SERVER_HOST}`);
};

export class LoginView extends Component {
  constructor(props) {
    super();
    isAuth();
    this.state = {
      showError: false,
      showSuccess: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.loginAction(values);
      }
    });
  };

  loginAction = data => {
    Axios.post(
      `${process.env.REACT_APP_SERVER_HOST_API}api/v1/user/login`,
      data
    )
      .then(result => {
        console.log(result);
        if (result.status === 200) {
          localStorage.setItem("auth-token", result.data.access_token);
          this.setState({ showSuccess: true });
          setTimeout(() => {
            window.location.href = `${process.env.REACT_APP_SERVER_HOST}`;
          }, 3000);
        }
      })
      .catch(err => {
        this.setState({ showError: true });
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
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
                <div style={{ float: "right" }}>
                  Or <Link to="/register">register now!</Link>
                </div>
              </Form.Item>
            </Form>
          </Col>
          <SweetAlert
            show={this.state.showSuccess}
            type="success"
            title="Login Success!"
            text="Keep waiting, the page will be redirect."
            onConfirm={() => this.setState({ showSuccess: false })}
          />
          <SweetAlert
            show={this.state.showError}
            type="error"
            title="Login Failed!"
            text="Your username or password is incorrect."
            onConfirm={() => this.setState({ showError: false })}
          />
        </Row>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(LoginView);

export default WrappedNormalLoginForm;
