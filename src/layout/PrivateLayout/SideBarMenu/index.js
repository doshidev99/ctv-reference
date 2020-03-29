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
    text: "Administrator",
    url: "/admins",
    icon: "tool",
  },
  {
    key: "Partner",
    text: "Cộng tác viên",
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

const subMenuTransaction = [
  {
    key: 'all',
    text: 'Tất cả giao dịch',
    url: '/transactions'
  },
  {
    key: 'processing',
    text: 'Đang xử lý',
    url: '/transactions/processing'
  },
  {
    key: 'completed',
    text: 'Hoàn thành',
    url: '/transactions/completed'
  },
  {
    key: 'canceled',
    text: 'Đã hủy',
    url: '/transactions/canceled'
  }
]

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
        defaultOpenKeys={this.state.defaultSelectedKeys.key === 'transaction' ? ['transaction'] : []}
        location={this.props.children}
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

        <Menu.SubMenu
          key="transaction"
          defaultSelectedKeys="all"
          title={(
            <span>
              <Icon type="apartment" />
              <span>Giao dịch</span>
            </span>
          )}
        >
          {subMenuTransaction.map(subMenu => (
            <Menu.Item key={subMenu.key} onClick={() => history.push(subMenu.url)}>
            <span>{subMenu.text}</span>
          </Menu.Item>
          ))}
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
