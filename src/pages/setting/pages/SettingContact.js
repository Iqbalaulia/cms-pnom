import React, { useEffect, useState, } from 'react';
import { Table, Col, Button, Space, Form, Input, Row, Layout } from 'antd';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';

import { paginationModel } from 'composables/useSetting';
import { mockDataTableContact } from '../data/setting';
import { contactModel } from 'utils/models/SettingModels';

import PnomConfirm from 'components/layout/ConfirmDialog';
import PnomModal from 'components/layout/Modal';
import PnomNotification from 'components/layout/Notification';

const SettingContact = () => {
    const { Content } = Layout
    const { TextArea } = Input;
    const [tableParams, setTableParams] = useState(paginationModel);
    const [dataTable, setDataTable] = useState();
    const [isModalShow, setIsModalShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formContact, setFormContact] = useState(contactModel);
    const columnsContact = [
        {
            title: 'No',
            width:'5%',
            render: (text, record, index) => {
              const current = tableParams.pagination.current; 
              const pageSize = tableParams.pagination.pageSize; 
              const calculatedIndex = (current - 1) * pageSize + index + 1; 
              return calculatedIndex;
            },
          },
          {
            title: 'Nama',
            dataIndex: 'name',
            sorter: true,
            render: (name) => `${name}`,
          },
          {
            title: 'Keterangan',
            dataIndex: 'description',
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
      fetchDataContact()
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

    
    const fetchDataContact = async () => {
      setLoading(true)
      setDataTable(mockDataTableContact)
      setLoading(false)
    }

    const resetField = () => {
      setFormContact({...contactModel})
    }
    // const onChangeForm = e => {
    //   const { name, value } = e.target
    //   setFormContact(prevState => ({...prevState, [name]: value}) )
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
                  <Col className='d-flex justify-end' md={{span: 18}}>
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
                            columns={columnsContact}
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
                        <Col md={{ span: 24 }}>
                          <Form.Item
                            className="username mb-0"
                            label="Nama"
                            name="name"
                            >
                            <Input
                              value={formContact.name} 
                              placeholder="Masukkan Sosial Media" 
                            />
                          </Form.Item>
                        </Col>
                        <Col md={{ span: 24}}>
                          <Form.Item
                            className="username mb-0"
                            label="Keterangan"
                            name="description"
                            >
                              <TextArea value={formContact.description} rows={4} />
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

export default SettingContact