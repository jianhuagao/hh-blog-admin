import React, { memo,useState,useEffect } from "react";
import { Link,useLocation } from "react-router-dom";
import { MenuWrap } from "./style";
import { Menu } from 'antd';
import { BuildOutlined, DotChartOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

export default memo(function MenuLeft(props) {
  //当前页面路径
  const [selectKeys, setSelectKeys] = useState("/dashboard");
  let location = useLocation();
  useEffect(() => {
    setSelectKeys(location.pathname);
  }, [location]);
  return (
    <MenuWrap>
      <Menu
          mode="inline"
          defaultSelectedKeys={selectKeys}
          selectedKeys={selectKeys}
      >
        <SubMenu key="sub1" icon={<DotChartOutlined />} title="系统实况">
            <Menu.Item key="/dashboard"><Link to="/dashboard">Dashboard</Link></Menu.Item>
            <Menu.Item key="/access"><Link to="/access">访问记录</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<BuildOutlined />} title="数据变更">
          <Menu.Item key="/blogType"><Link to="/blogType">分类管理</Link></Menu.Item>
          <Menu.Item key="/bannerData"><Link to="/bannerData">主页推荐</Link></Menu.Item>
          <Menu.Item key="/area"><Link to="/area">板块管理</Link></Menu.Item>
          <Menu.Item key="/imgPool"><Link to="/imgPool">图床管理</Link></Menu.Item>
          <SubMenu key="sub3" title="资讯">
            <Menu.Item key="/addBlog"><Link to="/addBlog/new">资讯发布</Link></Menu.Item>
            <Menu.Item key="/editBlog"><Link to="/editBlog">资讯管理</Link></Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu key="sub4" icon={<SettingOutlined />} title="系统配置">
          <Menu.Item key="/user"><Link to="/user">管理员</Link></Menu.Item>
          <Menu.Item key="/menu"><Link to="/menu">菜单管理</Link></Menu.Item>
          <Menu.Item key="/website"><Link to="/website">网站配置</Link></Menu.Item>
        </SubMenu>
      </Menu>
    </MenuWrap>
  );
});
