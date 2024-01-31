import React, { useEffect, useState, } from 'react';

import { Table, Col, Button, Space, Input, Row, Tag, Select } from 'antd';
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons';

import { paginationModel } from 'composables/useSetting';

import CreateProduct from './action/ProductAction';

import { ApiGetRequest } from 'utils/api/config';
import { subStringText } from 'utils/function';
import { notificationError } from 'utils/general/general';

const ProductList = () => {
  const [ data, setData ] = useState([]);
  const [ dataCategory, setDataCategory ] = useState([])
  const [ loading, setLoading ] = useState(false);
  
  const [ tableParams, setTableParams ] = useState(paginationModel);
  const [ filterData, setFilterData ] = useState({
    search:'',
    categoryUuid: ''
  })
  const [ stepAction, setStepAction ] = useState('')
  const [ dataDetail, setDataDetail ] = useState({})

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
      title: 'Variasi',
      render: (item) => `${item.details.length} Variasi`
    },
    {
      title: 'Rekomendasi',
      render: (item) => (
        <Tag color={item.recommendation !== '0' ? 'green' : 'red'}>{item.recommendation !== '0' ? 'Rekomendasi' : 'Tidak Rekomendasi'}</Tag>
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
      render: (item) => (
        <Space size={8}>
          <Button onClick={() => handleEditForm(item)} type="primary" icon={<EditOutlined />} size={'large'} />
        </Space>        
      )
    },
  ];
  
  useEffect(() => {
    fetchDataProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchDataCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filterData.search, 
    filterData.categoryUuid
  ]);

  const handleOnChangeCategory = (event) => {
    setFilterData({...filterData, categoryUuid: event})
  }
  
  const handleShowForm = () => {
    setStepAction('save-action')
    setDataDetail({})
    // window.location.href = `/product/create`
  }

  const handleEditForm = (item) => {
    setStepAction('update-action')
    setDataDetail(item)
  }

  const handleUpdateStepAction = (value) => {
    setStepAction(value)
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
        search: filterData.search,
        categoryUuid: filterData.categoryUuid
      }

      setLoading(true);
      const response = await ApiGetRequest(`product/item`, params)
      setData(response.data.data) 
    } catch (error) {
      notificationError(error)
    } finally {
      setLoading(false)
    }
  };

  const fetchDataCategory = async () => {
    try {
      setLoading(true);
      const response = await ApiGetRequest(`product/category`)
      setDataCategory(response.data.data.map(element => ({
        value: element.uuid,
        label: element.name
      })))
    } catch (error) {
        notificationError(error)
    } finally {
      setLoading(false)
    }
  };
  

  return (
    <div className='admin-table'>   
        {
            stepAction === `save-action` || stepAction === `update-action` ? <CreateProduct dataDetail={dataDetail} onClickProduct={()=> fetchDataProduct()} onUpdateStep={handleUpdateStepAction} valueStepAction={stepAction} /> : (
            <div>
            <Row gutter={[24,0]}  className='mb-2'>
                      <Col 
                        md={{span: 6}}
                        xs={{ span: 24 }}
                      >
                       <Input
                            value={filterData.search}
                            onChange={
                              (event) => setFilterData({...filterData, search: event.target.value})
                            }
                            placeholder="Pencarian..."
                          />
                      </Col>
                     
                      <Col 
                        md={{span: 6}}
                        xs={{ span: 24 }}
                      >
                          <Select 
                              onChange={handleOnChangeCategory}
                              options={dataCategory}
                              value={filterData.categoryUuid}
                              placeholder='Pilih Kategori'
                            />
                      </Col>
                      <Col
                        md={{span: 6}}
                        xs={{span: 24}}
                      ></Col>
                      <Col
                        md={{span: 3}}
                        xs={{span: 24}}
                      ></Col>
                      <Col 
                        md={{span: 3}}
                        xs={{span: 24}}
                      >
                        <Button  
                            type="primary" 
                            icon={<PlusCircleOutlined />} 
                            className='w-50'
                            onClick={handleShowForm}
                            size="large"
                            block 
                          >
                            Tambah Data
                          </Button>
                      </Col>
                </Row>
                <Row gutter={[24,0]}>
                    <Col md={{span: 24}}>
                        <Table
                          size={'middle'}
                          bordered={true}
                          columns={columnsProductList}
                          dataSource={data}
                          pagination={tableParams.pagination}
                          loading={loading}
                          onChange={handleTableChange}  
                          scroll={{x: 1300}}
                          className='ant-border-space'
                        />
                    </Col>
                </Row>
            </div>
          )
        }
    </div>
  );
};
export default ProductList;