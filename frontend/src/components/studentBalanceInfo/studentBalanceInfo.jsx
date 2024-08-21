import "./studentBalanceInfo.css";
import React from "react";
import { Divider, Popover, Space } from "antd";
import { FiInfo } from "react-icons/fi";

const StudentBalanceInfo = ({ payment }) => {
  const parseValue = (value) => {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  };

  const formatPaymentType = (paymentType) => {
    if (!paymentType) return "N/A";
    return paymentType
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" & ");
  };

  const aggregatedPayment = payment.reduce(
    (acc, pay) => {
      acc.cash += parseValue(pay.cash);
      acc.checks += parseValue(pay.checks);
      acc.credit_card += parseValue(pay.credit_card);
      acc.payment_type = formatPaymentType(pay.payment_type);
      acc.pay_date = acc.pay_date || pay.pay_date || "N/A";
      acc.total_paid += parseValue(pay.total_paid);
      return acc;
    },
    {
      cash: 0,
      checks: 0,
      credit_card: 0,
      total_paid: 0,
      payment_type: "N/A",
    }
  );

  const content = (
    <div className="main_content_container">
      <div className="content_container">
        <div className="content_inner">
          <div>
            <strong>Cash:</strong>{" "}
          </div>
          <div> ${aggregatedPayment.cash.toFixed(2)}</div>
        </div>
        <div className="content_inner">
          <div>
            <strong>Check:</strong>{" "}
          </div>
          <div>${aggregatedPayment.checks.toFixed(2)}</div>
        </div>
        <div className="content_inner">
          <div>
            <strong>Credit Card:</strong>
          </div>
          <div>${aggregatedPayment.credit_card.toFixed(2)}</div>
        </div>
        <div className="content_inner">
          <div>
            <strong>Payment Type:</strong>
          </div>{" "}
          <div>{aggregatedPayment.payment_type} </div>
        </div>
        <div className="content_inner">
          <div>
            <strong>Date:</strong>
          </div>
          <div>{aggregatedPayment.pay_date || "N/A"} </div>
        </div>
      </div>
      <Divider />
      <div className="total_balance_info">
        <strong>Total:</strong> ${aggregatedPayment.total_paid.toFixed(2)}
      </div>
    </div>
  );

  return (
    <div>
      <Space>
        <Popover
          content={content}
          title="Payment Information"
          trigger="click"
          className="balance_info_popover"
        >
          <FiInfo />
        </Popover>
      </Space>
    </div>
  );
};

export default StudentBalanceInfo;
