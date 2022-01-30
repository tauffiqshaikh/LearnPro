import { useState, useEffect, useContext } from "react";
import { Menu } from "antd";
import Link from "next/link";
import {
  AppstoreOutlined,
  CoffeeOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Context } from "../context";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const { Item, SubMenu } = Menu; //Menu.Item

const TopNav = () => {
  const [currentPage, setCurrentPage] = useState("");

  const {state,dispatch} = useContext(Context);
  const {user} = state;

  const router = useRouter();

  useEffect(() => {
    process.browser && setCurrentPage(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  //logout
  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    const { data } = await axios.get("/api/logout");
    toast(data.message);
    router.push("/login");
  };

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

      {user===null && (
        <>
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
        </>
      )}

      {user !== null && (
      <SubMenu icon={<CoffeeOutlined/>} title={user && user.name} className="float-right" >
      <Item
      onClick={logout}
      icon={<LogoutOutlined />}
      className="float-right"
      >
        Logout
      </Item>
      </SubMenu>
      )}

    </Menu>
  );
};

export default TopNav;
