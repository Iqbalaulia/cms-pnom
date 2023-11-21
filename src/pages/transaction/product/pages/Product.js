import React, { useState, } from 'react';
import { Col, Card, Tabs } from 'antd';

import ProductList from './ProductList'
import ProductCategory from './ProductCategory'
import ProductRecomended from './ProductRecomended'

const ProductPage = () => {
    const { TabPane } = Tabs

    const [header, setHeader] = useState('Daftar Produk')

    function callback(key) {
        if(key === '1') setHeader('Daftar Produk') 
        if(key === '2') setHeader('Kategori Produk')
        if(key === '3') setHeader('Produk Rekomendasi')    
    }

    return(
        <>
          <div className='customer-page'>
            <row gutter={[24, 0]}>
                <Col xs={24} xl={24}>
                    <Card
                        bordered={false}
                        className='criclebox mb-24'
                    >
                        <h2 className='font-bold'>{header}</h2>
                        <Tabs defaultActiveKey="1" onChange={callback}>
                            <TabPane tab="Daftar Produk" key="1">
                                <ProductList/>
                            </TabPane>
                            <TabPane tab="Kategori Produk" key="2">
                                <ProductCategory/>
                            </TabPane>
                            <TabPane tab="Produk Rekomendasi" key="3">
                                <ProductRecomended/>
                            </TabPane>
                        </Tabs>
                    </Card>
                </Col>
            </row>
          </div>  
        </>
    )
}

export default ProductPage;