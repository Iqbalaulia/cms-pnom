import React, { useEffect, useState, } from 'react';
import { DatePicker, Switch, Table, Col, Button, Space, Form, Input, Row, Layout } from 'antd';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';

import { paginationModel } from 'composables/useSetting';
import { paymentMethodModel } from '../data/setting';

import PnomConfirm from 'components/layout/ConfirmDialog';
import PnomModal from 'components/layout/Modal';
import PnomNotification from 'components/layout/Notification';

const SettingPaymentMethod = () => {
    const { Content } = Layout
    const { RangePicker } = DatePicker
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
            render: (status) => (
              <Space size={8}>
                  <Switch checked={status}/>
              </Space>        
            )
          },
    ]

    useEffect(() => {
      fetchDataSocialMedia()
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

    
    const fetchDataSocialMedia = async () => {
      setLoading(true)

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
                <Row gutter={[24,0]} className='mb-2'>
                  <Col md={{span: 6}}>
                      <Input
                        placeholder="Pencarian..."
                      />  
                  </Col>
                  <Col md={6}>
                        <RangePicker />
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
                              value={formPaymentMethod.social_name}
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
                            <Input
                              value={formPaymentMethod.link} 
                              placeholder="" 
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