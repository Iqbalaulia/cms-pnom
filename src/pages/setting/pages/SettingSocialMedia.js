import React, { useEffect, useState, } from 'react';
import { Select, Table, Col, Button, Space, Form, Input, Row, Layout, Tag, Image } from 'antd';
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons';

import { paginationModel, statusModel } from 'composables/useSetting';
import { contactModel } from 'utils/models/SettingModels';
import { notificationError } from 'utils/general/general';

import { ApiGetRequest, ApiPostMultipart, ApiPostRequest, ApiPutRequest } from 'utils/api/config';

import PnomModal from 'components/layout/Modal';
import PnomNotification from 'components/layout/Notification';

const SettingSocialMedia = () => {
    const { Content } = Layout
    
    const [ isStepAction, setStepAction ] = useState('save-data')
    const [ isUuid, setUuid ] = useState('')
    const [ dataTable, setDataTable ] = useState();
    const [ parentUuid, setParentUuid ] = useState(null);
    const [ selectedFile, setSelectedFile ] = useState(null);
    const [ isModalShow, setIsModalShow ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ formData, setFormData ] = useState(contactModel);
    const [ tableParams, setTableParams ] = useState(paginationModel);
    const [ filterData, setFilterData ] = useState({
      search:"",
      status: null
    })
    const columnsSocialMedia = [
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
            title: 'Nama Sosial Media',
            sorter: true,
            render: (item) => (
              <label className=''>{item.value}</label>
            )
          },
          {
            title: 'Tipe',
            sorter: true,
            render: (item) => (
              <label className='text-capitalize'>{item.name}</label>
            )
          },
          {
            title: 'Status',
            render: (item) => (
              <Tag color={item.status !== '0' ? 'green' : 'red'}>{item.status !== '0' ? 'Aktif' : 'Tidak Aktif'}</Tag>
            ),
            
          },
          {
            title: 'Gambar',
            render: (item) => (
                <Image
                    width={80}
                    src={item.imageThumb}
                />
            ),
          },
          {
            title: 'Actions',
            width: '20%',
            render: (item) => (
              <Space size={8}>
                <Button onClick={() => handleEditModalForm(item)} type="primary" ghost icon={<EditOutlined />} size={'large'} />
              </Space>        
            )
          },
    ]

    useEffect(() => {
      getDataSocialMedia()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleShowForm = () => {
       setIsModalShow(true)
       setStepAction('save-data')
       handleResetField()
    }
    const handleEditModalForm = (item) => {
      setFormData({
        ...formData,
        name: item.name,
        value: item.value,
        status: item.status,
        parentUuid: parentUuid
      })
      setUuid(item.uuid)
      setIsModalShow(true)
      setStepAction('update-data')
    }
    const handleSubmit = () => {
      if(isStepAction === `save-data`)  saveDataForm()
      if(isStepAction === `update-data`) updateDataForm(isUuid)
        
      setIsModalShow(false)
      handleResetField()
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
    const handleResetField = () => {
      setFormData({...contactModel})
      setSelectedFile(null)
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
    const handleOnChangeStatus = (event) => {
      setFilterData({...filterData, status:event})
      getDataSocialMedia()
    }

 
    const getDataSocialMedia = async () => {
      try {
        setLoading(true)
        let params = {
          name: 'sosmed',
          search: filterData.search,
          status:filterData.status
        }

        const response = await ApiGetRequest(`setting`, params)
        setDataTable(response.data.data.child)
        setParentUuid(response.data.data.uuid)
      
      } catch (error) {
        notificationError(error)
      } finally {
        setLoading(false)
      }
    }
    const saveDataForm = async () => {
      try {
        setLoading(true)

        let formDataPayment = {
          parentUuid: parentUuid,
          name: formData.name,
          value: formData.value,
          image: formData.image,
          status: formData.status
        }

        await ApiPostRequest(`setting`, formDataPayment)
        PnomNotification({
          type: 'success',
          message: 'Berhasil disimpan!',
          description:'Data kontak berhasil disimpan!',
        })
        getDataSocialMedia()
      } catch (error) {
        notificationError(error)
      } finally {
        setLoading(false)
      }
    }
    const updateDataForm = async (uuid) => {
      try {
        setLoading(true)
        await ApiPutRequest(`setting/${uuid}`, formData)
        PnomNotification({
          type: 'success',
          message: 'Berhasil diupdate!',
          description:'Data admin berhasil diupdate!',
        })
        await getDataSocialMedia()
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
            <div className='setting-payment'>
                <Row className='mb-2'>
                  <Col md={{span: 6}}>
                      <Input
                        placeholder="Pencarian..."
                      />  
                  </Col>
                  <Col className='px-2' md={{span: 6}}>
                    <Select
                      value={filterData.status}
                      onChange={handleOnChangeStatus}
                      options={statusModel}
                      placeholder='Pilih Status'
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
                  width={600}
                >
                  <Content className='form-data'>
                    <Form>
                      <Row gutter={[24,0]}>
                      <Col md={{ span: 24 }}>
                          <Form.Item
                            className="username mb-0"
                            label="Sosial Media"
                            >
                            <Input 
                              value={formData.value}
                              onChange={(e) => setFormData({...formData, value: e.target.value})}
                              placeholder="Sosial Media" 
                            />
                          </Form.Item>
                        </Col>
                        <Col md={{ span: 24 }}>
                          <Form.Item
                            className="username mb-0"
                            label="Tipe"
                            >
                            <Input 
                              value={formData.name}
                              onChange={(e) => setFormData({...formData, name: e.target.value})}
                              placeholder="Tipe" 
                            />
                          </Form.Item>
                        </Col>
                        <Col md={{ span: 24}}>
                          <Form.Item
                            className="username mb-0"
                            label="Status"
                            >
                              <Select
                               value={formData.status}
                               onSelect={(e) => setFormData(
                                 {
                                   ...formData,
                                   status: e
                                 }
                               )} 
                               placeholder="Status"
                               options={statusModel}
                              />
                          </Form.Item>
                        </Col>
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
            </div>
        </>
    )
}

export default SettingSocialMedia