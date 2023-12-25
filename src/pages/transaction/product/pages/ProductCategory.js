import React, { useEffect, useState, } from 'react';
import { Table, Col, Button, Space,Form,Input,Row,Layout, Tag, Image } from 'antd';
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons';

import { paginationModel } from 'composables/useSetting';

import PnomModal from 'components/layout/Modal';
import PnomNotification from 'components/layout/Notification';

import { ApiGetRequest, ApiPostMultipart, ApiPostRequest, ApiPutRequest } from 'utils/api/config';
import { productCategoryModel } from 'utils/models/ProductModels';

const ProductCategory = () => {
  const { Content } = Layout

  const [ data, setData ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ isModalShow, setIsModalForm ] = useState(false)
  const [ uuidData, setUuidData] = useState(null)
  const [ selectedFile, setSelectedFile ] = useState(null);
  const [ tableParams, setTableParams ] = useState(paginationModel);
  const [ formData, setFormData ] = useState(productCategoryModel)
  const [ stepAction, setStepAction ] = useState('save-data')
  const [ filterData, setFilterData ] = useState({
    search:''
})
  const columnsProductCategory = [
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
      title: 'Nama Kategori',
      sorter: true,
      render: (item) => `${item.name}`,
    },
    {
      title: 'Status',
      sorter: true,
      render: (item) => (
        <Tag color={item.status !== '0' ? 'green' : 'red'}>{item.status !== '0' ? 'Aktif' : 'Tidak Aktif'}</Tag>
      ),
    },
    {
      title: 'Gambar',
      render: (item) => (
          <Image
              width={100}
              src={item.imageThumb}
          />
      ),
    },
    {
      title: 'Actions',
      render: (item) => (
        <Space size={8}>
          <Button onClick={() => handleEditModalForm(item)} type="primary" ghost icon={<EditOutlined />} size={'large'} />
        </Space>        
      )
    },
  ];

  
  useEffect(() => {
    fetchDataCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShowForm = () => {
    setStepAction('save-data')
    setIsModalForm(true)
    handleResetField()
  }
  const handleEditModalForm = (item) => {
    setFormData({
      ...formData,
      name: item.name
    })
    setUuidData(item.uuid)
    setStepAction('update-data')
    setIsModalForm(true)
  }
  const handleSubmit = () => {
    if(stepAction === `save-data`)  saveDataForm()
    if(stepAction === `update-data`) updateDataForm()
    
    setIsModalForm(false);
    handleResetField()
  };
  const handleCancelSubmit = () => {
    setIsModalForm(false);
    handleResetField()
  };
  const handleResetField = () => {
    setFormData({...productCategoryModel})
  }
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) setData([]);
  };
  const handleUploadImage = async (event) => {
    try {
      const formDataUpload = new FormData();

      setSelectedFile(event.target.files[0])
      
      formDataUpload.append("file", selectedFile, selectedFile.name);

      const response = await ApiPostMultipart(`file-upload`, formDataUpload)

      setFormData({
        ...formData,
        image: response.data.data.filename,
      })
     
    } catch (error) {
      PnomNotification({
        type: 'error',
        message: 'Maaf terjadi kesalahan!',
        description: 'Mohon periksa kembali jaringan anda. Atau menghubungi call center',
      })
    }
  };

  
  const fetchDataCategory = async () => {
    try {
      let params = {
        search: filterData.search
      }

      setLoading(true);
      const response = await ApiGetRequest(`product/category`, params)
      setData(response.data.data)
    } catch (error) {
        PnomNotification({
          type: 'error',
          message: 'Maaf terjadi kesalahan!',
          description: 'Mohon periksa kembali jaringan anda. Atau menghubungi call center',
        })
    } finally {
      setLoading(false)
    }
  };
  const saveDataForm = async () => {
    try {
      setLoading(true)

      let formDataProductCategory = {
        name: formData.name,
        image: formData.image
      }
      await ApiPostRequest(`product/category`, formDataProductCategory)
      await fetchDataCategory()
    } catch (error) {
      PnomNotification({
        type: 'error',
        message: 'Maaf terjadi kesalahan!',
        description: error.message,
     })
    } finally {
      setLoading(false)
    }
  }

  const updateDataForm = async () => {
    try {
      setLoading(true)
      let formDataProductCategory = {
        name: formData.name,
        image: formData.image
      }
      await ApiPutRequest(`product/category/${uuidData}`, formDataProductCategory)
      await fetchDataCategory()
    } catch (error) {
      PnomNotification({
        type: 'error',
        message: 'Maaf terjadi kesalahan!',
        description: error.message,
     })
    } finally {
      setLoading(false)
    }
  }
  

  return (
    <div className='admin-table'>
        <Row gutter={[24,0]}>
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
                        columns={columnsProductCategory}
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
        </Row>


        <PnomModal 
          onOk={handleSubmit} 
          onCancel={handleCancelSubmit} 
          visible={isModalShow}
          width={600}
          >
            <Content className="form-data">
              <Form>
                  <Row gutter={[24,0]}>
                    <Col md={{ span: 24 }}>
                      <Form.Item
                        className="username mb-0"
                        label="Nama"
                        >
                        <Input
                          value={formData.name}
                          onChange={
                            (event) => setFormData({...formData, name: event.target.value})
                          } 
                          placeholder="Nama Kategori" 
                        />
                      </Form.Item>
                    </Col>
                    <Col md={{ span: 24 }}>
                        <Form.Item
                          className="username mb-2"
                          label="Upload Banner"
                          name="upload_banner"
                          >
                        
                          <input type="file" id="file-upload" multiple onChange={handleUploadImage} accept="image/*" />
                        </Form.Item>
                      </Col>
                  </Row>
              </Form>
            </Content>
        </PnomModal>
    </div>
  );
};
export default ProductCategory;