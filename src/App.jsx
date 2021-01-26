import React, {memo} from 'react'
//reducer
import {Provider} from "react-redux";
import store from "@/store";
import {AppWrap} from "./style"
import Login from "./pages/login"
import Layout from "./pages/layout"
import "./assets/css/main.css"
import "antd/dist/antd.less";

const userInfo = JSON.parse(window.localStorage.getItem('user'));

export default memo(function App() {
  return (
      <AppWrap>
        <Provider store={store}>
          {userInfo ? <Layout/> : <Login/>}
        </Provider>
      </AppWrap>
  )
})
