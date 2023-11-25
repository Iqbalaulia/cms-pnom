import React, { useEffect, useState } from 'react';

import { Typography, DatePicker, Card, Table, Col, Input, Row } from 'antd';

import { paginationModel } from 'composables/useSetting';
import { mockDataTransaction } from '../data/setting';

import PnomNotification from 'components/layout/Notification';

const Transaction = () => {
    const { RangePicker } = DatePicker
    const { Title } = Typography;

    const [dataTable, setDataTable] = useState()
    const [tableParams, setTableParams] = useState(paginationModel)
    const [loading, setLoading] = useState(false)

    const columnsCustomer = [
        {
            title: 'No',
            width: '5%',
            render: (text, record, index) => {
              const current = tableParams.pagination.current; 
              const pageSize = tableParams.pagination.pageSize; 
              const calculatedIndex = (current - 1) * pageSize + index + 1; 
              return calculatedIndex;
            },
        },
        {
            title:'No Pesanan',
            dataIndex: 'no_pesanan',
            width:'30%'
        },
        {
            title: 'No Resi',
            dataIndex:'no_resi'
        },
        {
            title:'Status Pesanan',
            dataIndex:'status_order',
            width:'20%'
        },
        {
            title:'Status Resi',
            dataIndex:'status_shipping'
        },
        {
            title:'Opsi Pengiriman',
            dataIndex:'expedition'
        },
        {
            title:'Metode Pembayaran',
            dataIndex:'payment_method'
        },
       
    ]


    useEffect(() => {
        getFetchData()
    },[])

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,

            ...sorter
        })

        if (pagination.pageSize !== tableParams.pagination?.pageSize) setDataTable([])
    }

    const getFetchData = () => {
        try {
            setLoading(true)
            setDataTable(mockDataTransaction)
            setLoading(false)
        } catch (error) {
            PnomNotification({
                type: 'error',
                message: 'Maaf terjadi kesalahan!',
                description:error
            })
        } finally {
            setLoading(false)
        }
    }

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
                                onChange={handleTableChange}
                                dataSource={dataTable}
                                scroll={{
                                    x: 1000,
                                    y: 1000,
                                }}
                            />
                        </Col>
                    </Row>
                </Card>
            </div>
        </>
    )
}

export default Transaction