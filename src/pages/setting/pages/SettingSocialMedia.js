import React, { useEffect, useState, } from 'react';
import { Table, Col, Button, Space, Form, Input, Row, Layout } from 'antd';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';

import { paginationModel } from 'composables/useSetting';
import { socialMediaModel, mockDataTableSosmed } from '../data/setting';

import PnomConfirm from 'components/layout/ConfirmDialog';
import PnomModal from 'components/layout/Modal';
import PnomNotification from 'components/layout/Notification';

const SettingSocialMedia = () => {
    const { Content } = Layout
    const [tableParams, setTableParams] = useState(paginationModel);
    const [dataTable, setDataTable] = useState();
    const [isModalShow, setIsModalShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formSocialMedia, setFormSocialMedia] = useState(socialMediaModel);
    const columnsSocialMedia = [
        {
            title: 'No',
            width:'5%',
            render: (text, record, index) => {
              const current = tableParams.pagination.current; // Nomor halaman saat ini
              const pageSize = tableParams.pagination.pageSize; // Item per halaman
              const calculatedIndex = (current - 1) * pageSize + index + 1; // Hitung nomor "No"
              return calculatedIndex;
            },
          },
          {
            title: 'Sosial Media',
            dataIndex: 'name',
            width:'20%',
            sorter: true,
            render: (name) => `${name}`,
          },
          {
            title: 'Link',
            dataIndex: 'link',
            render: (link) => (
              <a href='#'>{link}</a>
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
      setDataTable(mockDataTableSosmed)
      setLoading(false)
    }

    const resetField = () => {
      setFormSocialMedia({...socialMediaModel})
    }
    // const onChangeForm = e => {
    //   const { name, value } = e.target
    //   setFormSocialMedia(prevState => ({...prevState, [name]: value}) )
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
                            columns={columnsSocialMedia}
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
                            label="Nama Sosial Media"
                            name="socialMediaName"
                            >
                            <Input 
                              value={formSocialMedia.social_name}
                              placeholder="Masukkan Sosial Media" 
                            />
                          </Form.Item>
                        </Col>
                        <Col md={{ span: 12}}>
                          <Form.Item
                            className="username mb-0"
                            label="Link Sosial Media"
                            name="socialMediaLink"
                            >
                            <Input
                              value={formSocialMedia.link} 
                              placeholder="Masukkan Link Sosial Media" 
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

export default SettingSocialMedia