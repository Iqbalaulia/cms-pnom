import React, { useState } from 'react';
import { Tabs, Col, Card } from 'antd';

import SettingPayment from './SettingPayment';
import SettingAbout from './SettingAbout';
import SettingContact from './SettingContact';
import SettingSocialMedia from './SettingSocialMedia';
const Setting = () => {
    const { TabPane } = Tabs
    const [header, setHeader] = useState('Metode Pembayaran')

    const callback = (key) => {
        if(key === '1') setHeader('Metode Pembayaran') 
        if(key === '2') setHeader('Kontak')
        if(key === '3') setHeader('Sosial Media')
        if(key === '4') setHeader('Tentang PNOM')
    }
    
    return(
        <>
            <div className='setting-page'>
                <row gutter={[24,0]}>
                    <Col xs={24} xl={24}>
                        <Card 
                        bordered={false}
                        className='criclebox mb-24'
                        >   
                            <h2 className='font-bold'>{header}</h2>
                            <Tabs defaultActiveKey="1" onChange={callback}>
                                <TabPane tab="Metode Pembayaran" key="1">
                                    <SettingPayment/>
                                </TabPane>
                                <TabPane tab="Kontak" key="2">
                                    <SettingContact/>
                                </TabPane>
                                <TabPane tab="Sosial Media" key="3">
                                    <SettingSocialMedia/>
                                </TabPane>
                                <TabPane tab="Tentang PNOM" key="4">
                                    <SettingAbout/>
                                </TabPane>
                            </Tabs>  
                        </Card>
                    </Col>
                </row>
            </div>
        </>
    )
}

export default Setting;