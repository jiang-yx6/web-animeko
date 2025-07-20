import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Button } from "antd";
import "./Header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="header-left">
        <div className="logo">AniMeko</div>
      </div>
      <div className="header-center">
        <div className="search-container">
          <Input placeholder="输入想要的动画" />
          <Button type="primary" icon={<SearchOutlined />}>
            Search
          </Button>
        </div>
      </div>
      <div className="header-right">
        <nav className="header-right-nav">
          <ul>
            <li>
              <a href="#">
                <span>首页</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>登录</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>注册</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}