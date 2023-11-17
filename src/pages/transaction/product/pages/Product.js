import React, { useEffect, useState, } from 'react';
import { Select, Table, Col, Card, Button, Space,Form,Input,Row,Layout } from 'antd';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';

import { adminModel, roleModel } from '../data/setting';
import { jenisKelaminModel, paginationModel } from 'composables/useSetting';

import { ApiGetRequest } from 'utils/api/config';

import PnomModal from 'components/layout/Modal';
import PnomNotification from 'components/layout/Notification';
import PnomConfirm from 'components/layout/ConfirmDialog';
import qs from 'qs';

const ProductPage = () => {
  const { Content } = Layout
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [isModalShow, setIsModalForm] = useState(false)
  const [tableParams, setTableParams] = useState(paginationModel);
  const [form, setFormData] = useState(adminModel)
  const columns = [
    {
      title: 'No',
      render: (text, record, index) => {
        const current = tableParams.pagination.current; // Nomor halaman saat ini
        const pageSize = tableParams.pagination.pageSize; // Item per halaman
        const calculatedIndex = (current - 1) * pageSize + index + 1; // Hitung nomor "No"
        return calculatedIndex;
      },
      width:'5%'
    },
    {
      title: 'Nama Produk',
      dataIndex: 'name',
      sorter: true,
      render: (name) => `${name.first} ${name.last}`,
      width: '20%',
    },
    {
      title: 'Jenis',
      dataIndex: 'Jenis',
      width: '20%',
    },
    {
      title: 'Tipe',
      dataIndex: 'Tipe',
    },
    {
      title: 'Stok',
      dataIndex: 'Stok',
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      // const result = await ApiGetRequest(`api?${qs.stringify(getRandomuserParams(tableParams))}`)
      // setData(result.data.results)
      // setLoading(false)
      // setTableParams({
      //   ...tableParams,
      //   pagination: {
      //     ...tableParams.pagination,
      //     total: 200,
      //   },
      // });     
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
  const onChangeForm = e => {
    const { name, value } = e.target
    setFormData(prevState => ({...prevState, [name]: value}) )
  }
  const getRandomuserParams = (params) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
  });
  const resetField = () => {
    setFormData({...adminModel})
  }

  return (
    <div className='admin-table'>
        <row gutter={[24,0]}>
            <Col xs="24" xl={24}>
                <Card
                  bordered={false}
                  className="criclebox mb-24 font-weight-bold"
                >
                    <h2 className='font-bold'>Data Produk</h2>
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
                </Card>
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
                    <Col md={{ span: 12 }}>
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
                          value={form.name} 
                          onChange={e => setFormData(
                            {
                              ...form,
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
                          value={form.email}
                          onChange={e => setFormData(
                            {
                              ...form,
                              email: e.target.value
                            }
                          )}  
                          placeholder="Email" />
                      </Form.Item>
                    </Col>
                    <Col md={{ span: 12 }}>
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
                        label="Jenis Kelamin"
                        name="gender"
                        rules={[
                          {
                            required: true,
                            message: "Input data jenis kelamin!",
                          },
                        ]}>

                        <Select
                          value={form.gender}
                          onSelect={value => setFormData(
                            {
                              ...form,
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
    </div>
  );
};
export default ProductPage;