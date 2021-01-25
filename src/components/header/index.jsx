import React, { memo } from "react";
import { Button, Avatar, Row, Col,Divider } from "antd";
import { DisconnectOutlined } from "@ant-design/icons";
import { HeaderWrap } from "./style";

export default memo(function Header(props) {
  return (
    <HeaderWrap>
      <Row>
        <Col className="left" xs={0} sm={0} md={8} lg={8} xl={8}>
          HH-BLOG-ADMIN
        </Col>
        <Col className="right" xs={24} sm={24} md={16} lg={16} xl={16}>
          <Avatar style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
            G
          </Avatar>
          <Divider type="vertical" />
          <Button
            type="text"
            style={{ color: "white" }}
            icon={<DisconnectOutlined />
            }
            onClick={e=>{
              window.localStorage.removeItem('user');// 移除
              window.location.reload();
            }}
          />
        </Col>
      </Row>
    </HeaderWrap>
  );
});
