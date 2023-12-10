import React, { useEffect, useState, } from 'react';
import { Switch, Select, Table, Col,  Button, Space,Form,Input,Row,Layout } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import { adminModel, roleModel, selectStatusRole, mockDataRole } from '../data/setting';
import { paginationModel } from 'composables/useSetting';

import PnomModal from 'components/layout/Modal';
import PnomNotification from 'components/layout/Notification';
import { ApiGetRequest, ApiPostRequest } from 'utils/api/config';
import PnomConfirm from 'components/layout/ConfirmDialog';

function RoleAdmin() {
  const { Content } = Layout
  
  const [dataTable, setDataTable] = useState();
  const [loading, setLoading] = useState(false);
  const [isModalShow, setIsModalForm] = useState(false)
  const [tableParams, setTableParams] = useState(paginationModel);
  const [formData, setFormData] = useState(roleModel)
  
  const columns = [
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
      title: 'Role',
      dataIndex: 'role_name',
      sorter: true,
      render: (item) => `${item}`,
    },
    {
      title: 'Status',
      render: (status) => (
        <Space size={8}>
            <Switch onChange={handleNonActive(status)} checked={status}/>
        </Space>        
      )
    },
  ];

  let uuidData = ''

  
  useEffect(() => {
    fetchData();
  }, []);

  const handleShowForm = () => {
    setIsModalForm(true)
    resetField()
  }
  const handleSubmit = () => {
    saveDataForm()
    setIsModalForm(false);
    resetField()
  };
  const handleCancelSubmit = () => {
    setIsModalForm(false);
    resetField()
  };
  const handleNonActive = (status) => {
    updateDataForm(status)
    PnomConfirm({
      onOkConfirm: handleOkDelete,
      onCancelConfirm: handleCancelDelete,
      content: 'Your confirmation message here'
    })
  }
  const handleOkDelete = () => {
    console.log('Delete confirmed');
  }
  const handleCancelDelete = () => {
    console.log('Delete canceled');
  }
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) setDataTable([]);
  };

  const resetField = () => {
    setFormData({...adminModel})
  }

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await ApiGetRequest(`admin/role`)
      setDataTable(response.data.data)
    
    } catch (error) {
      PnomNotification({
        type: 'error',
        message: 'Maaf terjadi kesalahan!',
        description:'Maaf terjadi kesalahan!'
      })
    } finally {
      setLoading(false)
    }
  };

  const saveDataForm = async () => {
    try {
      setLoading(true)
      await ApiPostRequest(`admin/role`, formData)
      
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
      await ApiPostRequest(`admin/role/${uuid}`, formData)
      
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

 

  return (
    <div className='admin-table'>
         <Row className='mb-2'>
            <Col md={{span: 6}}>
                <Input
                    placeholder="Pencarian..."
                />
            </Col>
            <Col md={{span: 18}} className='d-flex justify-end'>
              <Space align='start'>
                <Button  
                    type="primary" 
                    icon={<PlusCircleOutlined />} 
                    className='w-50'
                    onClick={handleShowForm} 
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
                    columns={columns}
                    dataSource={dataTable}
                    pagination={tableParams.pagination}
                    loading={loading}
                    onChange={handleTableChange}
                    className='ant-border-space'
               />      
            </Col>
        </Row>   


        <PnomModal 
          onOk={handleSubmit} 
          onCancel={handleCancelSubmit} 
          visible={isModalShow}
          width={600}
          >
            <Content className="form-data">
              <Form>
                  <Row gutter={[24,0]}>
                    <Col md={{ span: 24 }}>
                      <Form.Item
                        className="username mb-0"
                        label="Role"
                        name="role"
                        >
                        <Input 
                          value={formData.name}
                          onChange={value => setFormData({
                            ...formData,
                            name:value
                          })} 
                          placeholder="Role" 
                        />
                      </Form.Item>
                    </Col>
                    <Col md={{ span: 24 }}>
                      <Form.Item
                        className="username"
                        label="Status"
                        name="status"
                        rules={[
                          {
                            required: true,
                            message: "Input data role!",
                          },
                        ]}>

                        <Select
                          value={formData.role}
                          onSelect={value => setFormData(
                            {
                              ...formData,
                              status: value
                            }
                          )} 
                          options={selectStatusRole}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
              </Form>
            </Content>
        </PnomModal>
    </div>
  );
};
export default RoleAdmin;