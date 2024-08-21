import React, { useState } from "react";
import ForgotPasswordForm from "../forgotPessword/forgotPassword";
import ResetPasswordForm from "../resetPassword/resetPassword";

const ForgotPasswordPage = () => {
  const [showResetForm, setShowResetForm] = useState(false);

  const handleEmailSent = () => {
    setShowResetForm(true);
  };

  <div>
    {!showResetForm ? (
      <ForgotPasswordForm onEmailSent={handleEmailSent} />
    ) : (
      <ResetPasswordForm />
    )}
  </div>;
};

export default ForgotPasswordPage;
