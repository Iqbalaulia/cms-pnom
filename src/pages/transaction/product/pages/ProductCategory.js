import React, { useEffect, useState, } from 'react';
import { Table, Col, Button, Space,Form,Input,Row,Layout } from 'antd';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';

// import { adminModel } from '../data/setting';
import { paginationModel } from 'composables/useSetting';


import PnomModal from 'components/layout/Modal';
import PnomNotification from 'components/layout/Notification';
import PnomConfirm from 'components/layout/ConfirmDialog';

const ProductCategory = () => {
  const { Content } = Layout
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [isModalShow, setIsModalForm] = useState(false)
  const [tableParams, setTableParams] = useState(paginationModel);
//   const [form, setFormData] = useState(adminModel)
  const columns = [
    {
      title: 'No',
      render: (text, record, index) => {
        const current = tableParams.pagination.current; 
        const pageSize = tableParams.pagination.pageSize; 
        const calculatedIndex = (current - 1) * pageSize + index + 1; 
        return calculatedIndex;
      },
      width:'5%'
    },
    {
      title: 'Nama Kategori',
      dataIndex: 'name',
      sorter: true,
      render: (name) => `${name.first} ${name.last}`,
    },
    {
      title: 'Actions',
      render: () => (
        <Space size={8}>
          <Button onClick={handleDeleteData} type="danger" danger ghost icon={<DeleteOutlined />} size={'large'} />
          <Button onClick={handleShowForm} type="primary" icon={<EditOutlined />} size={'large'} />
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

    if (pagination.pageSize !== tableParams.pagination?.pageSize) setData([]);
  };

  
  const fetchData = async () => {
    try {
      setLoading(true);
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
    // setFormData({...adminModel})
  }

  return (
    <div className='admin-table'>
        <row gutter={[24,0]}>
            <Col xs="24" xl={24}>
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
                    <Col md={{span: 24}}>
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
            </Col>
        </row>


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
                        label="Nama"
                        name="name"
                        >
                        <Input 
                          placeholder="Nama Kategori" 
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
export default ProductCategory;