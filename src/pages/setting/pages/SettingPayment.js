import React, { useEffect, useState, } from 'react';
import {Switch, Select, Table, Col, Button, Space, Form, Input, Row, Layout } from 'antd';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';

import { paginationModel } from 'composables/useSetting';
import { paymentMethodModel, filterStatusModel, mockDataTable } from '../data/setting';

import PnomConfirm from 'components/layout/ConfirmDialog';
import PnomModal from 'components/layout/Modal';
import PnomNotification from 'components/layout/Notification';

const SettingPaymentMethod = () => {
    const { Content } = Layout
    const [tableParams, setTableParams] = useState(paginationModel);
    const [dataTable, setDataTable] = useState();
    const [isModalShow, setIsModalShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formPaymentMethod, setFormPaymentMethod] = useState(paymentMethodModel);
    const columnsPayment = [
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
            title: 'Nama Pembayaran',
            dataIndex: 'payment_name',
            sorter: true,
            render: (name) => `${name}`,
          },
          {
            title: 'Status',
            dataIndex: 'status',
            render: (status) => (
              <Switch checked={status}/>
            )
          },
          {
            title: 'Actions',
            width: '20%',
            render: () => (
              <Space size={8}>
                <Button onClick={handleDeleteData} type="danger" danger ghost icon={<DeleteOutlined />} size={'large'} />
                <Button onClick={handleShowForm} type="primary" icon={<EditOutlined />} size={'large'} />
              </Space>        
            )
          },
    ]

    useEffect(() => {
      getDataPaymentMethod()
    }, [])

    const handleDeleteData = () => {
        PnomConfirm({
          onOkConfirm: handleOkDelete,
          onCancelConfirm: handleCancelDelete,
          content: 'Your confirmation message here'
        })
    }
    const handleShowForm = () => {
       setIsModalShow(true)
       resetField()
    }
    const handleOkDelete = () => {
        console.log('Delete confirmed');
    }  
    const handleCancelDelete = () => {
        console.log('Delete canceled');
    }
    const handleSubmit = () => {
      setIsModalShow(false)
      resetField()
      PnomNotification({
        type: 'success',
        message: 'Notification Title',
        description:'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      })
    }
    const handleCancelSubmit = () => {
      setIsModalShow(false)
    }
    const handleTableChange = (pagination, filters, sorter) => {
      setTableParams({
        pagination,
        filters,
        ...sorter,
      });

      if (pagination.pageSize !== tableParams.pagination?.pageSize) setDataTable([]);
    }

    
    const getDataPaymentMethod = async () => {
      setLoading(true)
      setDataTable(mockDataTable)
      setLoading(false)
    }

    const resetField = () => {
      setFormPaymentMethod({...paymentMethodModel})
    }
    // const onChangeForm = e => {
    //   const { name, value } = e.target
    //   setFormPaymentMethod(prevState => ({...prevState, [name]: value}) )
    // }
    return(
        <>
            <div className='setting-payment'>
                <Row className='mb-2'>
                  <Col md={{span: 6}}>
                      <Input
                        placeholder="Pencarian..."
                      />  
                  </Col>
                  <Col className='px-2' md={{span: 6}}>
                    <Select
                      placeholder="Status"
                      options={filterStatusModel}
                    />
                  </Col>
                  <Col className='d-flex justify-end' md={{span: 12}}>
                    <Space align='start'>
                      <Button
                        type='primary'
                        icon={<PlusCircleOutlined/>}
                        className='w-50'
                        onClick={handleShowForm}
                        size={'default'}
                      >
                        Tambah Data
                      </Button>
                    </Space>
                  </Col>
                </Row>
                <row gutter={[24,0]}>
                    <Col xs={24} xl={24}>
                        <Table
                            className='ant-border-space'
                            size={'middle'}
                            bordered={true}
                            dataSource={dataTable}
                            pagination={tableParams.pagination}
                            columns={columnsPayment}
                            loading={loading}
                            onChange={handleTableChange}
                        />
                    </Col>
                </row>


                <PnomModal
                  onOk={handleSubmit}
                  onCancel={handleCancelSubmit}
                  visible={isModalShow}
                  width={800}
                >
                  <Content className='form-data'>
                    <Form>
                      <Row gutter={[24,0]}>
                        <Col md={{ span: 12 }}>
                          <Form.Item
                            className="username mb-0"
                            label="Nama Pembayaran"
                            name="paymentName"
                            >
                            <Input 
                              value={formPaymentMethod.name}
                              placeholder="Masukkan Nama Pembayaran" 
                            />
                          </Form.Item>
                        </Col>
                        <Col md={{ span: 12}}>
                          <Form.Item
                            className="username mb-0"
                            label="Status"
                            name="paymentStatus"
                            >
                              <Select
                              
                              />
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

export default SettingPaymentMethod