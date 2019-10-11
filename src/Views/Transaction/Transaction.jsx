import React, { useState } from "react";
import { Layout } from "antd";
import HeaderPart from "../../Components/Header/HeaderPart";
import SiderPart from "../../Components/Sider/SiderPart";
import ContentPart from "../../Components/Content/ContentPart";
import DrawerPart from "../../Components/Drawer/DrawerPart";
import "./Transaction.css";

const Transaction = props => {
  const [collapsed, setCollapsed] = useState(true);
  const [visibleSearch, setVisibleSearch] = useState(false);
  const [visibleCart, setVisibleCart] = useState(false);
  
  return (
    <Layout className="full-page">
      <HeaderPart
        reqCollapsed={collapsed}
        resCollapsed={data => setCollapsed(data)}
        reqVisibleCart={visibleCart}
        resVisibleCart={data => setVisibleCart(data)}
        reqVisibleSearch={visibleSearch}
        resVisibleSearch={data => setVisibleSearch(data)}
      />
      <Layout>
        <SiderPart collapsed={collapsed} />
        <ContentPart />
      </Layout>
      <DrawerPart
        reqVisibleCart={visibleCart}
        resVisibleCart={data => setVisibleCart(data)}
        reqVisibleSearch={visibleSearch}
        resVisibleSearch={data => setVisibleSearch(data)}
      />
    </Layout>
  );
};

export default Transaction;
