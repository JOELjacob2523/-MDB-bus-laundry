import "./zmanGoal.css";
import React, { useState } from "react";
import { Button, Card, Divider, Form, Input, InputNumber, Select } from "antd";
import { BsCurrencyDollar } from "react-icons/bs";
import HebrewDatePicker from "../jewishDtaePicker/hebcalDatePicker";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};
const ZmanGoal = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="zman_goal_container">
      <Card title="Zman information form" className="zman_goal_card">
        <Form {...formItemLayout} variant="filled" className="zman_goal_form">
          <Form.Item
            label="Choose Zman"
            name="zman"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Select
              options={[
                {
                  value: "winter",
                  label: "חורף",
                },
                {
                  value: "summer",
                  label: "קיץ",
                },
              ]}
              allowClear
              placeholder="Choose zman"
            ></Select>
          </Form.Item>
          <Form.Item
            label="Zman starts/ends"
            name="zman_starts_ends"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <HebrewDatePicker />
          </Form.Item>

          <Form.Item
            label="Closed Weeks"
            name="closed_weeks"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter closed weeks..."
              // style={{ direction: "rtl" }}
            />
          </Form.Item>

          <Form.Item
            label="Bus Round Trip Price"
            name="bus_price"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input
              prefix={<BsCurrencyDollar />}
              placeholder="Enter bus round trip price..."
              value="hello"
            />
          </Form.Item>

          <Form.Item
            label="Wash Bag Price"
            name="wash_price"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input
              prefix={<BsCurrencyDollar />}
              placeholder="Enter wash price..."
            />
          </Form.Item>

          <Divider>Total</Divider>

          <Form.Item
            label="Zman Weeks"
            name="total_zman_weeks"
            rules={[
              {
                // required: true,
                message: "Please input!",
              },
            ]}
          >
            <InputNumber disabled={true} />
          </Form.Item>

          <Form.Item
            label="Zman Goal"
            name="total_zman_goal"
            rules={[
              {
                // required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input prefix={<BsCurrencyDollar />} disabled={true} />
          </Form.Item>

          <Form.Item
            label="Bus Goal"
            name="total_bus_goal"
            rules={[
              {
                // required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input prefix={<BsCurrencyDollar />} disabled={true} />
          </Form.Item>

          <Form.Item
            label="Wash Goal"
            name="total_wash_goal"
            rules={[
              {
                // required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input prefix={<BsCurrencyDollar />} disabled={true} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 18,
              // span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default ZmanGoal;
