import React, { useEffect, useState, } from 'react';
import { Switch, Select, Table, Col,  Button, Space,Form,Input,Row,Layout } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import { adminModel, roleModel, selectStatusRole, mockDataRole } from '../data/setting';
import { paginationModel } from 'composables/useSetting';

import PnomModal from 'components/layout/Modal';
import PnomNotification from 'components/layout/Notification';
// import PnomConfirm from 'components/layout/ConfirmDialog';

const RoleAdmin = () => {
  const { Content } = Layout
  const [dataTable, setDataTable] = useState();
  const [loading, setLoading] = useState(false);
  const [isModalShow, setIsModalForm] = useState(false)
  const [tableParams, setTableParams] = useState(paginationModel);
  const [form, setFormData] = useState(roleModel)
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
      dataIndex: 'role',
      sorter: true,
      render: (role_name) => `${role_name}`,
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
  
  useEffect(() => {
    fetchData();
  }, []);

  const handleShowForm = () => {
    setIsModalForm(true)
    resetField()
  }
  const handleSubmit = () => {
    setIsModalForm(false);
    resetField()
    PnomNotification({
      type: 'success',
      message: 'Notification Title',
      description:
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    })
  };
  const handleCancelSubmit = () => {
    setIsModalForm(false);
    resetField()
  };
  const handleNonActive = (status) => {
    // PnomConfirm({
    //   onOkConfirm: handleOkDelete,
    //   onCancelConfirm: handleCancelDelete,
    //   content: 'Your confirmation message here'
    // })
  }
  // const handleOkDelete = () => {
  //   console.log('Delete confirmed');
  // }
  // const handleCancelDelete = () => {
  //   console.log('Delete canceled');
  // }
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
      setDataTable(mockDataRole);
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
  };

  const resetField = () => {
    setFormData({...adminModel})
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
          width={800}
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
                          value={form.name} 
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
                          value={form.role}
                          onSelect={value => setFormData(
                            {
                              ...form,
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