import React from "react";
import { Layout, Icon, Button } from "antd";
import "./HeaderPart.css";

import { useSelector } from 'react-redux'

const { Header } = Layout;

const HeaderPart = props => {
  const content = useSelector(state => state.Carts.orderList)
  
  const toggleCollapse = val => {
    props.resCollapsed(!props.reqCollapsed);
  };

  const toggleCart = () => {
    props.resVisibleCart(true);
  };

  const toggleSearch = () => {
    props.resVisibleSearch(true);
  };

  return (
    <Header style={{ background: "#fff", padding: 0 }}>
      <Icon
        className="trigger"
        type={props.reqCollapsed ? "menu-unfold" : "menu-fold"}
        onClick={toggleCollapse}
      />
      <Button className="header-button" onClick={toggleCart}>
        <Icon className="qty qty-icon" type="shopping-cart"></Icon>
        <div className="qty qty-div">
          <span className="qty-cart">{content.length}</span>
        </div>
      </Button>
      <Button className="header-button" onClick={toggleSearch}>
        <Icon className="qty qty-icon" type="search" />
      </Button>
    </Header>
  );
};

export default HeaderPart;
