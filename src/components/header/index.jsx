import React, { memo } from "react";
import { Button, Row, Col,Divider,Tooltip } from "antd";
import { useSelector, shallowEqual } from "react-redux";
import { ExportOutlined ,GithubOutlined} from "@ant-design/icons";
import { HeaderWrap } from "./style";
import {useHistory} from "react-router-dom";

export default memo(function Header(props) {
  const history = useHistory();
  const { user } = useSelector(
      (state) => ({
        user: state.getIn(["global", "user"]),
      }),
      shallowEqual
  );
  return (
    <HeaderWrap>
      <Row>
        <Col className="logo" xs={1} sm={1} md={1} lg={1} xl={1}>✨✨✨</Col>
        <Col className="left" xs={0} sm={0} md={8} lg={8} xl={8}>
          HH-BLOG-ADMIN-SYSTEM
        </Col>
        <Col className="right" xs={23} sm={23} md={15} lg={15} xl={15}>
          <Button type="link" style={{color:"white"}}>欢迎回来 : {user.username}</Button>
          <Divider type="vertical" />
          <Tooltip
              title="源码在这里~"
              placement="bottomRight"
              color="#6bcc69"
              defaultVisible
          >
            <Button
                style={{ color: "#6aa086", backgroundColor: "white" }}
                shape="circle"
                icon={<GithubOutlined />}
                href="https://github.com/jianhuagao/hh-blog-admin"
            />
          </Tooltip>
          <Divider type="vertical" />
          <Button
            type="text"
            style={{ color: "white" }}
            icon={<ExportOutlined />
            }
            onClick={e=>{
              window.localStorage.removeItem('user');// 移除
              history.push("/login");
              window.location.reload();
            }}
          />
        </Col>
      </Row>
    </HeaderWrap>
  );
});
