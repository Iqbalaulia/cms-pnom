import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import PnomModal from './components/layout/Modal'

ReactDOM.render(
  <BrowserRouter>
    <PnomModal modalVisible={false}/>
    <App />
  </BrowserRouter>,
  document.getElementById("root"),
);
