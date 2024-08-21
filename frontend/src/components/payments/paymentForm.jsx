import React, { useState } from "react";
import { Button, Form, Input, Select, Modal, Spin } from "antd";
import { paymentForm } from "../../servers/postRequest";
import { useNavigate } from "react-router-dom";
import { BsCurrencyDollar } from "react-icons/bs";

const { Option } = Select;

const years = [];
const currentYear = new Date().getFullYear();
for (let i = 0; i < 20; i++) {
  const year = currentYear + i;
  const lastTwoDigits = year.toString().slice(-2);
  years.push(lastTwoDigits);
}

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

const PaymentForm = () => {
  const [loading, setLoading] = useState(false);
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    expirationMonth: "",
    expirationYear: "",
    cvv: "",
    cardholderName: "",
    cardholderStreet: "",
    cardholderZip: "",
    description: "",
    amount: "",
  });

  const navigate = useNavigate();

  const handleChange = (e, fieldName) => {
    if (!e || !e.target) {
      console.error("Event or event target is undefined:", e);
      return;
    }
    const { value } = e.target;
    let formattedValue = value;

    setCardInfo((prevState) => ({
      ...prevState,
      [fieldName]: formattedValue,
    }));
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await paymentForm(values);
      Modal.success({
        title: "Success",
        content: "Form filled out successfully",
        footer: null,
      });
      setTimeout(() => {
        navigate(0);
      }, 2000);
    } catch (error) {
      console.error("Error adding form data:", error);
      Modal.error({
        title: "Error",
        content: "Failed to fill out form",
        footer: null,
      });
      setTimeout(() => {
        navigate(0);
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading} tip="Loading...">
      <Form
        {...layout}
        onFinish={handleSubmit}
        style={{ maxWidth: 600 }}
        validateMessages={validateMessages}
      >
        <Form.Item
          name="cardNumber"
          label="Card Number"
          rules={[{ required: true }]}
        >
          <Input
            value={cardInfo.cardNumber}
            onChange={(e) => handleChange(e, "cardNumber")}
            name="cardNumber"
          />
        </Form.Item>
        <Form.Item
          name="expirationMonth"
          label="Expiration Month"
          rules={[{ required: true }]}
        >
          <Select
            defaultValue=""
            onChange={(value) => handleChange(value, "expirationMonth")}
          >
            <Select.Option value="01">Jan</Select.Option>
            <Select.Option value="02">Feb</Select.Option>
            <Select.Option value="03">Mar</Select.Option>
            <Select.Option value="04">Apr</Select.Option>
            <Select.Option value="05">May</Select.Option>
            <Select.Option value="06">Jun</Select.Option>
            <Select.Option value="07">Jul</Select.Option>
            <Select.Option value="08">Aug</Select.Option>
            <Select.Option value="09">Sep</Select.Option>
            <Select.Option value="10">Oct</Select.Option>
            <Select.Option value="11">Nov</Select.Option>
            <Select.Option value="12">Dec</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="expirationYear"
          label="Expiration Year"
          rules={[{ required: true }]}
        >
          <Select
            defaultValue=""
            onChange={(value) => handleChange(value, "expirationYear")}
          >
            {years.map((year) => (
              <Option key={year} value={year}>
                {year}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="cvv" label="CVV" rules={[{ required: true }]}>
          <Input
            value={cardInfo.cvv}
            onChange={(e) => handleChange(e, "cvv")}
            name="cvv"
          />
        </Form.Item>
        <Form.Item
          name="cardholderName"
          label="Cardholder Name"
          rules={[{ required: true }]}
        >
          <Input
            value={cardInfo.cardholderName}
            onChange={(e) => handleChange(e, "cardholderName")}
            name="cardholderName"
          />
        </Form.Item>
        <Form.Item
          name="cardholderStreet"
          label="Cardholder Street"
          rules={[{ required: true }]}
        >
          <Input
            value={cardInfo.cardholderStreet}
            onChange={(e) => handleChange(e, "cardholderStreet")}
            name="cardholderStreet"
          />
        </Form.Item>
        <Form.Item
          name="cardholderZip"
          label="Cardholder Zip"
          rules={[{ required: true }]}
        >
          <Input
            value={cardInfo.cardholderZip}
            onChange={(e) => handleChange(e, "cardholderZip")}
            name="cardholderZip"
          />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true }]}
        >
          <Input.TextArea
            value={cardInfo.description}
            onChange={(e) => handleChange(e, "description")}
            name="description"
          />
        </Form.Item>
        <Form.Item name="amount" label="Amount" rules={[{ required: true }]}>
          <Input
            value={cardInfo.amount}
            onChange={(e) => handleChange(e, "amount")}
            prefix={<BsCurrencyDollar />}
            name="amount"
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 20,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default PaymentForm;
