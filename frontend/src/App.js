import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Error500 from "./components/error/error";
import UserLogin from "./userComponents/login/login";
import UserSignup from "./userComponents/signup/signup";
import { checkAuth } from "./servers/userRequests/getUserRequest";
import StudentApp from "./components/studentApp/studentApp";
import CityTotal from "./components/city_total";
import Buses from "./components/buses/buses";
import Details from "./components/details/details";
import MainOldDataPage from "./oldDataComponents/mainOldDataPage/mainOldDataPage";

function App() {
  return (
    <div className="main_root_container">
      <div className="main_page_container">
        <Routes>
          <Route
            path="/"
            element={<UserLogin setIsAuthenticated={checkAuth} />}
          />
          <Route path="home" element={<StudentApp />} loader={checkAuth}>
            <Route index element={<CityTotal />} />
            <Route path="details" element={<Details />} />
            <Route path="buses" element={<Buses />} />
            <Route path="old_data" element={<MainOldDataPage />} />
            <Route path="error500" element={<Error500 />} />
          </Route>
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/error500" element={<Error500 />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
