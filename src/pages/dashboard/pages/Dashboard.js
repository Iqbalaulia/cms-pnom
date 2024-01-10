
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, DatePicker } from 'antd';

import Echart from "components/chart/EChart";
import LineChart from "components/chart/LineChart";
// import PnomNotification from 'components/layout/Notification';

import { mockDataProductBestSeller } from '../data/setting';
// import { ApiGetRequest } from 'utils/api/config';




const Dashboard = () => {
    const { Title } = Typography
    const [filterParams, setFilterParams] = useState({
        startDate: '',
        endDate:''
    })

    // let summaryData = {
    //    production:'',
    //    packing:'',
    //    shipping:'',
    //    printing:'',
    //    cutting:'',
    //    total:''
    // }

    useEffect(() => {
        // fetchDataSummary()
    })

    // const fetchDataSummary = async () => {
    //     try {
    //         let params = {
    //             startDate: filterParams.startDate,
    //             endDate: filterParams.endDate
    //         }

    //         const response = await ApiGetRequest(`dashboard/summary`, params)

    //         summaryData.production = response.data.summary.transaction.production
    //         summaryData.packing = response.data.summary.transaction.packing
    //         summaryData.shipping = response.data.summary.transaction.shipping
    //         summaryData.printing = response.data.summary.transaction.printing
    //         summaryData.cutting = response.data.summary.transaction.cutting
    //         summaryData.total = response.data.summary.transaction.total
            
    //     } catch (error) {
    //         PnomNotification({
    //             type: 'error',
    //             message: 'Maaf terjadi kesalahan!',
    //             description:'Maaf terjadi kesalahan!'
    //           })
    //     } finally {
    //     }
    // }

    return(
        <>
            <div className='layout-content'>
                <div className='filter-date mb-4'>
                    <Card>
                        <Row gutter={[24, 0]}>
                            <Col md={6}>
                                <DatePicker 
                                    placeholder='Tanggal Mulai'
                                    value={filterParams.startDate}
                                    onChange={
                                        (event) => setFilterParams({
                                            ...filterParams,
                                            startDate: event.target.value
                                        })
                                    }
                                />
                            </Col>
                            <Col md={6}>
                                <DatePicker 
                                    placeholder='Tanggal Akhir'
                                    value={filterParams.endDate}
                                    onChange={
                                        (event) => setFilterParams({
                                            ...filterParams,
                                            endDate: event.target.value
                                        })
                                    }
                                />
                            </Col>
                        </Row>
                    </Card>
                </div>
                <Row className="rowgap-vbox" gutter={[24,0]}>
                    <Col
                        xs={24}
                        sm={24}
                        md={12}
                        lg={6}
                        xl={6}
                        className="mb-24"
                    >
                        <Card
                            bordered={false}
                            className='criclebox'
                        >
                            
                            <div className='number'>
                                <Row align='middle' gutter={[24, 0]}>
                                    <Col xs={18}>
                                        <span>Total Pesanan</span>
                                        <Title level={3}>
                                            100
                                        </Title>
                                    </Col>
                                    <Col xs={6}>
                                        <div className='icon-box'>

                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                    <Col
                        xs={24}
                        sm={24}
                        md={12}
                        lg={6}
                        xl={6}
                        className="mb-24"
                    >
                        <Card
                            bordered={false}
                            className='criclebox'
                        >
                            
                            <div className='number'>
                                <Row align='middle' gutter={[24, 0]}>
                                    <Col xs={18}>
                                        <span>Proses Produksi</span>
                                        <Title level={3}>
                                            100
                                        </Title>
                                    </Col>
                                    <Col xs={6}>
                                        <div className='icon-box'>

                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                    <Col
                        xs={24}
                        sm={24}
                        md={12}
                        lg={6}
                        xl={6}
                        className="mb-24"
                    >
                        <Card
                            bordered={false}
                            className='criclebox'
                        >
                            
                            <div className='number'>
                                <Row align='middle' gutter={[24, 0]}>
                                    <Col xs={18}>
                                        <span>Selesai Packing</span>
                                        <Title level={3}>
                                            100
                                        </Title>
                                    </Col>
                                    <Col xs={6}>
                                        <div className='icon-box'>

                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                    <Col
                        xs={24}
                        sm={24}
                        md={12}
                        lg={6}
                        xl={6}
                        className="mb-24"
                    >
                        <Card
                            bordered={false}
                            className='criclebox'
                        >
                            
                            <div className='number'>
                                <Row align='middle' gutter={[24, 0]}>
                                    <Col xs={18}>
                                        <span>Shipping</span>
                                        <Title level={3}>
                                            100
                                        </Title>
                                    </Col>
                                    <Col xs={6}>
                                        <div className='icon-box'>

                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={[24, 0]}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
                        <Card bordered={false} className="criclebox h-full">
                            <Echart />
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
                        <Card bordered={false} className="criclebox h-full">
                            <LineChart />
                        </Card>
                    </Col>
                </Row>
                <Row gutter={[24,0]}>
                    <Col md={12}>
                        <Row gutter={[24,0]}>
                            <Col
                                xs={24}
                                sm={24}
                                md={24}
                                lg={24}
                                xl={24}
                                className="mb-24"
                            >
                                <Card
                                    bordered={false}
                                    className='criclebox'
                                >
                                    
                                    <div className='number'>
                                        <Row align='middle' gutter={[24, 0]}>
                                            <Col xs={18}>
                                                <span>Cutting</span>
                                                <Title level={3}>
                                                    100
                                                </Title>
                                            </Col>
                                            <Col xs={6}>
                                                <div className='icon-box'>

                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Card>
                            </Col>
                            <Col
                                xs={24}
                                sm={24}
                                md={24}
                                lg={24}
                                xl={24}
                                className="mb-24"
                            >
                                <Card
                                    bordered={false}
                                    className='criclebox'
                                >
                                    
                                    <div className='number'>
                                        <Row align='middle' gutter={[24, 0]}>
                                            <Col xs={18}>
                                                <span>Printing</span>
                                                <Title level={3}>
                                                    100
                                                </Title>
                                            </Col>
                                            <Col xs={6}>
                                                <div className='icon-box'>

                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Card>
                            </Col>
                            <Col
                                xs={24}
                                sm={24}
                                md={24}
                                lg={24}
                                xl={24}
                                className="mb-24"
                            >
                                <Card
                                    bordered={false}
                                    className='criclebox'
                                >
                                    
                                    <div className='number'>
                                        <Row align='middle' gutter={[24, 0]}>
                                            <Col xs={18}>
                                                <span>Pendapatan Bulan Ini</span>
                                                <Title level={3}>
                                                    100
                                                </Title>
                                            </Col>
                                            <Col xs={6}>
                                                <div className='icon-box'>

                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Card>
                            </Col>
                            <Col md={24}>
                                <Card>
                                <Row gutter={[24,0]}>
                                    <Col md={24}>
                                        <div className="ant-list-box table-responsive">
                                            <table className="width-100">
                                            <thead>
                                                <tr>
                                                <th>Produk</th>
                                                <th>Jenis</th>
                                                <th>Tipe</th>
                                                <th>Stock</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {mockDataProductBestSeller.map((d, index) => (
                                                <tr key={index}>
                                                    <td>
                                                    <h6>
                                                        <img
                                                        src={d.img}
                                                        alt=""
                                                        className="avatar-sm mr-10"
                                                        />{" "}
                                                        {d.Title}
                                                    </h6>
                                                    </td>
                                                    <td>{d.member}</td>
                                                    <td>
                                                    <span className="text-xs font-weight-bold">
                                                        {d.bud}{" "}
                                                    </span>
                                                    </td>
                                                    <td>
                                                    <div className="percent-progress">{d.progress}</div>
                                                    </td>
                                                </tr>
                                                ))}
                                            </tbody>
                                            </table>
                                        </div>
                                    </Col>
                                </Row>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={12}>
                        <Card>
                            <Row gutter={[24,0]}>
                                <Col md={24}>
                                    <div className="ant-list-box table-responsive">
                                        <table className="width-100">
                                        <thead>
                                            <tr>
                                            <th>Produk</th>
                                            <th>Jenis</th>
                                            <th>Tipe</th>
                                            <th>Stock</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {mockDataProductBestSeller.map((d, index) => (
                                            <tr key={index}>
                                                <td>
                                                <h6>
                                                    <img
                                                    src={d.img}
                                                    alt=""
                                                    className="avatar-sm mr-10"
                                                    />{" "}
                                                    {d.Title}
                                                </h6>
                                                </td>
                                                <td>{d.member}</td>
                                                <td>
                                                <span className="text-xs font-weight-bold">
                                                    {d.bud}{" "}
                                                </span>
                                                </td>
                                                <td>
                                                <div className="percent-progress">{d.progress}</div>
                                                </td>
                                            </tr>
                                            ))}
                                        </tbody>
                                        </table>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Dashboard