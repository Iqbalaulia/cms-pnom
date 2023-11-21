import React, { useState } from 'react';

import { DatePicker, Table, Col, Button, Space, Form, Input, Row, Layout } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { paginationModel } from 'composables/useSetting';

// import PnomConfirm from 'components/layout/ConfirmDialog';
import PnomModal from 'components/layout/Modal';
// import PnomNotification from 'components/layout/Notification';

const CustomerList = () => {
    const { Content } = Layout
    const { RangePicker } = DatePicker
    // const [dataTable, setDataTable] = useState()
    // const [tableParams, setTableParams] = useState(paginationModel)
    // const [isModalShow, setIsModalShow] = useState(false)
    // const [loading, setLoading] = useState(false)

    const [dataTable] = useState()
    const [tableParams] = useState(paginationModel)
    const [isModalShow] = useState(false)
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
            title:'Nama',
            dataIndex: 'name_customer'
        },
        {
            title: 'No Telp',
            dataIndex:'phone'
        },
        {
            title:'Tanggal Bergabung',
            dataIndex:'created_at',
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
                <Button  type="primary" icon={<UserOutlined />} size={'large'} />
              </Space>        
            )
          },
    ]

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

                <PnomModal
                    visible={isModalShow}
                    width={800}
                >
                    <Content className='form-data'>
                        <Form>
                            <Row gutter={[24, 0]}>
                                <Col md={{span: 12}}>
                                    <Form.Item
                                        className='username mb-0'
                                        label="Nama Customer"
                                        name='customerName'
                                    >
                                        <Input/>
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