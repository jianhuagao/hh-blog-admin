import React, {memo,useEffect} from "react";
import {Layout as LayoutAnt} from "antd";
import {HashRouter as Router, useHistory} from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeUserAction } from "@/global-data/store/actionCreators";
import {LayoutWrap} from "./style";
import HeaderChi from "@c/header";
import MenuChi from "@c/menu";
import ContentHead from "@c/contenthead";
import ContentCard from "@c/contentcard";

const {Header, Content, Sider} = LayoutAnt;
export default memo(function Layout() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = JSON.parse(window.localStorage.getItem('user'));//读取 字符串转换成对象才能使用
  useEffect(()=>{
    const {userid,username} = user;
    if (userid&&username){
      dispatch(changeUserAction({userid,username}));
    }else{
      history.push("/login");
      window.location.reload();
    }
  },[history,user,dispatch])
  return (
      <LayoutWrap>
          <Router>
            <LayoutAnt>
              <Header className="header"><HeaderChi/></Header>
              <LayoutAnt>
                <Sider
                    className="sider"
                    breakpoint="lg"
                    collapsedWidth="0"
                >
                  <MenuChi/>
                </Sider>
                <Content className="content">
                  <ContentHead/>
                  <ContentCard/>
                </Content>
              </LayoutAnt>
            </LayoutAnt>
          </Router>
      </LayoutWrap>
  );
});
