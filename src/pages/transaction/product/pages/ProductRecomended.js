import React, { useEffect, useState, } from 'react';
import { Table, Col, Switch, Space, Input,Row } from 'antd';

import { paginationModel } from 'composables/useSetting';
import { mockDataProductRecomended } from '../data/setting';

import PnomNotification from 'components/layout/Notification';
// import PnomConfirm from 'components/layout/ConfirmDialog';

const ProductRecomended = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState(paginationModel);
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
      title: 'Nama Produk',
      dataIndex: 'product_name',
      sorter: true,
      width: '20%',
    },
    {
      title: 'Jenis',
      dataIndex: 'product_type',
      width: '20%',
    },
    {
      title: 'Tipe',
      dataIndex: 'product_type',
    },
    {
      title: 'Rekomendasi',
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

  const handleNonActive = () => {
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

    if (pagination.pageSize !== tableParams.pagination?.pageSize) setData([]);
  };

  
  const fetchData = async () => {
    try {
      setLoading(true);
      setData(mockDataProductRecomended)
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
        </row>
    </div>
  );
};
export default ProductRecomended;