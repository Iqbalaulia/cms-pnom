import React, { useState } from 'react';
import { Row, Col, Card, Tabs } from 'antd';

import NewOrder from './NewOrder';
// import ProductionOrder from './ProductionOrder';
// import ShippingOrder from './ShippingOrder';

const OrderPage = () => {
    const { TabPane } = Tabs
    const [ header, setHeader ] = useState('Pesanan Baru')

    function onChangeTabs(item) {
        if(item === '1') setHeader('Pesanan Baru')
        if(item === '2') setHeader('Produksi')
        if(item === '3') setHeader('Pengiriman')
    }

    return(
        <>
            <div className='order-page'>
                <Row gutter={[24,0]}>
                    <Col xs={24} xl={24}>
                        <Card
                            bordered={false}
                            className='criclebox mb-24'
                        >
                            <h2 className='font-bold'>{header}</h2>
                            <Tabs
                                defaultActiveKey='1'
                                onChange={onChangeTabs}
                            >
                                <TabPane
                                    tab="Pesanan Baru"
                                    key="1"
                                >
                                    <NewOrder/>
                                </TabPane>
                                <TabPane
                                    tab="Produksi"
                                    key="2"
                                >
                                    {/* <ProductionOrder/> */}
                                </TabPane>
                                <TabPane
                                    tab="Pengiriman"
                                    key="3"
                                >
                                    {/* <ShippingOrder/> */}
                                </TabPane>
                            </Tabs>

                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default OrderPage