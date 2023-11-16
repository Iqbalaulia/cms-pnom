import React, {useEffect, useState} from 'react';
import { Image, Select, Table, Col, Card, Button, Space,Form,Input,Row,Layout } from 'antd';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined, InboxOutlined } from '@ant-design/icons';
import { DatePicker, Upload  } from 'antd';

import { paginationModel } from 'composables/useSetting';
import { bannerModel } from '../data/setting';

import PnomModal from 'components/layout/Modal';
import PnomNotification from 'components/layout/Notification';
import PnomConfirm from 'components/layout/ConfirmDialog';

function EventBanner() {
    const { Content } = Layout
    const { Dragger } = Upload
    const [ dataTable, setDataTable ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ isModalForm, setIsModalForm ] = useState(false)
    const [ tableParams, setTableParams ] = useState(paginationModel)
    const [ formData, setFormData ] = useState(bannerModel)

    const columns = [
        {
            title: 'No',
            render: (text, record, index) => {
              const current = tableParams.pagination.current; // Nomor halaman saat ini
              const pageSize = tableParams.pagination.pageSize; // Item per halaman
              const calculatedIndex = (current - 1) * pageSize + index + 1; // Hitung nomor "No"
              return calculatedIndex;
            },
            width: '20%'
          },
          {
            title: 'Nama Event',
            dataIndex: 'name_event',
            sorter: true,
            render: (name_event) => `${name_event}`,
          },
          {
            title: 'Tanggal Mulai',
            dataIndex: 'start_date',
            sorter: true,
            render: (start_date) => `${start_date}`,
          },
          {
            title: 'Tanggal Akhir',
            dataIndex: 'end_date',
            sorter: true,
            render: (end_date) => `${end_date}`,
          },
          {
            title: 'Gambar',
            dataIndex: 'images',
            render: () => (
                <Image
                    width={200}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
            ),
          },
          {
            title: 'Actions',
            render: () => (
              <Space size={8}>
                <Button 
                    onClick={handleDeleteData} 
                    type="danger" 
                    danger 
                    ghost 
                    icon={<DeleteOutlined />} 
                    size={'large'} 
                />
                <Button 
                    onClick={handleShowModalForm} 
                    type="primary" 
                    icon={<EditOutlined />} 
                    size={'large'} 
                />
              </Space>        
            )
          },
    ]

    
    useEffect(() => {
        getFetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const resetField = () => {
        setFormData({...bannerModel})
    }

    const handleCancelSubmit = () => {
        setIsModalForm(false);
        resetField()
    }

    const handleShowModalForm = () => {
        setIsModalForm(true)
        resetField()
    }

    const handleSubmit = () => {
        setIsModalForm(false)
        resetField()
        PnomNotification({
            type: 'success',
            message: 'Notification Title',
            description:
            'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        })
    }

    const handleDeleteData = () => {
        PnomConfirm({
            onOkConfirm: handleOkDelete,
            onCancelConfirm: handleCancelDelete,
            content: 'Your confirmation message here'
          })
    }

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        })

        if (pagination.pageSize !== tableParams.pagination?.pageSize) setDataTable([])
    }

    const handleChangeStartDate = (date, dateString) => {
      console.log(date, dateString);
    };

    const handleChangeEndtDate = (date, dateString) => {
      console.log(date, dateString);
    };


    const handleOkDelete = () => {
        console.log('Delete confirmed');
    }

    const handleCancelDelete = () => {
        console.log('Delete canceled'); 
    }

    const getParams = (params) => ({
        results: params.pagination?.pageSize,
        page: params.pagination?.current,
        ...params,
    })

    const getFetchData = async () => {
        try {
            setLoading(true)

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
         <div className='event-banner'>
            <row gutter={[24,0]}>
                <Col xs={24} xl={24}>
                    <Card 
                        bordered={false}
                        className='criclebox mb-24 font-weight-bold'
                    >
                        <h2 className='font-bold'>Banner Acara</h2>
                        <Row gutter={[24,0]}  className='mb-2'>
                            <Col md={{span: 6}}>
                                <Input
                                    placeholder="Pencarian..."
                                />
                            </Col>
                            <Col md={{span: 5}}>
                              <DatePicker placeholder='Tanggal Mulai' onChange={handleChangeStartDate} />
                            </Col>
                            <Col md={{span: 5}}>
                              <DatePicker placeholder='Tanggal Akhir' onChange={handleChangeStartDate} />
                            </Col>
                            <Col md={{span: 8}} className='d-flex justify-end'>
                                <Space align='start'>
                                    <Button  
                                        type="primary" 
                                        icon={<PlusCircleOutlined />} 
                                        className='w-50'
                                        onClick={handleShowModalForm} 
                                        size={'default'} >
                                        Tambah Data
                                    </Button>
                                </Space>
                            </Col>
                        </Row>
                        <Table 
                             size={'middle'}
                             bordered={true}
                             columns={columns}
                             rowKey={(record) => record.id}
                             dataSource={dataTable}
                             pagination={tableParams.pagination}
                             loading={loading}
                             onChange={handleTableChange}
                             className='ant-border-space'
                        />
                    </Card>
                </Col>
            </row>

            
        <PnomModal 
            onOk={handleSubmit} 
            onCancel={handleCancelSubmit} 
            visible={isModalForm}
            width={800}
          >
            <Content className="form-data">
              <Form>
                  <Row gutter={[24,0]}>
                    <Col md={{ span: 12 }}>
                      <Form.Item
                        className="username mb-0"
                        label="Nama Event"
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: "Input data nama!",
                          },
                        ]}>
                        <Input 
                          placeholder="Nama Event" 
                        />
                      </Form.Item>
                      <Form.Item
                        className="username mb-2"
                        label="Tanggal Mulai"
                        name="start_date"
                        rules={[
                          {
                            required: true,
                            message: "Masukkan tanggal mulai!",
                          },
                        ]}>
                          <DatePicker onChange={handleChangeStartDate} />
                      </Form.Item>
                      <Form.Item
                        className="username mb-2"
                        label="Tanggal Akhir"
                        name="end_date"
                        rules={[
                          {
                            required: true,
                            message: "Masukkan tanggal akhir!",
                          },
                        ]}>
                          <DatePicker  onChange={handleChangeEndtDate} />
                      </Form.Item>
                    </Col>
                    <Col md={{ span: 12 }}>
                      <Form.Item
                        className="username mb-2"
                        label="Upload Banner"
                        name="upload_banner"
                        >
                          <Dragger>
                            <p className="ant-upload-drag-icon">
                              <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">
                              Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                              band files
                            </p>
                          </Dragger>,
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

export default EventBanner;