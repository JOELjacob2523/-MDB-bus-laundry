import "./withdrawals.css";
import React, { useState } from "react";
import { Button, Card, Drawer } from "antd";
import { BiMoneyWithdraw } from "react-icons/bi";
import WithdrawalForm from "./withdrawalForm";

const Withdrawals = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <>
      <div>
        <Card
          title={<div className="modal_title">באצאלן אינפארמאציע</div>}
          className="zman_goal_card"
        >
          <div className="zman_goal_description">
            דרוק דא ארויסצונעמען באס / וואשן געלט
          </div>
          <Button className="add_zman_goal_btn" onClick={showDrawer}>
            <BiMoneyWithdraw />
          </Button>
        </Card>
      </div>
      <Drawer
        title={<div className="modal_title">באצאלן אינפארמאציע</div>}
        width={700}
        open={open}
        onClose={closeDrawer}
        footer={null}
        className="withdrawals_drawer"
      >
        <div className="withdrawal_form">{<WithdrawalForm />}</div>
      </Drawer>
    </>
  );
};
export default Withdrawals;
