import React, { useState } from "react";

import { Button, Card, Col, Divider, Form, Input, Row, Select } from "antd";


const ProductCreatePage = () => {
    const { TextArea } = Input
    return(
        <>
            <div className="create-product">
                <row gutter={[24,0]}>
                    <Col xs={24} xl={24}>
                       <Card
                         bordered={false}
                         className='criclebox mb-14'
                       >
                        <Form>
                            <Row className="mb-2" gutter={[24,0]}>
                                <Col md={{span: 24}}>
                                    <Divider orientation="left">Informasi Produk</Divider>
                                    <Form.Item
                                        className="username mb-0"
                                        label="Nama Produk"
                                    >
                                        <Input
                                            showCount 
                                            maxLength={255} 
                                            placeholder="Masukkan Nama Produk disini"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        className="username mb-0"
                                        label="Kategori"
                                    >
                                        <Select
                                            showSearch
                                            placeholder="Pilih Kategori Produk"
                                        />

                                    </Form.Item>
                                    <Form.Item
                                        className="username mb-0"
                                        label="Rekomendasi"
                                    >
                                        <Select
                                            showSearch
                                            placeholder="Pilih Produk Rekomendasi"
                                        />

                                    </Form.Item>
                                    <Form.Item
                                        className="username mb-0"
                                        label="Status"
                                    >
                                        <Select
                                            showSearch
                                            placeholder="Pilih Status Produk"
                                        />

                                    </Form.Item>
                                    <Form.Item
                                        className="username mb-0"
                                        label="Deskripsi Produk"
                                    >
                                        <TextArea
                                            rows={10}
                                            placeholder="Pilih Kategori Produk"
                                        />

                                    </Form.Item>
                                </Col>
                                <Col md={{span: 24}}>
                                    <Divider orientation="left">Informasi Penjualan</Divider>
                                    <Row gutter={[24, 0]}>
                                        <Col className="mb-1" md={{span: 6}}>
                                            <Form.Item
                                                className="username mb-0"
                                                label="Material"
                                                >
                                                <Input
                                                    placeholder="Nama Kategori" 
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col className="mb-1" md={{span: 6}}>
                                            <Form.Item
                                                className="username mb-0"
                                                label="Motif"
                                                >
                                                <Input
                                                    placeholder="Nama Kategori" 
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col className="mb-1" md={{span: 6}}>
                                            <Form.Item
                                                className="username mb-0"
                                                label="Variant"
                                                >
                                                <Input
                                                    placeholder="Nama Kategori" 
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col className="mb-1" md={{span: 6}}>
                                            <Form.Item
                                                className="username mb-0"
                                                label="Harga Normal"
                                                >
                                                <Input
                                                    placeholder="Nama Kategori" 
                                                />
                                            </Form.Item>
                                        </Col>


                                        <Col className="mb-1" md={{span: 6}}>
                                            <Form.Item
                                                className="username mb-0"
                                                label="Harga Dropship"
                                                >
                                                <Input
                                                    placeholder="Nama Kategori" 
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col className="mb-1" md={{span: 6}}>
                                            <Form.Item
                                                className="username mb-0"
                                                label="Tipe Diskon"
                                                >
                                                <Input
                                                    placeholder="Nama Kategori" 
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col className="mb-1" md={{span: 6}}>
                                            <Form.Item
                                                className="username mb-0"
                                                label="Nominal Diskon"
                                                >
                                                <Input
                                                    placeholder="Nama Kategori" 
                                                />
                                            </Form.Item>
                                        </Col>
                                       
                                        
                                    </Row>
                                </Col>
                            </Row>
                            <Row gutter={{span: 24}}>
                                <Col md={{span: 24}}>
                                    <Button block type="primary">Tambah Variasi</Button>
                                </Col>
                            </Row>
                        </Form>
                       </Card>
                    </Col>
                </row>
            </div>  
        </>
    )
}

export default ProductCreatePage;