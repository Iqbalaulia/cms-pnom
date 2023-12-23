import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Input, Row, Select, Space, Table, Tag } from 'antd';

import { EyeOutlined, CheckCircleOutlined } from '@ant-design/icons';

import { statusModel, paginationModel } from 'composables/useSetting';
import { notificationError } from 'utils/general/general';
import { ApiGetRequest, ApiPutRequest } from 'utils/api/config';


const Notification = () => {
    const [ dataTable, setDataTable ] = useState([])
    const [ tableParams, setTableParams ] = useState(paginationModel)
    const [ loading, setLoading ] = useState(false)
    const [ filterData, setFilterData ] = useState({
        search:"",
        status: null
    })
    const columnsTable =  [
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
            title: 'Judul',
            sorter: true,
            render: (item) => `${item.title}`,
          },
          {
            title: 'Tipe',
            sorter: true,
            render: (item) => `${item.type}`,
          },
          {
            title: 'Deskripsi',
            sorter: true,
            render: (item) => `${item.detail}`,
          },
          {
            title: 'Status',
            sorter: true,
            render: (item) => (
              <Tag color={item.status !== '1' ? 'green' : 'red'}>{item.status !== '1' ? 'Sudah dibaca' : 'Belum dibaca'}</Tag>
            ),
          },
          {
            title: 'Actions',
            render: (item) => (
              <Space size={8}>
                <Button 
                    type={ item.status !== '1' ? 'primary' : 'primary' }
                    disabled={ item.status !== '1' ? true : false } 
                    icon={ item.status !== '1' ? <CheckCircleOutlined /> : <EyeOutlined />} 
                    size={'large'} 
                    ghost
                    onClick={() => handleReadNotification(item.uuid)}
                />
              </Space>        
            )
          },
    ]

    useEffect(() => {
        getFetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

   

    const handleOnChangeStatus = (event) => {
        setFilterData({...filterData, status:event})
        getFetchData()
    }

    const handleReadNotification = async (uuid) => {
        try {
            let params = {
              status: 2
            }
            await ApiPutRequest(`/notification/${uuid}`, params)
            getFetchData()
          } catch (error) {
            notificationError(error)
          }
    }

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        })

        if (pagination.pageSize !== tableParams.pagination?.pageSize) setDataTable([])
    }

    const getFetchData = async () => {
        try {
            setLoading(true)
            let params = {
                status: filterData.status
            }
            const response = await ApiGetRequest(`/notification`, params)
            setDataTable(response.data.data)
        } catch (error) {
            notificationError(error)
        } finally {
            setLoading(false)
        }
    }

    return(
        <>
         <div className='notification-page'>
            <Row gutter={[24, 0]}>
                <Col xs={24} xl={24}>
                    <Card
                        bordered={false}
                        className='criclebox mb-24 font-weight-bold'
                    >

                        <h2 className='font-bold'>Notifikasi</h2>
                        <Row gutter={[24,0]}  className='mb-2'>
                            <Col md={{span: 6}}>
                                <Input
                                    placeholder="Pencarian..."
                                   
                                />
                            </Col>
                            <Col md={{span: 4}}>
                              <Select
                                value={filterData.status}
                                options={statusModel}
                                onChange={handleOnChangeStatus}
                                placeholder='Pilih Status'
                              />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={24} xl={24}>
                                <Table
                                 size={'middle'}
                                 bordered={true}
                                 columns={columnsTable}
                                 dataSource={dataTable}
                                 loading={loading}
                                 onChange={handleTableChange}
                                 rowKey={(record) => record.uuid}
                                 pagination={tableParams.pagination}
                                 className='ant-border-space'
                                />
                            </Col>
                        </Row>

                    </Card>
                </Col>
            </Row>
         </div>

        </>
    )
}

export default Notification