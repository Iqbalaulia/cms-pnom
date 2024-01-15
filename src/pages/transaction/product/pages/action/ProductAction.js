import React, { useEffect, useState } from "react";

import { Button, Card, Col, Form, Input, Row, Select, Image } from "antd";

import { ApiDeleteRequest, ApiGetRequest, ApiPostMultipart, ApiPostRequest, ApiPutRequest } from "utils/api/config";
import { notificationError, notificationSuccess } from "utils/general/general";
import { productModel } from "utils/models/ProductModels";

import { discountModel, recommendationModel, statusModel } from "composables/useSetting";
import { DeleteOutlined } from "@ant-design/icons";


const ProductCreatePage = ({ onUpdateStep, onClickProduct, valueStepAction, dataDetail }) => {

    const { TextArea } = Input

    const [ dataMaterial, setDataMaterial ] = useState([])
    const [ dataMotif, setDataMotif ] = useState([])
    const [ dataVariant, setDataVariant ] = useState([])
    const [ dataSales, setDataSales ] = useState([])
    const [ dataCategory, setDataCategory ] = useState([])
    const [ dataProduct, setDataProduct ] = useState(productModel)
    const [ uuidData, setUuidData ] = useState('')

    useEffect(() => {
        
        const objectLength = Object.keys(dataDetail).length
        if (objectLength > 0) {
            setDataProduct({
                name: dataDetail.name,
                description: dataDetail.description,
                categoryUuid: dataDetail.category.uuid,
                recommendation: parseInt(dataDetail.recommendation),
                status: parseInt(dataDetail.status)
            })

            setUuidData(dataDetail.uuid)

            setDataSales(dataDetail.details.map(item => ({
                    uuid: item.uuid,
                    material: item.material,
                    motif: item.motif,
                    variant: item.variant,
                    sku: item.sku,
                    priceDefault: parseInt(item.priceDefault),
                    priceDropship: parseInt(item.priceDropship),
                    discountType: parseInt(item.discountType),
                    discountValue:parseInt(item.discountValue),
                    images: item.images
            })))

        } else {
            setDataSales([
                {
                    material: '',
                    motif: '',
                    variant: '',
                    sku:'',
                    priceDefault: 0,
                    priceDropship: 0,
                    discountType:1,
                    discountValue:0,
                    images:[]
                }
            ])
        }
        
        fetchDataMaterial();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        fetchDataMotif()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        fetchDataVariant()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        fetchDataCategory()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        
    }, [dataDetail])

    const componentImage = (dataImages) => {
        return (
            <Row gutter={[24,0]} className="images-viewer">
                {
                      dataImages.images.map((item, index) => (
                            <Col md={4}>
                                { item.imageThumb === undefined ? '' : (
                                    <Button onClick={() => handleDeleteImage(dataImages, index) } className="trash"><DeleteOutlined /></Button>
                                )}
                                <Image
                                    className="images-viewer" 
                                    width={200}
                                    src={item.imageThumb}
                                />
                            </Col>
                    ))
                }
           </Row>

           
        )
    }

    const handleAddSales = () => {
        const newItem = {
            material: '',
            motif: '',
            variant: '',
            sku:'',
            priceDefault: 0,
            priceDropship: 0,
            discountType:1,
            discountValue:0,
            images:[]
        }

        setDataSales(prevData => {
            const newData = [...prevData, newItem];
            return newData;
        });
    }
    const handleUploadImage = async (event, index) => {
        try {
            const formDataUpload = new FormData();
            const selectedFile = event.target.files[0];
    
            formDataUpload.append("file", selectedFile);
    
            const response = await ApiPostMultipart(`file-upload`, formDataUpload);
            const newDataSales = [...dataSales];
    

    
            newDataSales[index] = {
                ...newDataSales[index],
                images: [...newDataSales[index].images, response.data.data.filename],
            };

            if (newDataSales[index].images.length > 1) {
                newDataSales[index].images.splice(index, 1)
            }
    
            setDataSales(newDataSales);
    
          
        } catch (error) {
          notificationError(error);
        }
    };
    const handleDeleteImage = async (item, index) => {
        await deleteImageDetail(uuidData, item.uuid, item.images[index].uuid )
        onUpdateStep('')
        onClickProduct();
    }
    const handleDeleteDetail = (index) => {
        setDataSales((prevData) => {
            const updatedData = prevData.filter((item, i) => i !== index);
            return updatedData;
        });
    }
    const handleMaterialChange = (index, value) => {
        setDataSales((prevData) => {
            const newData = [...prevData];
            newData[index].material = value[0];
            return newData;
        });
    };
    const handleMotifChange = (index, value) => {
        setDataSales((prevData) => {
            const newData = [...prevData];
            newData[index].motif = value[0];
            return newData;
        });
    };
    const handleVariantChange = (index, value) => {
        setDataSales((prevData) => {
            const newData = [...prevData];
            newData[index].variant = value[0];
            return newData;
        });
    };
    const handleDiscountTypeChange = (index, value) => {
        setDataSales((prevData) => {
            const newData = [...prevData];
            newData[index].discountType = value;
            return newData;
        });
    };
    const handlePriceDropshipChange = (index, value) => {
        const newDataSales = [...dataSales];
    
        newDataSales[index] = {
          ...newDataSales[index],
          priceDropship: value
        };
    
        setDataSales(newDataSales);
    };
    const handlePriceDefaultChange = (index, value) => {
        const newDataSales = [...dataSales];
    
        newDataSales[index] = {
          ...newDataSales[index],
          priceDefault: value
        };
    
        setDataSales(newDataSales);
    };
    const handleDiscountValueChange = (index, value) => {
        const newDataSales = [...dataSales];
    
        newDataSales[index] = {
          ...newDataSales[index],
          discountValue: value
        };
    
        setDataSales(newDataSales);
    };
    const handleSkuChange = (index, value) => {
        const newDataSales = [...dataSales];
    
        newDataSales[index] = {
          ...newDataSales[index],
          sku: value
        };
    
        setDataSales(newDataSales);
    };
    const handleSaveData = () => {
        submitDataProduct()
    }



    const fetchDataMaterial = async () => {
        try {
            const response = await ApiGetRequest(`product/item/option/material`)
            setDataMaterial(response.data.data.map(element => ({
                value: element,
                label: element
            })));
            
        } catch (error) {
            notificationError(error)
        }
    }

    const fetchDataMotif = async () => {
        try {
            const response = await ApiGetRequest(`product/item/option/motif`)
            setDataMotif(response.data.data.map(element => ({
                value: element,
                label: element
            })));
            
        } catch (error) {
            notificationError(error)
        }
    }

    const fetchDataVariant = async () => {
        try {
            const response = await ApiGetRequest(`product/item/option/variant`)
            setDataVariant(response.data.data.map(element => ({
                value: element,
                label: element
            })));
            
        } catch (error) {
            notificationError(error)
        }
    }

    const fetchDataCategory = async () => {
        try {
            const response = await ApiGetRequest(`product/category`)
            setDataCategory(response.data.data.map(element => ({
                value: element.uuid,
                label: element.name
            })));
        } catch (error) {
            notificationError(error)
        }
    }

    const deleteImageDetail = async (uuid, uuidDetail, uuidDetailImage) => {
        try {
            await ApiDeleteRequest(`product/item/${uuid}/detail/${uuidDetail}/image/${uuidDetailImage}`)
        } catch (error) {
            notificationError(error)
        }
    }

    const submitDataProduct = async () => {
        try {

            let formData = {
                name: dataProduct.name,
                description: dataProduct.description,
                categoryUuid: dataProduct.categoryUuid,
                recommendation: dataProduct.recommendation,
                status: dataProduct.status,
                details: dataSales
            }

            if (uuidData) {
                await ApiPutRequest(`product/item/${uuidData}`, formData)
                notificationSuccess('Data berhasil diubah!')
            } else {
                await ApiPostRequest(`product/item`, formData)
                notificationSuccess('Data berhasil disimpan!')
            }

            onUpdateStep('')
            onClickProduct()
        } catch (error) {
            notificationError(error)
           
        }
    }

    
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
                                <Col md={{span: 24}} className="padding-0">
                                    <Row gutter={{span: 24}} className="mt-2 mb-2">
                                        <Col md={{span: 24}}>
                                            <div className="informasi-detail">
                                                <label>Informasi</label>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Form.Item
                                        className="username mb-0"
                                        label="Nama Produk"
                                    >
                                        <Input
                                             
                                            maxLength={255} 
                                            value={dataProduct.name}
                                            onChange={
                                                (event) => setDataProduct({...dataProduct, name: event.target.value})
                                            }
                                            placeholder="Masukkan Nama Produk disini"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        className="username mb-0"
                                        label="Kategori"
                                    >
                                        <Select
                                            showSearch
                                            value={dataProduct.categoryUuid}
                                            options={dataCategory}
                                            onSelect={(e) => setDataProduct(
                                                {
                                                  ...dataProduct,
                                                  categoryUuid: e
                                                }
                                              )} 
                                            placeholder="Pilih Kategori Produk"
                                        />

                                    </Form.Item>
                                    <Form.Item
                                        className="username mb-0"
                                        label="Rekomendasi"
                                    >
                                        <Select
                                            showSearch
                                            value={dataProduct.recommendation}
                                            onSelect={(e) => setDataProduct(
                                                {
                                                  ...dataProduct,
                                                  recommendation: e
                                                }
                                              )} 
                                            options={recommendationModel}
                                            placeholder="Pilih Produk Rekomendasi"
                                        />

                                    </Form.Item>
                                    <Form.Item
                                        className="username mb-0"
                                        label="Status"
                                    >
                                        <Select
                                            showSearch
                                            value={dataProduct.status}
                                            onSelect={(e) => setDataProduct(
                                                {
                                                  ...dataProduct,
                                                  status: e
                                                }
                                              )} 
                                            placeholder="Status"
                                            options={statusModel}
                                        />

                                    </Form.Item>
                                    <Form.Item
                                        className="username mb-0"
                                        label="Deskripsi Produk"
                                    >
                                        <TextArea
                                            rows={10}
                                            value={dataProduct.description}
                                            onChange={
                                                (event) => setDataProduct({...dataProduct, description: event.target.value})
                                            } 
                                            placeholder="Pilih Kategori Produk"
                                        />

                                    </Form.Item>
                                </Col>
                                <Col md={{span: 24}} className="padding-0">
                                    <Row gutter={{span: 24}} className="mt-2 mb-2">
                                        <Col md={{span: 24}}>
                                            <div className="informasi-detail">
                                                <label>Detail Produk</label>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row justify="end" gutter={{span: 24}} className="mt-2 mb-2">
                                        <Col>
                                            <Button onClick={() => handleAddSales()} ghost type="primary">Tambah Variasi</Button>
                                        </Col>
                                    </Row>
                                    {dataSales.map((item, index) => (
                                        <Row key={index + 1} gutter={[24, 0]}>
                                            <Col className="mb-1" md={{span: 5}}>
                                                <Form.Item
                                                    key={index}
                                                    className="username mb-0"
                                                    label="SKU"
                                                    >
                                                    <Input
                                                        value={item.sku}
                                                        onChange={(e) => handleSkuChange(index, e.target.value)}
                                                        placeholder="SKU" 
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col className="mb-1" md={{span: 6}}>
                                                <Form.Item
                                                    key={index}
                                                    className="username mb-0"
                                                    label="Material"
                                                    >
                                                    <Select
                                                        mode="tags"
                                                        showSearch
                                                        value={item.material}
                                                        options={dataMaterial}
                                                        onChange={(value) => handleMaterialChange(index, value)}
                                                        placeholder="Pilih Produk Rekomendasi"
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col className="mb-1" md={{span: 6}}>
                                                <Form.Item
                                                    key={index}
                                                    className="username mb-0"
                                                    label="Motif"
                                                    >
                                                    <Select
                                                        mode="tags"
                                                        showSearch
                                                        value={item.motif}
                                                        options={dataMotif}
                                                        onChange={(value) => handleMotifChange(index, value)}
                                                        placeholder="Pilih Motif"
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col className="mb-1" md={{span: 6}}>
                                                <Form.Item
                                                    key={index}
                                                    className="username mb-0"
                                                    label="Variant"
                                                    >
                                                    <Select
                                                        mode="tags"
                                                        showSearch
                                                        value={item.variant}
                                                        options={dataVariant}
                                                        onChange={(value) => handleVariantChange(index, value)}
                                                        placeholder="Pilih Variant"
                                                    />
                                                </Form.Item>
                                            </Col>
                                          
                                            <Col className="mb-1" md={{span: 5}}>
                                                <Form.Item
                                                    key={index}
                                                    className="username mb-0"
                                                    label="Tipe Diskon"
                                                    >
                                                    <Select
                                                        showSearch
                                                        value={item.discountType}
                                                        options={discountModel}
                                                        onChange={(value) => handleDiscountTypeChange(index, value)}
                                                        placeholder="Pilih Tipe Diskon"
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col className="mb-1" md={{span: 6}}>
                                                <Form.Item
                                                    key={index}
                                                    className="username mb-0"
                                                    label="Nominal Diskon"
                                                    >
                                                    <Input
                                                        value={item.discountValue}
                                                        onChange={(e) => handleDiscountValueChange(index, e.target.value)}
                                                        placeholder="Nama Kategori" 
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col className="mb-1" md={{span: 6}}>
                                                <Form.Item
                                                    key={index}
                                                    className="username mb-0"
                                                    label="Harga Normal"
                                                    >
                                                    <Input
                                                        value={item.priceDefault}
                                                        onChange={(e) => handlePriceDefaultChange(index, e.target.value)}
                                                        placeholder="Nama Kategori" 
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col className="mb-1" md={{span: 6}}>
                                                <Form.Item
                                                    key={index}
                                                    className="username mb-0"
                                                    label="Harga Dropship"
                                                    >
                                                    <Input
                                                        value={item.priceDropship}
                                                        onChange={(e) => handlePriceDropshipChange(index, e.target.value)}
                                                        placeholder="Nama Kategori" 
                                                    />
                                                </Form.Item>
                                            </Col>
                                           
                                            {
                                               dataSales.length > 1 ? (
                                                <Button onClick={() => handleDeleteDetail(index)} type="danger">X</Button>
                                               ) : index !== 0 ? (
                                                <Button onClick={() => handleDeleteDetail(index)} type="danger">X</Button>
                                               ) : (
                                                ''
                                               )
                                            }
                                            
                                             <Col className="mb-1" md={{span: 24}}>
                                                 <Form.Item
                                                    key={index + 1}
                                                    className="username mb-5"
                                                    label="Upload Foto"
                                                    name={`upload_banner-${index}`}
                                                    >
                                                        <input
                                                            type="file"
                                                            id={`file-upload-${index}`}
                                                            multiple
                                                            onChange={(event) => handleUploadImage(event, index)}
                                                            accept="image/*"
                                                        />
                                                </Form.Item>
                                                
                                                {
                                                    item.images.length > 0 ? (
                                                        componentImage(item)
                                                    )
                                                    : ''
                                                }
                                            </Col>
                                        </Row>
                                        
                                    ))}
                                </Col>
                            </Row>
                            <Row justify="end" className="mb-2 mt-4" gutter={[24,0]}>
                                <Col>
                                    <Button onClick={() => onUpdateStep('')} ghost type="primary"> Kembali </Button>
                                </Col>
                                <Col className="padding-0">
                                    <Button className="mr-2" onClick={() => handleSaveData()} type="primary">{valueStepAction === `update-action` ? 'Ubah Data' : 'Simpan'}</Button>
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