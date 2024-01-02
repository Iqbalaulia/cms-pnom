import React, { useEffect, useState, } from 'react';
import { Select, Table, Col, Button, Space,Form,Input,Row,Layout, Tag } from 'antd';
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons';

import { adminModel, roleModel } from '../data/setting';
import { paginationModel } from 'composables/useSetting';

import PnomModal from 'components/layout/Modal';
import PnomNotification from 'components/layout/Notification';

import { ApiGetRequest } from 'utils/api/config';
import { subStringText } from 'utils/function';

const ProductList = () => {
  const { Content } = Layout
  const [data, setData] = useState([]);
  
  const [ loading, setLoading ] = useState(false);
  const [ isModalShow, setIsModalForm ] = useState(false)
  
  const [ tableParams, setTableParams ] = useState(paginationModel);
  const [ form, setFormData ] = useState(adminModel)
  const [ filterData, setFilterData ] = useState({
    search:''
  })
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
      title: 'Nama Produk',
      sorter: true,
      width: '10%',
      render: (item) => `${subStringText(item.name)}`
    },
    {
      title: 'Kategori',
      width: '10%',
      render: (item) => `${item.category.name}`
    },
    {
      title: 'Jumlah Product',
      render: (item) => `${item.details.length + ` ` + ` Produk`}`
    },
    {
      title: 'Rekomendasi',
      render: (item) => (
        <Tag color={item.recommendation !== '0' ? 'green' : 'red'}>{item.recommendation !== '0' ? 'Rekomendasi' : '-'}</Tag>
      ),
    },
    {
      title: 'Status',
      render: (item) => (
        <Tag color={item.status !== '0' ? 'green' : 'red'}>{item.status !== '0' ? 'Aktif' : 'Tidak Aktif'}</Tag>
      ),
    },
    {
      title: 'Actions',
      render: () => (
        <Space size={8}>
          <Button onClick={handleShowForm} type="primary" icon={<EditOutlined />} size={'large'} />
        </Space>        
      )
    },
  ];
  
  useEffect(() => {
    fetchDataProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShowForm = () => {
    window.location.href = `/product/create`
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
  
  
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) setData([]);
  };

  
  const fetchDataProduct = async () => {
    try {
      let params = {
        search: filterData.search
      }

      setLoading(true);
      const response = await ApiGetRequest(`product/item`, params)
      setData(response.data.data) 
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
        <row gutter={[24,0]}>
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
          width={600}
          >
            <Content className="form-data">
              <Form>
                  <Row gutter={[24,0]}>
                    <Col md={{ span: 12 }}>
                      <Form.Item
                        className="username mb-0"
                        label="Nama"
                        name="name"
                        >
                        <Input 
                          placeholder="Nama Produk" 
                        />
                      </Form.Item>
                      <Form.Item
                        className="username mb-2"
                        label="Stok"
                        name="email"
                       >
                        <Input 
                          type='number'
                          placeholder="Stok" />
                      </Form.Item>
                    </Col>
                    <Col md={{ span: 12 }}>
                      <Form.Item
                        className="username"
                        label="Jenis"
                        name="role"
                        >

                        <Select
                          value={form.role}
                          onSelect={value => setFormData(
                            {
                              ...form,
                              role: value
                            }
                          )} 
                          options={roleModel}
                        />
                      </Form.Item>
                      <Form.Item
                        className="username"
                        label="Tipe"
                        name="type"
                        rules={[
                          {
                            required: true,
                            message: "Input data jenis kelamin!",
                          },
                        ]}>

                        <Select
                          
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
export default ProductList;