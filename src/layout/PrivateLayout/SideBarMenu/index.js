import React, { Component } from "react";
import { Menu, Icon } from "antd";
import { findLast } from "lodash";
import { history } from "../../../redux/store";

const sidebarMenu = [
  {
    key: "project",
    text: "Dự án",
    url: "/du-an",
    icon: "project",
  },
  {
    key: "transaction",
    text: "Giao dịch",
    url: "/giao-dich",
    icon: "apartment",
  },
  {
    key: "collaborators",
    text: "Cộng tác viên",
    url: "/ctv",
    icon: "user",
  },
  {
    key: "mail",
    text: "Hộp thư",
    url: "/hop-thu",
    icon: "inbox",
  },
  {
    key: "events",
    text: "Sự kiện",
    url: "/su-kien",
    icon: "schedule",
  },
  {
    key: "education",
    text: "Đào tạo",
    url: "/dao-tao",
    icon: "audit",
  },
  {
    key: "online-support",
    text: "Hỗ trợ trực tuyến",
    url: "/ho-tro-truc-tuyen",
    icon: "solution",
  },
  {
    key: "admin",
    text: "Administrator",
    url: "/quan-ly",
    icon: "tool",
  },
  {
    key: "Partner",
    text: "Partner",
    url: "/partner",
    icon: "team",
  },
  {
    key: "role",
    text: "Vai trò",
    url: "/vai-tro",
    icon: "safety-certificate",
  },
];

export default class SideBarMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultSelectedKeys:
        findLast(
          sidebarMenu,
          menu => window.location.pathname.indexOf(menu.url) === 0,
        ) || {key: 'dashboard'},
    };
  }

  render() {
    return (
      <Menu
        mode="inline"
        defaultSelectedKeys={[this.state.defaultSelectedKeys.key]}
      >
        <Menu.SubMenu
          key="dashboard"
          onClick={() => history.push("/")}
          title={(
            <span>
              <Icon type="dashboard" />
              <span>Dashboard</span>
            </span>
          )}
        >
          <Menu.Item key="finance" onClick={() => history.push("/")}>
            <span>Tài chính</span>
          </Menu.Item>
          <Menu.Item key="activities" onClick={() => history.push("/")}>
            <span>Hoạt động</span>
          </Menu.Item>
        </Menu.SubMenu>
        {sidebarMenu.map(el => (
          <Menu.Item key={el.key} onClick={() => history.push(el.url)}>
            <span>
              <Icon type={el.icon} />
              <span>{el.text}</span>
            </span>
          </Menu.Item>
        ))}
      </Menu>
    );
  }
}
