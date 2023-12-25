import React, {useEffect, useState} from 'react';

import { Select, Table, Col, Button, Space, Form, Input, Row, Layout, Tag } from 'antd';
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons';

import { statusModel, paginationModel } from 'composables/useSetting';

import PnomModal from 'components/layout/Modal';
import PnomNotification from 'components/layout/Notification';

import { ApiGetRequest, ApiPostRequest, ApiPutRequest } from 'utils/api/config';
import { adminModel } from 'utils/models/AdminModels';


const DataAdmin = () => {
    const { Content } = Layout

    const [ dataTable, setDataTable ] = useState([])
    const [ dataRole, setDataRole ] = useState([])

    const [ loading, setLoading ] = useState(false)
    const [ isModalForm, setIsModalForm ] = useState(false)

    const [ isStepAction, setStepAction ] = useState('save-data')
    const [ isUuid, setUuid ] = useState('')

    const [ tableParams, setTableParams ] = useState(paginationModel)
    const [ formData, setFormData ] = useState(adminModel)

    const [ formInputData ] = Form.useForm()
    const [ filterData, setFilterData ] = useState({
      startDate:"",
      endDate:"",
      search:"",
      status: null
    })

    const columnsDataAdmin = [
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
            title: 'Nama',
            sorter: true,
            render: (item) => `${item.name}`,
          },
          {
            title: 'Username',
            sorter: true,
            render: (item) => `${item.login}`,
          },
          {
            title: 'Role',
            sorter: true,
            render: (item) => `${item.role.name}`,
          },
          {
            title: 'Status',
            sorter: true,
            render: (item) => (
              <Tag color={item.status !== '0' ? 'green' : 'red'}>{item.status !== '0' ? 'Aktif' : 'Tidak Aktif'}</Tag>
            ),
          },
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
        setFormData({...adminModel})
    }
    const handleCancelSubmit = () => {
        setIsModalForm(false);
        handleResetField()
    }
    const handleShowModalForm = () => {
        getRoleData()
        setIsModalForm(true)
        handleResetField()
        setStepAction('save-data')
    }
    const handleEditModalForm = (item) => {
      setFormData({
        ...formData,
        name: item.name,
        login: item.login,
        status: parseInt(item.status),
        role_uuid: item.role.uuid,
      });
      getRoleData()
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
    const handleOnChangeStatus = (event) => {
      setFilterData({...filterData, status:event})
      getFetchData()
    }
    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        })

        if (pagination.pageSize !== tableParams.pagination?.pageSize) setDataTable([])
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
            const response = await ApiGetRequest(`admin/account`, params)
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
    const getRoleData = async () => {
      try {
        let params = {
          status:1
        }

        setLoading(true)
        const response = await ApiGetRequest(`admin/role`, params)

        setDataRole(response.data.data.map(element => ({
          value: element.uuid,
          label: element.name
        })));
       
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
        if(validateValue) { 
          setLoading(true)
          let formDataAdmin = {
            name: formData.name,
            login: formData.name,
            password:btoa(formData.password),
            status: formData.status,
            role_uuid: formData.role_uuid
          }
  
          await ApiPostRequest(`admin/account`, formDataAdmin)
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
        await ApiPutRequest(`admin/account/${uuid}`, formData)
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

    const formPassword = (
      <Form.Item
        className="username mb-2"
        label="Password"
        rules={[
          {
            required: true,
            message: "Input data password!",
          },
        ]}>
        <Input 
          value={formData.password}
          onChange={e => setFormData(
            {
              ...formData,
              password: e.target.value
            }
          )}  
          placeholder="Password"
          type='password' />
      </Form.Item>
    )


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
                    bordered={true}
                    columns={columnsDataAdmin}
                    rowKey={(record) => record.id}
                    dataSource={dataTable}
                    pagination={tableParams.pagination}
                    loading={loading}
                    onChange={handleTableChange}
                    className='ant-border-space'
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
                      {
                        isStepAction === 'save-data' ? (formPassword) : ''
                      }
                    </Col>
                    <Col md={{ span: 24 }}>
                      <Form.Item
                        className="username"
                        label="Role"
                        rules={[
                          {
                            required: true,
                            message: "Input data role!",
                          },
                        ]}>

                        <Select
                          placeholder='Pilih Role'
                          value={formData.role_uuid}
                          onSelect={(e) => setFormData(
                            {
                              ...formData,
                              role_uuid: e
                            }
                          )} 
                          options={dataRole}
                        />
                      </Form.Item>
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

export default DataAdmin;