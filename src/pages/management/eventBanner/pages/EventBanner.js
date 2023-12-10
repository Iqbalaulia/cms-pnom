import React, {useEffect, useState} from 'react';
import { Select, Image, Table, Col, Card, Button, Space,Form,Input,Row,Layout } from 'antd';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined, InboxOutlined } from '@ant-design/icons';
import { DatePicker, Upload  } from 'antd';

import { paginationModel } from 'composables/useSetting';
import { bannerModel } from '../data/setting';

import PnomModal from 'components/layout/Modal';
import PnomNotification from 'components/layout/Notification';
import PnomConfirm from 'components/layout/ConfirmDialog';

import { ApiGetRequest, ApiPostMultipart } from 'utils/api/config';

function EventBanner() {
    const { Content } = Layout
    const { Dragger } = Upload

    const [ dataTable, setDataTable ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ isModalForm, setIsModalForm ] = useState(false)
    const [ tableParams, setTableParams ] = useState(paginationModel)
    const [ formData, setFormData ] = useState(bannerModel)
    const [ filterData, setFilterData ] = useState({
      startDate:"",
      endDate:"",
      search:"",
      status: 1
    })
    const selectStatus = [
      {
        value:1,
        label:'Aktif'
      },
      {
        value:0,
        label:'Tidak Aktif'
      }
    ]
    const columns = [
        {
            title: 'No',
            render: (text, record, index) => {
              const pageNum = tableParams.pagination.pageNum; 
              const pageSize = tableParams.pagination.pageSize; 
              const calculatedIndex = (pageNum - 1) * pageSize + index + 1; 
              return calculatedIndex;
            },
            width: '5%'
          },
          {
            title: 'Nama Event',
            dataIndex: 'name',
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
                    onClick={handleEditModalForm} 
                    type="primary" 
                    icon={<EditOutlined />} 
                    size={'large'} 
                />
              </Space>        
            )
          },
    ]

    let stepAction = 'save-data'

  
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
        stepAction = 'save-data'
    }

    const handleEditModalForm = () => {
      setIsModalForm(true)
      stepAction = 'update-data'
    }

    const handleSubmit = () => {
        if(stepAction === `save-data`)  saveDataForm()
        if(stepAction === `update-data`) updateDataForm()
        
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

    const handleChangeEndDate = (date, dateString) => {
      console.log(date, dateString);
    };

    const handleOkDelete = () => {
        console.log('Delete confirmed');
    }

    const handleCancelDelete = () => {
        console.log('Delete canceled'); 
    }

    const getFetchData = async () => {
        try {
            let params = {
              startDate: filterData.startDate,
              endDate: filterData.endDate,
              search: filterData.search,
              status:filterData.status
            }

            setLoading(true)
            const response = await ApiGetRequest(`banner`, params)
            setDataTable(response.data.data)
        } catch (error) {
            PnomNotification({
                type: 'error',
                message: 'Maaf terjadi kesalahan!',
                description: 'Mohon periksa kembali jaringan anda. Atau menghubungi call center',
            })
        } finally {
            setLoading(false)
        }
    }

    const saveDataForm = async () => {
      try {
        setLoading(true)
        await ApiPostMultipart(`banner`, formData)
        
      } catch (error) {
        PnomNotification({
          type: 'error',
          message: 'Maaf terjadi kesalahan!',
          description: error.message,
       })
      } finally {
        setLoading(false)
      }
    }

    const updateDataForm = async () => {
      try {
        setLoading(true)
        await ApiPostMultipart(`banner`, formData)
        
      } catch (error) {
        PnomNotification({
          type: 'error',
          message: 'Maaf terjadi kesalahan!',
          description: error.message,
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
                                    value={filterData.search}
                                    onChange={
                                      (event) => setFilterData({...filterData, search: event.target.value})
                                    }
                                />
                            </Col>
                            <Col md={{span: 5}}>
                              <DatePicker 
                                placeholder='Tanggal Mulai' 
                                onChange={(event) => setFilterData({ ...filterData, startDate: event.target.value })}
                                />
                            </Col>
                            <Col md={{span: 5}}>
                              <DatePicker 
                                placeholder='Tanggal Akhir'  
                                onChange={
                                      (event) => setFilterData({...filterData, endDate: event.target.value})
                                } 
                              />
                            </Col>
                            <Col md={{span: 4}}>
                              <Select
                                value={filterData.status}
                                onChange={
                                  (event) => setFilterData({...filterData, status: event.target.value})
                                }
                                options={selectStatus}
                              />
                            </Col>
                            <Col md={{span: 4}} className='d-flex justify-end'>
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
         </div> 
         <PnomModal 
            onOk={handleSubmit} 
            onCancel={handleCancelSubmit} 
            visible={isModalForm}
            width={600}
          >
            <Content className="form-data">
              <Form>
                  <Row gutter={[24,0]}>
                    <Col md={{ span: 24 }}>
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
                          value={formData.name}
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
                          <DatePicker
                             value={formData.start_date}
                             onChange={handleChangeStartDate} 
                          />
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
                          <DatePicker  
                            value={formData.end_date}  
                            onChange={handleChangeEndDate} 
                          />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={[24,0]}>
                    <Col md={{ span: 24 }}>
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
        </>
    )
}

export default EventBanner;