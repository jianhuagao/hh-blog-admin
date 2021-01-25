import React, { memo } from "react";
import { Layout as LayoutAnt } from "antd";
import { LayoutWrap } from "./style";
import HeaderChi from "@c/header";
const { Header, Content, Sider } = LayoutAnt;
export default memo(function Layout() {
  return (
    <LayoutWrap>
      <LayoutAnt>
        <Header className="header"><HeaderChi/></Header>
        <LayoutAnt>
          <Sider
            className="sider"
            breakpoint="lg"
            collapsedWidth="0"
          >
            Sider
          </Sider>
          <Content className="content">Content</Content>
        </LayoutAnt>
      </LayoutAnt>
    </LayoutWrap>
  );
});
