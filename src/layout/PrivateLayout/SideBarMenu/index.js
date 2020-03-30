import React, { Component } from "react";
import { Menu, Icon } from "antd";
import { findLast } from "lodash";
import { history } from "../../../redux/store";

const sidebarMenu = [
  {
    key: "property",
    text: "Dự án",
    url: "/projects",
    icon: "project",
  },
  {
    key: "collaborators",
    text: "Người môi giới",
    url: "/realtors",
    icon: "user",
  },
  {
    key: "mail",
    text: "Hộp thư",
    url: "/inbox",
    icon: "inbox",
  },
  {
    key: "events",
    text: "Sự kiện",
    url: "/events",
    icon: "schedule",
  },
  {
    key: "education",
    text: "Đào tạo",
    url: "/trainings",
    icon: "audit",
  },
  {
    key: "online-support",
    text: "Hỗ trợ trực tuyến",
    url: "/online-supports",
    icon: "solution",
  },
  {
    key: "admin",
    text: "Quản trị viên",
    url: "/admins",
    icon: "tool",
  },
  {
    key: "Partner",
    text: "Partner",
    url: "/partners",
    icon: "team",
  },
  {
    key: "option",
    text: "Cài đặt",
    url: "/options",
    icon: "setting",
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
        ) || { key: 'dashboard' },
    };
  }

  render() {
    return (
      <Menu
        mode="inline"
        defaultSelectedKeys={[this.state.defaultSelectedKeys.key]}
        className="sidebarMenu"
      >
        <Menu.Item key="dashboard" onClick={() => history.push("/")}>
          <span>
            <Icon type="dashboard" />
            <span>Dashboard</span>
          </span>
        </Menu.Item>
        <Menu.SubMenu
          key="transaction"
          // onClick={() => history.push("/giao-dich")}
          title={(
            <span>
              <Icon type="apartment" />
              <span>Giao dịch</span>
            </span>
          )}
        >
          <Menu.Item key="transaction" onClick={() => history.push("/transactions")}>
            <span>Tất cả giao dịch</span>
          </Menu.Item>
          <Menu.Item key="processing" onClick={() => history.push("/transactions/processing")}>
            <span>Đang xử lý</span>
          </Menu.Item>
          <Menu.Item key="completed" onClick={() => history.push("/transactions/completed")}>
            <span>Hoàn thành</span>
          </Menu.Item>
          <Menu.Item key="canceled" onClick={() => history.push("/transactions/canceled")}>
            <span>Đã hủy</span>
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
