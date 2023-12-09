import React, { useEffect, useState, } from 'react';
import { Table, Col, Button, Space,Form,Input,Row,Layout } from 'antd';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';

import { productCategoryModel } from '../data/setting';
import { paginationModel } from 'composables/useSetting';


import PnomModal from 'components/layout/Modal';
import PnomNotification from 'components/layout/Notification';
import PnomConfirm from 'components/layout/ConfirmDialog';
import { ApiGetRequest, ApiPostRequest } from 'utils/api/config';

const ProductCategory = () => {
  const { Content } = Layout
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalShow, setIsModalForm] = useState(false)
  const [tableParams, setTableParams] = useState(paginationModel);
  const [formData, setFormData] = useState(productCategoryModel)
  const [filterData, setFilterData] = useState({
    search:''
  })
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
      dataIndex: 'category',
      sorter: true,
      render: (category) => `${category}`,
    },
    {
      title: 'Actions',
      render: () => (
        <Space size={8}>
          <Button onClick={handleDeleteData} type="danger" danger ghost icon={<DeleteOutlined />} size={'large'} />
          <Button onClick={handleEditModalForm} type="primary" icon={<EditOutlined />} size={'large'} />
        </Space>        
      )
    },
  ];

  let stepAction = 'save-data'
  
  useEffect(() => {
    fetchData();
  }, []);

  const handleShowForm = () => {
    stepAction = 'save-data'
    setIsModalForm(true)
    resetField()
  }
  const handleEditModalForm = () => {
    stepAction = 'update-data'
    setIsModalForm(true)
  }
  const handleSubmit = () => {
    setIsModalForm(false);
    if(stepAction === `save-data`)  saveDataForm()
    if(stepAction === `update-data`) updateDataForm()
        
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
      let params = {
        search: filterData.search
      }

      setLoading(true);
      const response = await ApiGetRequest(`product/category`, params)
      setData(response.data.data)
    } catch (error) {
        PnomNotification({
          type: 'error',
          message: 'Maaf terjadi kesalahan!',
          description: 'Mohon periksa kembali jaringan anda. Atau menghubungi call center',
        })
    } finally {
      setLoading(false)
    }
  };
  const saveDataForm = async () => {
    try {
      setLoading(true)
      await ApiPostRequest(`product/category`, formData)
      
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
      await ApiPostRequest(`product/category`, formData)
      
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
    setFormData({...productCategoryModel})
  }

  return (
    <div className='admin-table'>
        <Row gutter={[24,0]}>
            <Col xs="24" xl={24}>
                <Row className='mb-2'>
                      <Col md={{span: 6}}>
                        <Input
                          value={filterData.search}
                          onChange={
                            (event) => setFilterData({...filterData, search: event.target.value})
                          }
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
                        rowKey={(record) => record.id}
                        dataSource={data}
                        pagination={tableParams.pagination}
                        loading={loading}
                        onChange={handleTableChange}
                        className='ant-border-space'
                        />
                    </Col>
                </Row>
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
                        label="Nama"
                        name="name"
                        >
                        <Input
                          value={formData.name}
                          onChange={
                            (event) => setFormData({...formData, name: event.target.value})
                          } 
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