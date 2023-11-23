
import React from 'react';
import { Row, Col, Card, Typography, DatePicker } from 'antd';

import Echart from "components/chart/EChart";
import LineChart from "components/chart/LineChart";


const Dashboard = () => {
    const { Title } = Typography

    return(
        <>
            <div className='layout-content'>
                <div className='filter-date mb-4'>
                <Card>
                    <Row gutter={[24, 0]}>
                        <Col md={6}>
                            <DatePicker placeholder='Tanggal Mulai'/>
                        </Col>
                    </Row>
                </Card>
                </div>
                <Row className="rowgap-vbox" gutter={[24,0]}>
                    <Col
                        xs={24}
                        sm={24}
                        md={12}
                        lg={6}
                        xl={6}
                        className="mb-24"
                    >
                        <Card
                            bordered={false}
                            className='criclebox'
                        >
                            
                            <div className='number'>
                                <Row align='middle' gutter={[24, 0]}>
                                    <Col xs={18}>
                                        <span>Total Pesanan</span>
                                        <Title level={3}>
                                            100 <smal
                                                className='bnb2'
                                            >

                                            </smal>
                                        </Title>
                                    </Col>
                                    <Col xs={6}>
                                        <div className='icon-box'>

                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                    <Col
                        xs={24}
                        sm={24}
                        md={12}
                        lg={6}
                        xl={6}
                        className="mb-24"
                    >
                        <Card
                            bordered={false}
                            className='criclebox'
                        >
                            
                            <div className='number'>
                                <Row align='middle' gutter={[24, 0]}>
                                    <Col xs={18}>
                                        <span>Proses Produksi</span>
                                        <Title level={3}>
                                            100 <smal
                                                className='bnb2'
                                            >

                                            </smal>
                                        </Title>
                                    </Col>
                                    <Col xs={6}>
                                        <div className='icon-box'>

                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                    <Col
                        xs={24}
                        sm={24}
                        md={12}
                        lg={6}
                        xl={6}
                        className="mb-24"
                    >
                        <Card
                            bordered={false}
                            className='criclebox'
                        >
                            
                            <div className='number'>
                                <Row align='middle' gutter={[24, 0]}>
                                    <Col xs={18}>
                                        <span>Selesai Packing</span>
                                        <Title level={3}>
                                            100 <smal
                                                className='bnb2'
                                            >

                                            </smal>
                                        </Title>
                                    </Col>
                                    <Col xs={6}>
                                        <div className='icon-box'>

                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                    <Col
                        xs={24}
                        sm={24}
                        md={12}
                        lg={6}
                        xl={6}
                        className="mb-24"
                    >
                        <Card
                            bordered={false}
                            className='criclebox'
                        >
                            
                            <div className='number'>
                                <Row align='middle' gutter={[24, 0]}>
                                    <Col xs={18}>
                                        <span>Shipping</span>
                                        <Title level={3}>
                                            100 <smal
                                                className='bnb2'
                                            >

                                            </smal>
                                        </Title>
                                    </Col>
                                    <Col xs={6}>
                                        <div className='icon-box'>

                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={[24, 0]}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
                        <Card bordered={false} className="criclebox h-full">
                            <Echart />
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
                        <Card bordered={false} className="criclebox h-full">
                            <LineChart />
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Dashboard