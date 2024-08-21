import React from "react";
import { Alert } from "antd";

const ErrorLogin = ({ message }) => {
  return (
    <Alert
      message="Error"
      description={message}
      type="error"
      showIcon
      closable
    />
  );
};
export default ErrorLogin;
