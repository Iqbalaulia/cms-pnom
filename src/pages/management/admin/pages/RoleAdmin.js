import React, {useEffect, useState} from 'react';

import { Select, Table, Col, Button, Space, Form, Input, Row, Layout, Tag } from 'antd';
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons';

import { paginationModel, rolesPermissionModel, statusModel } from 'composables/useSetting';

import PnomModal from 'components/layout/Modal';
import PnomNotification from 'components/layout/Notification';

import { ApiGetRequest, ApiPostRequest, ApiPutRequest } from 'utils/api/config';
import { roleModel } from 'utils/models/AdminModels';


const RoleAdmin = () => {
    const { Content } = Layout

    const [ dataTable, setDataTable ] = useState([])

    const [ loading, setLoading ] = useState(false)
    const [ isModalForm, setIsModalForm ] = useState(false)

    const [ isStepAction, setStepAction ] = useState('save-data')
    const [ isUuid, setUuid ] = useState('')

    const [ tableParams, setTableParams ] = useState(paginationModel)
    const [ formData, setFormData ] = useState(roleModel)
    const [ filterData, setFilterData ] = useState({
      startDate:"",
      endDate:"",
      search:"",
      status: null
    })
    const [ formInputData ] = Form.useForm()

    const columnsRoleAdmin = [
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
            title: 'Nama Role',
            sorter: true,
            render: (item) => `${item.name}`,
          },
          {
            title: 'Status',
            sorter: true,
            render: (item) => (
              <Tag color={item.status !== '0' ? 'green' : 'red'}>{item.status !== '0' ? 'Aktif' : 'Tidak Aktif'}</Tag>
            ),          },
          {
            title: 'Actions',
            render: (item) => (
              <Space size={8}>
                <Button 
                    onClick={() => handleEditModalForm(item)} 
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

    const handleResetField = () => {
        setFormData({...roleModel})
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
        name: item.name,
        status: parseInt(item.status)
      });
      setUuid(item.uuid)
      setStepAction('update-data')
      setIsModalForm(true)
    }
    const handleSubmit = () => {
        if(isStepAction === `save-data`)  saveDataForm()
        if(isStepAction === `update-data`) updateDataForm(isUuid)
        
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
    const handleOnChangeStatus = (event) => {
      setFilterData({...filterData, status:event})
      getFetchData()
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
            const response = await ApiGetRequest(`admin/role`, params)
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
        const validateValue  = await formInputData.validateFields()
        console.log('validateValue', validateValue)
        if(validateValue) { 
          setLoading(true)
          let formRoleAdmin = {
            name: formData.name,
            permission: rolesPermissionModel.permission
          }
  
          await ApiPostRequest(`admin/role`, formRoleAdmin)
          PnomNotification({
            type: 'success',
            message: 'Berhasil disimpan!',
            description:'Data admin berhasil disimpan!',
          })
          getFetchData()
        }
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
    const updateDataForm = async (uuid) => {
      try {
        setLoading(true)
        let formRoleAdmin = {
          name: formData.name,
          status: formData.status,
          permission: rolesPermissionModel.permission
        }
        await ApiPutRequest(`admin/role/${uuid}`, formRoleAdmin)
        PnomNotification({
          type: 'success',
          message: 'Berhasil diupdate!',
          description:'Data admin berhasil diupdate!',
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
          <div className='admin-table'>
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
                                <Select
                                    value={filterData.status}
                                    onChange={handleOnChangeStatus}
                                    options={statusModel}
                                    placeholder='Pilih Status'
                                  />
                              </Col>
                              <Col md={{span: 5}}>
                              </Col>
                              <Col md={{span: 4}}>
                                
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
            <Row>
              <Col xs={24} xl={24}>
                <Table 
                    size={'middle'}
                    className='ant-border-space'
                    bordered={true}
                    columns={columnsRoleAdmin}
                    dataSource={dataTable}
                    loading={loading}
                    onChange={handleTableChange}
                    rowKey={(record) => record.id}
                    pagination={tableParams.pagination}
                />
              </Col>
            </Row>           
          </div> 

          <PnomModal 
            onOk={handleSubmit} 
            onCancel={handleCancelSubmit} 
            visible={isModalForm}
            width={600}
          >
            <Content className="form-data">
              <Form form={formInputData}>
                  <Row gutter={[24,0]}>
                    <Col md={{ span: 24 }}>
                      <Form.Item
                        className="username mb-0"
                        label="Nama"
                        rules={[
                          {
                            required: true,
                            message: "Input data nama!",
                          },
                        ]}
                      >
                        <Input
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              name: e.target.value,
                            })
                          }
                          placeholder="Nama"
                        />
                      </Form.Item>
                    </Col>
                    <Col md={{ span: 24 }}>
                    <Form.Item
                        className="username"
                        label="Status"
                        rules={[
                          {
                            required: true,
                            message: "Input data jenis status!",
                          },
                        ]}>

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
                  </Row>
              </Form>
            </Content>
          </PnomModal>
        </>
    )
}

export default RoleAdmin;