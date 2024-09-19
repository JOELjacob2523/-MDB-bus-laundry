import "./login.css";
import React, { useState } from "react";
import { TbPasswordUser } from "react-icons/tb";
import { MdOutlineEmail } from "react-icons/md";
import { Button, Card, Form, Input, Modal, Watermark } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { MDBlogin } from "../../servers/mongoDB/userRequests/postUserRequest";
import ErrorLogin from "../errorAlert/errorLogin";
import KYLetterhead from "../../images/KY_Letterhead.png";
import ForgotPasswordForm from "../forgotPessword/forgotPassword";

const UserLogin = ({ setIsAuthenticated }) => {
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values) => {
    const { email, password } = values;
    try {
      const response = await MDBlogin(email, password);
      if (response.status === 200) {
        setIsAuthenticated(true);
        navigate("/home");
      } else {
        console.error("Login failed with status:", response.status);
        setError("Incorrect username or password. Please try again.");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      setError("Incorrect username or password. Please try again.");
    }
  };

  return (
    // <Watermark height={80} width={130} image={KYSymbolWashed}>
    <div className="login_main_container">
      <div className="login_inner_container">
        <div className="KY_letterhead_img_container">
          <img
            className="KY_letterhead_img"
            alt="KYLetterhead"
            src={KYLetterhead}
          />
        </div>
        {error && <ErrorLogin message={error} />}
        <div className="login_card_container">
          <Card title="Login" className="login_card">
            <Form
              name="normal_login"
              className="login_form"
              initialValues={{
                remember: false,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input prefix={<MdOutlineEmail />} />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password prefix={<TbPasswordUser />} />
              </Form.Item>

              <Form.Item>
                {/* <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item> */}

                <Button
                  type="link"
                  className="login_form_forgot"
                  onClick={showModal}
                >
                  <div>Forgot password</div>
                </Button>
              </Form.Item>

              <Form.Item>
                <div className="login_form_footer">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login_form_button"
                  >
                    Login
                  </Button>
                  <div className="signup_link">
                    Dont have an account?{" "}
                    <Link to="/signup">Register now!</Link>
                  </div>
                </div>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
      <Modal
        title="Forogt Password"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <ForgotPasswordForm />
      </Modal>
      {/* </Watermark> */}
    </div>
  );
};
export default UserLogin;
