import React from "react";
import { Row, Col, Card } from "antd";

import NewOrder from "./NewOrder";
const OrderPage = () => {
  return (
    <>
      <div className="order-page">
        <Row gutter={[24, 0]}>
          <Col xs={24} xl={24}>
            <Card bordered={false} className="criclebox mb-24">
              <h2 className="font-bold">Pesanan</h2>
              <NewOrder />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default OrderPage;
