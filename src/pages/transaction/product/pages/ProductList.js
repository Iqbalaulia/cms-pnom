import React, { useEffect, useState, } from 'react';
import { Table, Col, Button, Space, Input, Row, Tag } from 'antd';
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons';

import { paginationModel } from 'composables/useSetting';

import PnomNotification from 'components/layout/Notification';

import { ApiGetRequest } from 'utils/api/config';
import { subStringText } from 'utils/function';

const ProductList = () => {
  const [ data, setData ] = useState([]);
  
  const [ loading, setLoading ] = useState(false);
  
  const [ tableParams, setTableParams ] = useState(paginationModel);
  const [ filterData, setFilterData ] = useState({
    search:''
  })

  const columnsProductList = [
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
  }
    
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
                        columns={columnsProductList}
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
    </div>
  );
};
export default ProductList;