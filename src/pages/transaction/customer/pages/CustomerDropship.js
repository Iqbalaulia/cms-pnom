import React, { useEffect, useState } from 'react';

import { DatePicker, Table, Col, Button, Space, Form, Input, Row, Layout } from 'antd';
import { UserOutlined, PlusCircleOutlined } from '@ant-design/icons';

import { paginationModel } from 'composables/useSetting';
import { mockDataCustomerList } from '../data/setting';

// import PnomConfirm from 'components/layout/ConfirmDialog';
import PnomModal from 'components/layout/Modal';
import PnomNotification from 'components/layout/Notification';

const CustomerList = () => {
    const { Content } = Layout
    const { RangePicker } = DatePicker
    const { TextArea } = Input;

    const [dataTable, setDataTable] = useState()
    const [tableParams, setTableParams] = useState(paginationModel)
    const [isModalShow, setIsModalShow] = useState(false)
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
            title:'Nama',
            dataIndex: 'name'
        },
        {
            title: 'No Telp',
            dataIndex:'phone'
        },
        {
            title:'Tanggal Bergabung',
            dataIndex:'created_date',
            width:'20%'
        },
        {
            title:'Alamat',
            dataIndex:'address'
        },
        {
            title: 'Actions',
            width: '20%',
            render: () => (
              <Space size={8}>
                <Button  type="primary" onClick={handleShowModal} icon={<UserOutlined />} size={'large'} />
              </Space>        
            )
          },
    ]

    useEffect(() => {
        getFetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter
        })
    }

    const handleShowModal = () => {
        setIsModalShow(true)
    }

    const handleOkModal = () => {
        setIsModalShow(false)
    }

    const handleCancelModal = () => {
        setIsModalShow(false)
    }

    const getFetchData = async () => {
        try {
            setLoading(true)
            setDataTable(mockDataCustomerList)
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
            <div className="customer-list">
                <Row gutter={[24,0]} className='mb-2'>
                    <Col md={6}>
                        <Input placeholder='Pencarian...' />
                    </Col>
                    <Col md={6}>
                        <RangePicker />
                    </Col>
                    <Col md={4}></Col>
                    <Col md={{span: 8}} className='d-flex justify-end'>
                                <Space align='start'>
                                    <Button  
                                        type="primary" 
                                        icon={<PlusCircleOutlined />} 
                                        className='w-50'
                                        onClick={handleShowModal} 
                                        size={'default'} >
                                        Tambah Data
                                    </Button>
                                </Space>
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
                            onChange={handleTableChange}
                        />
                    </Col>
                </Row>

                <PnomModal
                    visible={isModalShow}
                    onOk={handleOkModal}
                    onCancel={handleCancelModal}
                    width={600}
                >
                    <Content className='form-data'>
                        <Form>
                            <Row gutter={[24, 0]}>
                                <Col md={{span: 12}}>
                                    <Form.Item
                                        className='username mb-0'
                                        label="Nama"
                                        name='customerName'
                                    >
                                        <Input placeholder='Nama pelanggan'/>
                                    </Form.Item>
                                </Col>
                                <Col md={{span: 12}}>
                                    <Form.Item
                                        className='username mb-0'
                                        label="Np Telp"
                                        name='notelp'
                                    >
                                        <Input type='number' placeholder='Nomor Telepon'/>
                                    </Form.Item>
                                </Col>  
                            </Row>
                            <Row gutter={[24, 0]}>
                                <Col md={{span: 24}}>
                                    <Form.Item
                                        className='username mb-0'
                                        label="Tanggal Bergabung"
                                        name='createdDate'
                                    >
                                        <DatePicker placeholder='Tanggal bergabung'/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[24, 0]}>
                                <Col md={{span: 24}}>
                                    <Form.Item
                                        className='username mb-0'
                                        label="Alamat"
                                        name='address'
                                    >
                                        <TextArea placeholder='Alamat' rows={8} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Content>

                </PnomModal>
            </div>
        </>
    )
}

export default CustomerList