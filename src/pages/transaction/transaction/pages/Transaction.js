import React, { useState } from 'react';

import { Typography, DatePicker, Card, Table, Col, Button, Space, Input, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { paginationModel } from 'composables/useSetting';

// import PnomConfirm from 'components/layout/ConfirmDialog';
// import PnomModal from 'components/layout/Modal';
// import PnomNotification from 'components/layout/Notification';

const Transaction = () => {
    // const { Content } = Layout
    const { RangePicker } = DatePicker
    const { Title } = Typography;

    // const [dataTable, setDataTable] = useState()
    // const [tableParams, setTableParams] = useState(paginationModel)

    const [dataTable] = useState()
    const [tableParams] = useState(paginationModel)
    // const [isModalShow, setIsModalShow] = useState(false)
    // const [loading, setLoading] = useState(false)
    const [loading] = useState(false)

    const columnsCustomer = [
        {
            title: 'No',
            width: '5%',
            render: (text, record, index) => {
              const current = tableParams.pagination.current; // Nomor halaman saat ini
              const pageSize = tableParams.pagination.pageSize; // Item per halaman
              const calculatedIndex = (current - 1) * pageSize + index + 1; // Hitung nomor "No"
              return calculatedIndex;
            },
        },
        {
            title:'No Pesanan',
            dataIndex: 'name_customerss'
        },
        {
            title: 'No Resi',
            dataIndex:'phone'
        },
        {
            title:'Status Pesanan',
            dataIndex:'created_at',
            width:'20%'
        },
        {
            title:'Status Resi',
            dataIndex:'address'
        },
        {
            title:'Opsi Pengiriman',
            dataIndex:'address'
        },
        {
            title:'Metode Pembayaran',
            dataIndex:'address'
        },
        {
            title: 'Actions',
            width: '20%',
            render: () => (
              <Space size={8}>
                <Button  type="primary" icon={<UserOutlined />} size={'large'} />
              </Space>        
            )
          },
    ]

    return(
        <>
            <div className='transaction-page'>
                <Row className='rowgap-vbox' gutter={[24,0]}>
                    <Col
                        xs={24}
                        sm={24}
                        md={12}
                        lg={6}
                        xl={6}
                        className="mb-24"
                    >
                        <Card bordered={false} className='criclebox'>
                            <div className='number'>
                                <Row align='middle' gutter={[24,0]}>
                                    <Col xs={18}>
                                        <span>Pesanan</span>
                                        <Title>
                                            xxxx <small>percent</small>
                                        </Title>
                                    </Col>
                                    <Col xs={6}>
                                        <div className='icon-box'></div>
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
                        <Card bordered={false} className='criclebox'>
                            <div className='number'>
                                <Row align='middle' gutter={[24,0]}>
                                    <Col xs={18}>
                                        <span>Pesanan</span>
                                        <Title>
                                            xxxx <small>percent</small>
                                        </Title>
                                    </Col>
                                    <Col xs={6}>
                                        <div className='icon-box'></div>
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
                        <Card bordered={false} className='criclebox'>
                            <div className='number'>
                                <Row align='middle' gutter={[24,0]}>
                                    <Col xs={18}>
                                        <span>Pesanan</span>
                                        <Title>
                                            xxxx <small>percent</small>
                                        </Title>
                                    </Col>
                                    <Col xs={6}>
                                        <div className='icon-box'></div>
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
                        <Card bordered={false} className='criclebox'>
                            <div className='number'>
                                <Row align='middle' gutter={[24,0]}>
                                    <Col xs={18}>
                                        <span>Pesanan</span>
                                        <Title>
                                            xxxx <small>percent</small>
                                        </Title>
                                    </Col>
                                    <Col xs={6}>
                                        <div className='icon-box'></div>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    
                    </Col>
                </Row>
                <Card 
                    bordered={false}
                    className='criclebox mb-24'
                >
                    <h2 className='font-bold'>Data Transaksi</h2>
                    <Row gutter={[24,0]} className='mb-2'>
                        <Col md={6}>
                            <Input placeholder='Pencarian...' />
                        </Col>
                        <Col md={6}>
                            <RangePicker />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} xl={24}>
                            <Table
                                className='ant-border-space'
                                size={'middle'}
                                bordered={true}
                                pagination={tableParams.pagination}
                                columns={columnsCustomer}
                                loading={loading}
                                dataSource={dataTable}
                            />
                        </Col>
                    </Row>
                </Card>
            </div>
        </>
    )
}

export default Transaction