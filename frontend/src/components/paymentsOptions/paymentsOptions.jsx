import "./paymentsOptions.css";
import {
  Button,
  Form,
  Input,
  Spin,
  Radio,
  Divider,
  message,
  Empty,
} from "antd";
import { BsCurrencyDollar } from "react-icons/bs";
import { getUserInfoById } from "../../servers/getRequest";
import { MDBgetUserInfoById } from "../../servers/mongoDB/studentRequests/getRequests";
import { MDBpayments } from "../../servers/mongoDB/studentRequests/postRequests";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { payments } from "../../servers/postRequest";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const PaymentOptions = ({ studentId, token, handleCancel }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [value, setValue] = useState("bus");
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const data = await getUserInfoById(studentId, token);
        const data = await MDBgetUserInfoById(studentId, token);
        if (data && data._id) {
          setUserInfo(data);
        } else {
          console.error("Invalid user data:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [studentId, token]);

  const handleFormChange = (_, allValues) => {
    const cashInput = Number(allValues.cash) || 0;
    const checkInput = Number(allValues.checks) || 0;
    const creditCardInput = Number(allValues.credit_card) || 0;

    form.setFieldsValue({
      total_paid: cashInput + checkInput + creditCardInput,
    });
  };

  const onFinish = async (values) => {
    try {
      const formData = {
        ...values,
        payment_type: value,
        student_id: userInfo._id,
      };
      // await payments(formData);
      await MDBpayments(formData);

      messageApi.open({
        type: "success",
        content: "Payment added successfully",
      });
      setTimeout(() => {
        navigate(0);
      }, 2000);
    } catch (error) {
      console.error("Error adding payment:", error);
      navigate("/error500");
    }
  };

  const onRadioChange = (e) => {
    console.log("redio checked", e.target.value);
    setValue(e.target.value);
  };

  if (loading) {
    return <Spin fullscreen={true} tip="Loading..." />;
  }

  if (!userInfo)
    return (
      <div>
        <Empty description="User not found" />
      </div>
    );

  return (
    <>
      {contextHolder}
      <Form
        {...layout}
        form={form}
        onValuesChange={handleFormChange}
        onFinish={onFinish}
        className="edit_user_form"
        validateMessages={validateMessages}
        initialValues={userInfo}
      >
        <Form.Item name="student_id" hidden={true}>
          <Input />
        </Form.Item>
        <Form.Item name="pay_date" hidden={true}>
          <Input />
        </Form.Item>
        <Form.Item
          name="first_name"
          label="First Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input disabled={true} />
        </Form.Item>
        <Form.Item
          name="last_name"
          label="Last Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input disabled={true} />
        </Form.Item>

        <div className="payment_group_container">
          <Divider>Payment towards</Divider>

          <Radio.Group
            name="radio_group"
            value={value}
            onChange={onRadioChange}
          >
            <Radio value="bus">באס</Radio>
            <Radio value="wash">וואשן</Radio>
            <Radio value="bus_wash">באס און וואשן</Radio>
          </Radio.Group>
        </div>

        <Form.Item name="cash" label="Cash">
          <Input
            className="cash_input"
            prefix={<BsCurrencyDollar />}
            placeholder="Enter cash amount..."
          />
        </Form.Item>

        <Form.Item name="checks" label="Check">
          <Input
            className="check_input"
            prefix={<BsCurrencyDollar />}
            placeholder="Enter check amount..."
          />
        </Form.Item>

        <Form.Item name="credit_card" label="Credit Card">
          <Input
            className="credit_card_input"
            prefix={<BsCurrencyDollar />}
            placeholder="Enter credit card amount..."
          />
        </Form.Item>

        <Divider></Divider>

        <Form.Item label="Total amount paid" name="total_paid">
          <Input
            value={``}
            className="total_input"
            disabled={true}
            prefix={<BsCurrencyDollar />}
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 16,
          }}
        >
          <div className="payment_option_form_container">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default PaymentOptions;
