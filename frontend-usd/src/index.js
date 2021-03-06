import React from "react";
import ReactDOM from "react-dom";
import { ConfigProvider } from "antd";
import pl_PL from "antd/lib/locale-provider/pl_PL";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";
if ("jwtToken" in localStorage) {
  axios.defaults.headers.common = {
    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
  };
}

ReactDOM.render(
  <ConfigProvider locale={pl_PL}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ConfigProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
