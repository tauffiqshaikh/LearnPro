import { Menu } from "antd";
import Link from "next/link";
import {
  AppstoreOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";

const { Item } = Menu; //Menu.Item

const TopNav = () => {
  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    process.browser && setCurrentPage(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  return (
    <Menu mode="horizontal" selectedKeys={[currentPage]}>
      <Item
        key="/"
        onClick={(e) => setCurrentPage(e.key)}
        icon={<AppstoreOutlined />}
      >
        <Link href="/">
          <a>App</a>
        </Link>
      </Item>

      <Item
        key="/login"
        onClick={(e) => setCurrentPage(e.key)}
        icon={<LoginOutlined />}
      >
        <Link href="/login">
          <a>Login</a>
        </Link>
      </Item>
      <Item
        key="/register"
        onClick={(e) => setCurrentPage(e.key)}
        icon={<UserAddOutlined />}
      >
        <Link href="/register">
          <a>Register</a>
        </Link>
      </Item>
    </Menu>
  );
};

export default TopNav;
