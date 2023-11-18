import React, { useState, } from 'react';
import { Col, Card, Tabs } from 'antd';

import CustomerList from './CustomerList'
import CustomerDropshipper from './CustomerDropship'

const Customer = () => {
    const { TabPane } = Tabs

    const [header, setHeader] = useState('Data Pelanggan')

    function callback(key) {
        if(key === '1') setHeader('Data Pelanggan') 
        if(key === '2') setHeader('Dropshipper')    
    }

    return(
        <>
          <div className='customer-page'>
            <row gutter={[24, 0]}>
                <Col xs={24} xl={24}>
                    <Card
                        bordered={false}
                        className='criclebox mb-24'
                    >
                        <h2 className='font-bold'>{header}</h2>
                        <Tabs defaultActiveKey="1" onChange={callback}>
                            <TabPane tab="Data Pelanggan" key="1">
                                <CustomerList/>
                            </TabPane>
                            <TabPane tab="Dropshipper" key="2">
                                <CustomerDropshipper/>
                            </TabPane>
                        </Tabs>
                    </Card>
                </Col>
            </row>
          </div>  
        </>
    )
}

export default Customer;