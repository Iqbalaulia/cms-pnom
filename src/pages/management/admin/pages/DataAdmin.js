import React, { useEffect, useState, } from 'react';
import { Select, Table, Col,  Button, Space,Form,Input,Row,Layout } from 'antd';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';

import { adminModel, selectRole } from '../data/setting';
import { jenisKelaminModel, paginationModel } from 'composables/useSetting';

import { ApiGetRequest, ApiPostRequest } from 'utils/api/config';

import PnomModal from 'components/layout/Modal';
import PnomNotification from 'components/layout/Notification';
import PnomConfirm from 'components/layout/ConfirmDialog';

function DataAdmin() {
  const { Content } = Layout
  const [data, setDataTable] = useState();
  const [loading, setLoading] = useState(false);
  const [isModalShow, setIsModalForm] = useState(false)
  const [tableParams, setTableParams] = useState(paginationModel);
  const [formData, setFormData] = useState(adminModel)
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
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
      render: (name) => `${name.first} ${name.last}`,
      width: '20%',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      filters: [
        {
          text: 'Male',
          value: 'male',
        },
        {
          text: 'Female',
          value: 'female',
        },
      ],
      width: '20%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Actions',
      render: (items) => (
        <Space size={8}>
          <Button onClick={handleDeleteData} type="danger" danger ghost icon={<DeleteOutlined />} size={'large'} />
          <Button onClick={handleEditShowForm(items.uuid)} type="primary" icon={<EditOutlined />} size={'large'} />
        </Space>        
      )
    },
  ];

  let stepAction = 'save-data'
  let uuidData = ''
  
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShowForm = () => {
    stepAction = 'save-data'
    setIsModalForm(true)
    resetField()
  }

  const handleEditShowForm = (uuid) => {
    uuidData = uuid
    stepAction = 'update-data'
    setIsModalForm(true)
    resetField()
  }

  const handleSubmit = () => {
    if (uuidData && stepAction === `update-data`) updateDataForm()
    if (stepAction === `save-data`) saveDataForm()

    setIsModalForm(false);
    resetField()
  };
  const handleCancelSubmit = () => {
    setIsModalForm(false);
    resetField()
  };
  const handleDeleteData = () => {
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

  
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await ApiGetRequest(`admin/account`)
      setDataTable(response.data.data)
      setLoading(false)   
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
      await ApiPostRequest(`admin/account`, formData)
      PnomNotification({
        type: 'success',
        message: 'Notification Title',
        description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      })
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
      await ApiPostRequest(`admin/account/${uuidData}`, formData)
      PnomNotification({
        type: 'success',
        message: 'Notification Title',
        description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      })
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

  const resetField = () => {
    setFormData({...adminModel})
  }

  return (
    <>
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
                    rowKey={(record) => record.login.uuid}
                    dataSource={data}
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
      visible={isModalShow}
      width={600}
    >
      <Content className="form-data">
        <Form>
            <Row gutter={[24,0]}>
              <Col md={{ span: 24 }}>
                <Form.Item
                  className="username mb-0"
                  label="Nama"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Input data nama!",
                    },
                  ]}>
                  <Input 
                    value={formData.name} 
                    onChange={e => setFormData(
                      {
                        ...formData,
                        name: e.target.value
                      }
                    )} 
                    placeholder="Nama" 
                  />
                </Form.Item>
                <Form.Item
                  className="username mb-2"
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Input data email!",
                    },
                  ]}>
                  <Input 
                    value={formData.email}
                    onChange={e => setFormData(
                      {
                        ...formData,
                        email: e.target.value
                      }
                    )}  
                    placeholder="Email" />
                </Form.Item>
              </Col>
              <Col md={{ span: 24 }}>
                <Form.Item
                  className="username"
                  label="Role"
                  name="role"
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
                        role: value
                      }
                    )} 
                    options={selectRole}
                  />
                </Form.Item>
                <Form.Item
                  className="username"
                  label="Jenis Kelamin"
                  name="gender"
                  rules={[
                    {
                      required: true,
                      message: "Input data jenis kelamin!",
                    },
                  ]}>

                  <Select
                    value={formData.gender}
                    onSelect={value => setFormData(
                      {
                        ...formData,
                        gender: value
                      }
                    )} 
                    placeholder="Jenis Kelamin"
                    options={jenisKelaminModel}
                  />
                </Form.Item>
              </Col>
            </Row>
        </Form>
      </Content>
    </PnomModal>
    </>
  );
}

export default DataAdmin;