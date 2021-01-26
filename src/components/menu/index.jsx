import React, { memo } from "react";
import { Link } from "react-router-dom";
import { MenuWrap } from "./style";
import { Menu } from 'antd';
import { BuildOutlined, DotChartOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

export default memo(function MenuLeft(props) {
  return (
    <MenuWrap>
      <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
      >
        <SubMenu key="sub1" icon={<DotChartOutlined />} title="系统实况">
            <Menu.Item key="1"><Link to="/dashboard">Dashboard</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<BuildOutlined />} title="数据变更">
          <Menu.Item key="2"><Link to="/blogType">分类管理</Link></Menu.Item>
          <Menu.Item key="3"><Link to="/bannerData">展示数据</Link></Menu.Item>
          <SubMenu key="sub3" title="数据管理">
            <Menu.Item key="4"><Link to="/addBlog">新增</Link></Menu.Item>
            <Menu.Item key="5"><Link to="/editBlog">编辑</Link></Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu key="sub4" icon={<SettingOutlined />} title="系统配置">
          <Menu.Item key="6"><Link to="/user">管理员</Link></Menu.Item>
          <Menu.Item key="7"><Link to="/menu">菜单管理</Link></Menu.Item>
          <Menu.Item key="8"><Link to="/website">网站配置</Link></Menu.Item>
        </SubMenu>
      </Menu>
    </MenuWrap>
  );
});
