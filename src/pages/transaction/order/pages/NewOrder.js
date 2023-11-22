import React, { useEffect, useState } from 'react';

import { Upload, DatePicker, Select, Table, Col, Button, Space, Form, Input, Row, Layout } from 'antd';
import { InboxOutlined, CloudDownloadOutlined, CloudUploadOutlined, PlusCircleOutlined } from '@ant-design/icons';

import { paginationModel } from 'composables/useSetting';

import PnomConfirm from 'components/layout/ConfirmDialog';
import PnomModal from 'components/layout/Modal';
import PnomNotification from 'components/layout/Notification';


const NewOrder = () => {
    const { Content } = Layout
    const { RangePicker } = DatePicker
    const { Dragger } = Upload

    const [ dataTable, setDataTable ] = useState([])
    const [ tableParams, setTableParams ] = useState(paginationModel)
    const [ isModalCreate, setIsModalCreate ] = useState(false)
    const [ isModalUpload, setIsModalUpload ] = useState(false)
    const [ loading, setLoading ] = useState(false)

    const columnsOrder = [
        {
            title: 'No',
            width: '5%',
            render: (text, record, index) => {
              const current = tableParams.pagination.current; 
              const pageSize = tableParams.pagination.pageSize; 
              const calculatedIndex = (current - 1) * pageSize + index + 1; 
              return calculatedIndex;
            },
        },
        {
            title:'No Resi',
            dataIndex: 'resi'
        },
        {
            title:'Pesanan',
            dataIndex: 'order'
        },
        {
            title:'Platform',
            dataIndex: 'platform'
        },
        {
            title:'Tanggal Pesanan',
            dataIndex: 'order_date'
        },
        {
            title:'Ekspedisi',
            dataIndex: 'expedition'
        },
        {
            title:'Status',
            width: '20%',
            render: () => (
                <Space size={8}>
                    <Button type='primary' onClick={handleNextProcess} size={'large'}>
                       Proses Selanjutnya
                    </Button>
                </Space>
            )
        }
    ]

    useEffect(() => {

    }, []);


    const handleShowCreate = () => {
        setIsModalCreate(true)
    }
    const handleSubmitCreate = () => {
        setIsModalCreate(false)
        setLoading(true)
        PnomNotification({
            type: 'success',
            message: 'Notification Title',
            description:
            'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        })
    }
    const handleCancelSubmitCreate = () => {
        setIsModalCreate(false)
    }
    const handleNextProcess = () => {
        PnomConfirm({
            onOkConfirm: handleOkNextProcess,
            onCancelConfirm: handleCancelNextProcess,
            content:'Apakah yakin akan memproses pesanan ini?'
        })
    }
    const handleOkNextProcess = () => {
        console.log('Handle Ok')
    }
    const handleCancelNextProcess = () => {
        console.log('Handle Cancel')
    }
    const handleDownloadData = () => {
        PnomNotification({
            type: 'success',
            message: 'Notification Title',
            description:
            'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        })
    }
    const handleShowUpload = () => {
        setIsModalUpload(true)
    }
    const handleCancelUpload = () => {
        setIsModalUpload(false)
    }
    const handleSubmitUpload = () => {
        setIsModalUpload(false)
        setLoading(true)
        PnomNotification({
            type: 'success',
            message: 'Notification Title',
            description:
            'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        })
    }
    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,

            ...sorter
        })

        if (pagination.pageSize !== tableParams.pagination?.pageSize) setDataTable([])
    }
    
    

    return(
        <>
            <div className='new-order'>
                <Row gutter={[24,0]} className='mb-2'>
                    <Col md={20}/>
                    <Col md={4}>
                        <Button
                            onClick={handleDownloadData}
                            type="primary" 
                            icon={<CloudDownloadOutlined />} 
                            block={true}
                            size={'default'} >
                            Download
                        </Button>
                    </Col>
                </Row>
                <Row gutter={[24,0]} className='mb-2'>
                    <Col md={6}>
                        <Input placeholder='Pencairan' />
                    </Col>
                    <Col md={6}>
                        <RangePicker />
                    </Col>
                    <Col md={4}>
                        <Select placeholder="Status"/>
                    </Col>
                    <Col md={4}>
                        <Button  
                            type="primary" 
                            onClick={handleShowUpload}
                            icon={<CloudUploadOutlined />} 
                            block={true}
                            size={'default'} >
                            Upload Excel
                        </Button>
                    </Col>
                    <Col md={4}>
                        <Button 
                            onClick={handleShowCreate} 
                            type="primary" 
                            icon={<PlusCircleOutlined />} 
                            block={true}
                            size={'default'} >
                            Tambah Pesanan
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} xl={24}>
                        <Table
                            className='ant-border-space'
                            size={'middle'}
                            bordered={true}
                            pagination={tableParams.pagination}
                            columns={columnsOrder}
                            loading={loading}
                            onChange={handleTableChange}
                            dataSource={dataTable}
                        />
                    </Col>
                </Row>
            </div>

            <PnomModal
                visible={isModalCreate}
                onCancel={handleCancelSubmitCreate}
                onOk={handleSubmitCreate}
                width={600}
            >
                <Content className='form-data'>
                    <Form>
                        <Row gutter={[24, 0]}>
                            <Col md={{span: 24}}>
                                <Form.Item
                                    className='username mb-0'
                                    label="No Resi"
                                    name="resi"
                                >
                                    <Input 
                                        placeholder='No Resi'
                                    />
                                </Form.Item>
                            </Col>
                            <Col md={{span: 24}}>
                                <Form.Item
                                    className='username mb-0'
                                    label="Pesanan"
                                    name="order"
                                >
                                    <Input 
                                        placeholder='Pesanan'
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={[24, 0]}>
                            <Col md={{span: 12}}>
                                <Form.Item
                                    className='username mb-0'
                                    label="Platform"
                                    name="resi"
                                >
                                    <Input 
                                        placeholder='No Resi'
                                    />
                                </Form.Item>
                            </Col>
                            <Col md={{span: 12}}>
                                <Form.Item
                                    className='username mb-0'
                                    label="Tanggal Pesanan"
                                    name="order_date"
                                >
                                    <DatePicker 
                                        placeholder='Taggal Pesanan'
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={[24, 0]}>
                            <Col md={{span: 24}}>
                                <Form.Item
                                    className='username mb-0'
                                    label="Ekspedisi"
                                    name="expedition"
                                >
                                    <Input 
                                        placeholder='Ekspedisi'
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Content>
            </PnomModal>

            <PnomModal
                visible={isModalUpload}
                onCancel={handleCancelUpload}
                onOk={handleSubmitUpload}
                width={600}
            >
              <Row gutter={[24,0]}>
                <Col md={24}>
                    <Dragger>
                        <p className="ant-upload-drag-icon">
                              <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">
                              Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                              band files
                            </p>
                    </Dragger>           
                </Col>
              </Row>
            </PnomModal>
        </>
    )
}

export default NewOrder