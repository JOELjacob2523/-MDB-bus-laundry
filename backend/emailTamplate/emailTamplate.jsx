const React = require("react");

const EmailTemplate = ({ confirmationNumber }) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      lineHeight: "1.6",
      textAlign: "center",
    }}
  >
    <h1 style={{ color: "#333" }}>Password Reset Confirmation</h1>
    <div style={{ fontSize: "large" }}>
      Your confirmation number is:{" "}
      <strong style={{ color: "#e74c3c" }}>{confirmationNumber}</strong>
    </div>
    <div style={{ marginTop: "20px" }}>
      Please use this number to reset your password.
    </div>
    <div>Thank you!</div>
  </div>
);

module.exports = EmailTemplate;
