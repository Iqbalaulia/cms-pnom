import React, { useEffect, useState } from "react";
import moment from "moment";

import {
  Select,
  Image,
  Table,
  Col,
  Card,
  Button,
  Space,
  Form,
  Input,
  Row,
  Layout,
  DatePicker,
  Tag,
} from "antd";
import { EditOutlined, PlusCircleOutlined } from "@ant-design/icons";

import { paginationModel, statusModel } from "composables/useSetting";
import { convertDate } from "composables/useHelper";

import PnomModal from "components/layout/Modal";
import PnomNotification from "components/layout/Notification";

import {
  ApiGetRequest,
  ApiPostMultipart,
  ApiPutMultipart,
} from "utils/api/config";
import { bannerModel } from "utils/models/BannerModels";

const EventBanner = () => {
  const { Content } = Layout;
  const { TextArea } = Input;

  const [dataTable, setDataTable] = useState([]);

  const [stepAction, setStepAction] = useState("save-data");
  const [isTitleModal, setTitleModal] = useState("Tambah Data");

  const [loading, setLoading] = useState(false);
  const [isModalForm, setIsModalForm] = useState(false);

  const [uuidData, setUuidData] = useState(null);

  const [tableParams, setTableParams] = useState(paginationModel);
  const [formData, setFormData] = useState(bannerModel);
  const [filterData, setFilterData] = useState({
    startAt: "",
    endAt: "",
    search: "",
    status: 1,
  });

  const columnsBanner = [
    {
      title: "No",
      render: (text, record, index) => {
        const pageNum = tableParams.pagination.pageNum;
        const pageSize = tableParams.pagination.pageSize;
        const calculatedIndex = (pageNum - 1) * pageSize + index + 1;
        return calculatedIndex;
      },
      width: "5%",
    },
    {
      title: "Nama Event",
      sorter: true,
      render: (item) => `${item.title}`,
    },
    {
      title: "Tanggal Mulai",
      sorter: true,
      render: (item) => `${moment(item.startAt).format("DD MMMM YYYY")}`,
    },
    {
      title: "Tanggal Akhir",
      sorter: true,
      render: (item) => `${moment(item.endAt).format("DD MMMM YYYY")}`,
    },
    {
      title: "Status",
      sorter: true,
      render: (item) => (
        <Tag color={item.status === "1" ? "green" : "red"}>
          {item.status === "1" ? "Aktif" : "Tidak Aktif"}
        </Tag>
      ),
    },
    {
      title: "Gambar",
      render: (item) => <Image width={200} src={item.imageThumb} />,
    },
    {
      title: "Actions",
      render: (item) => (
        <Space size={8}>
          <Button
            onClick={() => handleEditModalForm(item)}
            icon={<EditOutlined />}
            size={"large"}
          />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getFetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterData.search, filterData.status]);

  const handleOnChangeStatus = (event) => {
    setFilterData((filterData) => ({ ...filterData, status: event }));
    getFetchData();
  };

  const handleResetField = () => {
    setFormData({
      ...formData,
      title: "",
      description: "",
      image: "",
      imageThumb: "",
      startAt: "",
      endAt: "",
      actionUrl: "",
      status: null,
    });
  };

  const handleCancelSubmit = () => {
    setIsModalForm(false);
    handleResetField();
  };

  const handleShowModalForm = () => {
    setIsModalForm(true);
    handleResetField();
    setStepAction("save-data");
    setTitleModal("Tambah Data");
  };

  const handleEditModalForm = (item) => {
    setFormData({
      ...formData,
      title: item.title,
      startAt: moment(item.startAt),
      endAt: moment(item.endAt),
      status: parseInt(item.status),
      actionUrl: item.actionUrl,
      imageThumb: item.image,
      description: item.description,
    });

    setUuidData(item.uuid);
    setIsModalForm(true);
    setStepAction("update-data");
    setTitleModal("Edit Data");
  };

  const handleSubmit = () => {
    if (stepAction === `save-data`) saveDataForm();
    if (stepAction === `update-data`) updateDataForm();

    setIsModalForm(false);
    handleResetField();
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize)
      setDataTable([]);
  };

  const handleUploadImage = async (event) => {
    try {
      const formDataUpload = new FormData();
      const selectedFile = event.target.files[0];

      formDataUpload.append("file", selectedFile, selectedFile.name);

      const response = await ApiPostMultipart(`file-upload`, formDataUpload);

      setFormData({
        ...formData,
        image: response.data.data.filename,
        imageThumb: URL.createObjectURL(selectedFile),
      });
    } catch (error) {
      PnomNotification({
        type: "error",
        message: "Maaf terjadi kesalahan!",
        description:
          "Mohon periksa kembali jaringan anda. Atau menghubungi call center",
      });
    }
  };

  const getFetchData = async () => {
    try {
      let params = {
        startAt: filterData.startAt ? convertDate(filterData.startAt) : "",
        endAt: filterData.endAt ? convertDate(filterData.endAt) : "",
        search: filterData.search,
        status: filterData.status,
      };

      setLoading(true);
      const response = await ApiGetRequest(`banner`, params);
      setDataTable(response.data.data);
    } catch (error) {
      PnomNotification({
        type: "error",
        message: "Maaf terjadi kesalahan!",
        description:
          "Mohon periksa kembali jaringan anda. Atau menghubungi call center",
      });
    } finally {
      setLoading(false);
    }
  };
  const saveDataForm = async () => {
    try {
      setLoading(true);

      let formDataBanner = {
        title: formData.title,
        startAt: convertDate(formData.startAt),
        endAt: convertDate(formData.endAt),
        status: formData.status,
        description: formData.description,
        image: formData.image,
        actionUrl: formData.actionUrl,
      };

      await ApiPostMultipart(`banner`, formDataBanner);
      await getFetchData();
    } catch (error) {
      PnomNotification({
        type: "error",
        message: "Maaf terjadi kesalahan!",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };
  const updateDataForm = async () => {
    try {
      setLoading(true);

      let formDataBanner = {
        title: formData.title,
        startAt: convertDate(formData.startAt),
        endAt: convertDate(formData.endAt),
        status: formData.status,
        description: formData.description,
        image: formData.image,
        actionUrl: formData.actionUrl,
      };

      await ApiPutMultipart(`banner/${uuidData}`, formDataBanner);

      PnomNotification({
        type: "success",
        message: "Data berhasil diubah!",
        description: "Data berhasil diubah",
      });

      await getFetchData();
    } catch (error) {
      PnomNotification({
        type: "error",
        message: "Maaf terjadi kesalahan!",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="event-banner">
        <Row gutter={[24, 0]}>
          <Col xs={24} xl={24}>
            <Card bordered={false} className="criclebox mb-24 font-weight-bold">
              <h2 className="font-bold">Banner Acara</h2>
              <Row gutter={[24, 0]} className="pnom-table-filter">
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Input
                    placeholder="Pencarian..."
                    value={filterData.search}
                    onChange={(event) =>
                      setFilterData({
                        ...filterData,
                        search: event.target.value,
                      })
                    }
                  />
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Select
                    value={filterData.status}
                    onChange={handleOnChangeStatus}
                    options={statusModel}
                    placeholder="Pilih Status"
                  />
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}></Col>
                <Col md={{ span: 1 }} xs={{ span: 24 }}></Col>
                <Col md={{ span: 5 }} xs={{ span: 24 }}>
                  <Button
                    type="primary"
                    icon={<PlusCircleOutlined />}
                    className="w-50"
                    onClick={handleShowModalForm}
                    size="large"
                    block
                  >
                    Tambah Data
                  </Button>
                </Col>
              </Row>
              <Row className="pnom-table" gutter={[24, 0]}>
                <Col xs={24} xl={24}>
                  <Table
                    bordered={false}
                    columns={columnsBanner}
                    rowKey={(record) => record.id}
                    dataSource={dataTable}
                    loading={loading}
                    onChange={handleTableChange}
                    pagination={tableParams.pagination}
                    scroll={{ x: 1300 }}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
      <PnomModal
        onOk={handleSubmit}
        onCancel={handleCancelSubmit}
        visible={isModalForm}
        title={isTitleModal}
        isAction={stepAction}
        width={600}
      >
        <Content className="form-data">
          <Form>
            <Row gutter={[24, 0]}>
              <Col md={{ span: 24 }} xs={{ span: 24 }}>
                <Form.Item
                  className="username mb-0"
                  label="Nama Event"
                  rules={[
                    {
                      required: true,
                      message: "Input data nama!",
                    },
                  ]}
                >
                  <Input
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Nama Event"
                  />
                </Form.Item>
                <Form.Item
                  className="username mb-2"
                  label="Tanggal Mulai"
                  rules={[
                    {
                      required: true,
                      message: "Masukkan tanggal mulai!",
                    },
                  ]}
                >
                  <DatePicker
                    value={formData.startAt}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        startAt: event,
                      })
                    }
                  />
                </Form.Item>
                <Form.Item
                  className="username mb-2"
                  label="Tanggal Akhir"
                  rules={[
                    {
                      required: true,
                      message: "Masukkan tanggal akhir!",
                    },
                  ]}
                >
                  <DatePicker
                    value={formData.endAt}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        endAt: event,
                      })
                    }
                  />
                </Form.Item>
                <Form.Item className="username mb-0" label="Status">
                  <Select
                    value={formData.status}
                    onSelect={(e) =>
                      setFormData({
                        ...formData,
                        status: e,
                      })
                    }
                    placeholder="Status"
                    options={statusModel}
                  />
                </Form.Item>
                <Form.Item
                  className="username mb-2"
                  label="Url"
                  rules={[
                    {
                      required: true,
                      message: "Masukkan ur;!",
                    },
                  ]}
                >
                  <Input
                    value={formData.actionUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, actionUrl: e.target.value })
                    }
                    placeholder="Url"
                  />
                </Form.Item>
                <Form.Item className="username mb-0" label="Deskripsi">
                  <TextArea
                    value={formData.description}
                    rows={4}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[24, 0]}>
              <Col md={{ span: 24 }} xs={{ span: 24 }}>
                <Form.Item
                  className="username mb-2"
                  label="Upload Banner"
                  name="upload_banner"
                >
                  <input
                    type="file"
                    id="file-upload"
                    multiple
                    onChange={handleUploadImage}
                    accept="image/*"
                  />
                </Form.Item>
                <Image width={260} src={formData.imageThumb} />
              </Col>
            </Row>
          </Form>
        </Content>
      </PnomModal>
    </>
  );
};

export default EventBanner;
