import React, { useEffect, useState, } from 'react';
import { Table, Col, Button, Space,Form,Input,Row,Layout, Tag, Image, Select } from 'antd';
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons';

import { paginationModel, statusModel } from 'composables/useSetting';

import PnomModal from 'components/layout/Modal';
import PnomNotification from 'components/layout/Notification';

import { ApiGetRequest, ApiPostMultipart, ApiPostRequest, ApiPutRequest } from 'utils/api/config';
import { productCategoryModel } from 'utils/models/ProductModels';
import { notificationError, notificationSuccess } from 'utils/general/general';

const ProductCategory = () => {
  const { Content } = Layout

  const [ dataTable, setDataTable ] = useState([]);

  const [ stepAction, setStepAction ] = useState('save-data')
  const [ isTitleModal, setTitleModal ] = useState('Tambah Data')

  const [ loading, setLoading ] = useState(false);
  const [ isModalShow, setIsModalForm ] = useState(false)

  const [ uuidData, setUuidData] = useState(null)

  const [ tableParams, setTableParams ] = useState(paginationModel);
  const [ formData, setFormData ] = useState(productCategoryModel)
  const [ formInputData ] = Form.useForm()
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

  const handleCloseModal = () => {  
    setIsModalForm(false);
    handleResetField()
  }
  const handleShowForm = () => {
    setIsModalForm(true)
    handleResetField()
    setStepAction('save-data')
    setTitleModal('Tambah Data')
  }
  const handleEditModalForm = (item) => {
    setFormData({
      ...formData,
      name: item.name,
      status: parseInt(item.status),
      imageThumb: item.image,
    })

    formInputData.setFieldsValue({
      name: item.name,
      status: parseInt(item.status),
      imageThumb: item.image,
    });

    setUuidData(item.uuid)
    setIsModalForm(true)
    setStepAction('update-data')
    setTitleModal('Edit Data')
  }
  const handleSubmit = () => {
    if(stepAction === `save-data`)  saveDataForm()
    if(stepAction === `update-data`) updateDataForm()
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

    if (pagination.pageSize !== tableParams.pagination?.pageSize) setDataTable([]);
  };
  const handleUploadImage = async (event) => {
    try {
      const formDataUpload = new FormData();
      const selectedFile = event.target.files[0]
      
      formDataUpload.append("file", selectedFile, selectedFile.name);

      const response = await ApiPostMultipart(`file-upload`, formDataUpload)

      setFormData({
        ...formData,
        image: response.data.data.filename,
        imageThumb: URL.createObjectURL(selectedFile)
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
      setDataTable(response.data.data)
    } catch (error) {
        notificationError(error)
    } finally {
      setLoading(false)
    }
  };
  const saveDataForm = async () => {
    const validateValue = await formInputData.validateFields()
    if (validateValue) {
      try {
        setLoading(true)
        let formDataProductCategory = {
          name: formData.name,
          image: formData.image,
          status: formData.status
        }
        await ApiPostRequest(`product/category`, formDataProductCategory)
        await fetchDataCategory()
        handleCloseModal()
      } catch (error) {
        notificationError(error)
      } finally {
        setLoading(false)
      }
    }
  }
  const updateDataForm = async () => {
    const validateValue = await formInputData.validateFields()
    if (validateValue) { 
      try {
        setLoading(true)
        let formDataProductCategory = {
          name: formData.name,
          image: formData.image,
          status: formData.status
        }
        await ApiPutRequest(`product/category/${uuidData}`, formDataProductCategory)
        notificationSuccess('Data berhasil diubah!')
        await fetchDataCategory()
        handleCloseModal()
      } catch (error) {
        notificationError(error)
      } finally {
        setLoading(false)
      }
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
                          dataSource={dataTable}
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
          title={isTitleModal}
          isAction={stepAction}
          width={600}
          >
            <Content className="form-data">
              <Form 
                form={formInputData}  
                initialValues={{
                  remember: true,
                }}
               >
                  <Row gutter={[24,0]}>
                    <Col md={{ span: 24 }}>
                      <Form.Item
                        className="username mb-0"
                        label="Nama*"
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: "Wajib diisi!",
                          },  
                        ]}
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
                    <Col md={{ span: 24}}>
                          <Form.Item
                            className="username mb-0"
                            label="Status*"
                            name="status"
                            rules={[
                              {
                                required: true,
                                message: "Wajib diisi!",
                              },  
                            ]}
                            >
                              <Select
                               value={formData.status}
                               onSelect={(e) => setFormData(
                                 {
                                   ...formData,
                                   status: e
                                 }
                               )} 
                               placeholder="Status"
                               options={statusModel}
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
                        <Image
                                    width={550}
                                    src={formData.imageThumb}
                                />
                      </Col>
                  </Row>
              </Form>
            </Content>
        </PnomModal>
    </div>
  );
};
export default ProductCategory;