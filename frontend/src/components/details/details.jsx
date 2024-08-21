import "./details.css";
import ClosedWeeks from "../closedWeeks/closedWeeks";
import PrintStudentInfo from "../printStudentInfo/printStudentInfo";
import Withdrawals from "../withdrawals/withdrawals";
import { Helmet } from "react-helmet";

const Details = () => {
  return (
    <div className="main_details_container">
      <Helmet>
        <title>Details - Kadishes Yoel Bus & Laundry</title>
      </Helmet>
      <div className="card_container">
        <div>
          <ClosedWeeks />
        </div>
        <div>
          <Withdrawals />
        </div>
        <div>
          <PrintStudentInfo />
        </div>
      </div>
    </div>
  );
};

export default Details;
