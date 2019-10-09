import React, { useEffect } from "react";
import { Layout, Row } from "antd";
import "./ContentPart.css";
import ProductCard from "../ProductCard/ProductCard";

// Redux + Axios Fetch Data
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../Public/Redux/Actions/Products";

const { Content } = Layout;

const ContentPart = props => {
  const content = useSelector(state => state.Product.productList);
  const dispatch = useDispatch();

  const FetchData = async () => {
    const result = await getProducts();
    return dispatch(result);
  };

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <Content className="container">
      <Row gutter={8}>
        {content.map((item, index) => {
          return (
            <ProductCard
              key={index}
              id={item.product_id}
              name={item.product_name}
              price={item.product_price}
              stock={item.product_qty}
              image={item.product_image}
            />
          );
        })}
      </Row>
    </Content>
  );
};

export default ContentPart;
