import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { Select, Image, Table, Col, Card, Button, Space,Form,Input,Row,Layout, DatePicker } from 'antd';
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons';

import { paginationModel, statusModel } from 'composables/useSetting';
import { convertDate } from 'composables/useHelper';

import PnomModal from 'components/layout/Modal';
import PnomNotification from 'components/layout/Notification';

import { ApiGetRequest, ApiPostMultipart, ApiPutMultipart } from 'utils/api/config';
import { bannerModel } from 'utils/models/BannerModels';



const EventBanner = () => {
    const { Content } = Layout
    const { TextArea } = Input;

    const [ dataTable, setDataTable ] = useState([])

    const [ isStepAction, setStepAction ] = useState('save-data')

    const [ loading, setLoading ] = useState(false)
    const [ isModalForm, setIsModalForm ] = useState(false)

    const [ selectedFile, setSelectedFile ] = useState(null);
    const [ uuidData, setUuidData] = useState(null)

    const [ tableParams, setTableParams ] = useState(paginationModel)
    const [ formData, setFormData ] = useState(bannerModel)
    const [ filterData, setFilterData ] = useState({
      startAt:"",
      endAt:"",
      search:"",
      status: 1
    })

    const columnsBanner = [
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
            sorter: true,
            render: (item) => `${item.title}`,
          },
          {
            title: 'Tanggal Mulai',
            sorter: true,
            render: (item) => `${moment(item.startAt).format('DD MMMM YYYY')}`,
          },
          {
            title: 'Tanggal Akhir',
            sorter: true,
            render: (item) => `${moment(item.endAt).format('DD MMMM YYYY')}`,
          },
          {
            title: 'Status Banner',
            sorter: true,
            render: (item) => `${item.status === '1' ? 'Aktif' : 'Tidak Aktif'}`,
          },
          {
            title: 'Gambar',
            render: (item) => (
                <Image
                    width={200}
                    src={item.imageThumb}
                />
            ),
          },
          {
            title: 'Actions',
            render: (item) => (
              <Space size={8}>
                <Button 
                    onClick={() => handleEditModalForm(item)} 
                    type="primary"
                    ghost 
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

    const handleFilterStatus = (event) => {
      setFilterData({...filterData, status:event})
      getFetchData()
    }

    const handleFilterEndAt = (event) => {
      setFilterData({...filterData, endAt:event})
      getFetchData()
    }

    const handleFilterStartAt = (event) => {
      setFilterData({...filterData, startAt:event})
      getFetchData()
    }

    const handleResetField = () => {
        setFormData({
          ...formData,
          title:'',
          description:'',
          image:'',
          startAt:'',
          endAt:'',
          actionUrl:'',
          status: 1
        })
    }

    const handleCancelSubmit = () => {
        setIsModalForm(false);
        handleResetField()
    }

    const handleShowModalForm = () => {
        setIsModalForm(true)
        handleResetField()
        setStepAction('save-data')
    }

    const handleEditModalForm = (item) => {
      setFormData({
        ...formData,
        title: item.title,
        startAt: moment(item.startAt),
        endAt:moment(item.endAt),
        status: 1,
        description: item.description
      })

      setUuidData(item.uuid)
      setIsModalForm(true)
      setStepAction('update-data')
    }

    const handleSubmit = () => {
        if(isStepAction === `save-data`)  saveDataForm()
        if(isStepAction === `update-data`) updateDataForm()
        
        setIsModalForm(false)
        handleResetField()
    }

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        })

        if (pagination.pageSize !== tableParams.pagination?.pageSize) setDataTable([])
    }

    const handleUploadImage = async (event) => {
      try {
        const formDataUpload = new FormData();

        setSelectedFile(event.target.files[0])
        
        formDataUpload.append("file", selectedFile, selectedFile.name);

        const response = await ApiPostMultipart(`file-upload`, formDataUpload)

        setFormData({
          ...formData,
          image: response.data.data.filename,
        })
       
      } catch (error) {
        PnomNotification({
          type: 'error',
          message: 'Maaf terjadi kesalahan!',
          description: 'Mohon periksa kembali jaringan anda. Atau menghubungi call center',
        })
      }
    };


 
    const getFetchData = async () => {
        try {
            let params = {
              startAt: filterData.startAt ? convertDate(filterData.startAt) : '',
              endAt: filterData.endAt ? convertDate(filterData.endAt) : '',
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

        let formDataBanner = {
          title: formData.title,
          startAt: convertDate(formData.startAt),
          endAt: convertDate(formData.endAt),
          status: formData.status,
          description: formData.description,
          image: formData.image,
          actionUrl: formData.actionUrl
        }

        await ApiPostMultipart(`banner`, formDataBanner)
        await getFetchData()
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
        
        let formDataBanner = {
          title: formData.title,
          startAt: convertDate(formData.startAt),
          endAt: convertDate(formData.endAt),
          status: formData.status,
          description: formData.description,
          image: formData.image,
          actionUrl: formData.actionUrl
        }


        await ApiPutMultipart(`banner/${uuidData}`, formDataBanner)

        PnomNotification({
          type: 'success',
          message: 'Data berhasil diubah!',
          description: 'Data berhasil diubah',
        })

        await getFetchData()
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
                                onChange={handleFilterStartAt}
                                />
                            </Col>
                            <Col md={{span: 5}}>
                              <DatePicker 
                                placeholder='Tanggal Akhir'  
                                onChange={handleFilterEndAt} 
                              />
                            </Col>
                            <Col md={{span: 4}}>
                              <Select
                                value={filterData.status}
                                onChange={handleFilterStatus}
                                options={statusModel}
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
                             className='ant-border-space'
                             bordered={true}
                             columns={columnsBanner}
                             rowKey={(record) => record.id}
                             dataSource={dataTable}
                             loading={loading}
                             onChange={handleTableChange}
                             pagination={tableParams.pagination}
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
                        rules={[
                          {
                            required: true,
                            message: "Input data nama!",
                          },
                        ]}>
                        <Input 
                          value={formData.title}
                          onChange={(e) => setFormData({...formData, title: e.target.value})}
                          placeholder="Nama Event" 
                        />
                      </Form.Item>
                      <Form.Item
                        className="username mb-2"
                        label="Tanggal Mulai"
                        rules={[
                          {
                            required: true,
                            message: "Masukkan tanggal mulai!",
                          },
                        ]}>
                          <DatePicker
                             value={formData.startAt}
                             onChange={(event) => setFormData({
                              ...formData,
                              startAt: event
                            })} 
                          />
                      </Form.Item>
                      <Form.Item
                        className="username mb-2"
                        label="Tanggal Akhir"
                        rules={[
                          {
                            required: true,
                            message: "Masukkan tanggal akhir!",
                          },
                        ]}>
                          <DatePicker  
                            value={formData.endAt}  
                            onChange={(event) => setFormData({
                              ...formData,
                              endAt: event
                            })} 
                          />
                      </Form.Item>
                      <Form.Item
                        className="username mb-2"
                        label="Url"
                        rules={[
                          {
                            required: true,
                            message: "Masukkan ur;!",
                          },
                        ]}>
                          <Input 
                            value={formData.actionUrl}
                            onChange={(e) => setFormData({...formData, actionUrl: e.target.value})}
                            placeholder="Url" 
                          />
                      </Form.Item>
                      <Form.Item
                            className='username mb-0'
                            label="Deskripsi"
                          >
                            <TextArea 
                              value={formData.description} 
                              rows={4}
                              onChange={
                                e => setFormData({
                                  ...formData,
                                  description: e.target.value
                                })
                              }
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
                        
                          <input type="file" id="file-upload" multiple onChange={handleUploadImage} accept="image/*" />
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