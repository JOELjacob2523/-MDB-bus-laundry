import "./main_page.css";
import React, { useState } from "react";
import FirstName from "../addUser/addUser";
import FullInfo from "../full_name";
import MonseyStudents from "../monsey_students";
import Sidebar from "../sidebar/sidebar";

const Buttons = ({ cityCounts }) => {
  const [visibility, setVisibility] = useState({
    form: false,
    info: false,
    wili: false,
    bp: false,
    monsey: false,
  });

  const toggleVisibility = (key) => {
    setVisibility((prevVisibility) => ({
      ...prevVisibility,
      [key]: !prevVisibility[key],
    }));
  };

  return (
    <div className="main_container">
      <div>
        <h2 style={{ fontFamily: "OYoelTovia" }}>
          <span>?</span> די קומענדיגע מאל וואס מען פארט אהיים איז פרשת
        </h2>
      </div>

      <div>
        <button
          onClick={() => toggleVisibility("info")}
          className="btn btn-outline-primary btn-lg w-25"
          style={{ height: "150px", fontFamily: "OYoelTovia" }}
        >
          {visibility.info ? "Hide student detail" : "בחורים אינפארמאציע"}
        </button>
        {visibility.info && <FullInfo />}

        <button
          onClick={() => toggleVisibility("form")}
          className="btn btn-outline-primary btn-lg w-25"
          style={{ height: "150px" }}
        >
          {visibility.form ? "Hide add student" : "לייג צו נאך א בחור"}
        </button>
        {visibility.form && <FirstName />}
      </div>

      <div className="">
        <button
          onClick={() => toggleVisibility("wili")}
          className="btn btn-outline-primary btn-lg w-25"
          style={{ height: "150px" }}
        >
          {visibility.wili
            ? "Hide Williamsburg"
            : `עס איז איינגעשריבן ${
                cityCounts.brooklyn || 0
              } בחורים קיין וויליאמסבורג`}
        </button>

        <button
          onClick={() => toggleVisibility("bp")}
          className="btn btn-outline-primary btn-lg w-25"
          style={{ height: "150px" }}
        >
          {visibility.bp
            ? "Hide Boro Park"
            : `עס איז איינגעשריבן ${
                cityCounts.boropark || 0
              } בחורים קיין בארא פארק`}
        </button>

        <button
          onClick={() => toggleVisibility("monsey")}
          className="btn btn-outline-primary btn-lg w-25"
          style={{ height: "150px" }}
        >
          {visibility.monsey
            ? "Hide Monsey"
            : `עס איז איינגעשריבן ${cityCounts.monsey || 0} בחורים קיין מאנסי`}
        </button>
        {visibility.monsey && <MonseyStudents />}
      </div>
    </div>
  );
};

export default Buttons;
