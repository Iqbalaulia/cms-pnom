import React, { useEffect, useState } from "react";
import moment from "moment";

import {
  DatePicker,
  Select,
  Table,
  Col,
  Button,
  Space,
  Form,
  Input,
  Row,
  Layout,
  Tag,
} from "antd";
import { CloudDownloadOutlined, CloudUploadOutlined } from "@ant-design/icons";

import {
  ApiGetRequest,
  ApiPostMultipart,
  ApiPostRequest,
} from "utils/api/config";
import { paginationModel } from "composables/useSetting";
import {
  notificationError,
  sourceOrder,
  statusOrder,
  paymentOder,
} from "utils/general/general";
import {
  orderModel,
  uploadOrder,
  statusOrderModel,
} from "utils/models/OrderModels";

import PnomModal from "components/layout/Modal";
import PnomNotification from "components/layout/Notification";

const NewOrder = () => {
  const { Content } = Layout;

  const [isTitleModal, setTitleModal] = useState("Detail Data");
  const [stepAction, setStepAction] = useState("detail-data");

  const [dataTable, setDataTable] = useState([]);
  const [tableParams, setTableParams] = useState(paginationModel);
  const [formData, setFormData] = useState(orderModel);
  const [formDataUpload, setFormDataUpload] = useState(uploadOrder);
  const [isModalDetail, setIsModalDetail] = useState(false);
  const [isModalUpload, setIsModalUpload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filterData, setFilterData] = useState({
    search: "",
    status: null,
  });

  const columnsOrder = [
    {
      title: "No",
      fixed: "left",
      render: (text, record, index) => {
        const pageNum = tableParams.pagination.pageNum;
        const pageSize = tableParams.pagination.pageSize;
        const calculatedIndex = (pageNum - 1) * pageSize + index + 1;
        return calculatedIndex;
      },
      width: "5%",
    },
    {
      title: "No Order",
      sorter: true,
      render: (item) => (
        <label className="text-capitalize">{item.number}</label>
      ),
    },
    {
      title: "No Pengiriman",
      width: "16%",
      render: (item) => (
        <label className="text-capitalize">{item.delivery.receiptNumber}</label>
      ),
    },
    {
      title: "Pemesanan",
      render: (item) => (
        <Tag color={sourceOrder(item.source).color}>
          {sourceOrder(item.source).name}
        </Tag>
      ),
    },
    {
      title: "Status",
      render: (item) => (
        <Tag color={statusOrder(item.status).color}>
          {statusOrder(item.status).name}
        </Tag>
      ),
    },
    {
      title: "Pembayaran",
      render: (item) => (
        <label className="text-capitalize">
          {paymentOder(item.payment.type)}
        </label>
      ),
    },
    {
      title: "Total",
      render: (item) => <label className="text-capitalize">{item.total}</label>,
    },
    {
      title: "Actions",
      width: "20%",
      render: (item) => (
        <Space size={8}>
          <Button onClick={() => handleEditModalForm(item)} size={"large"}>
            Detail
          </Button>
        </Space>
      ),
    },
  ];

  const columnsTransaction = [
    {
      title: "SKU",
      sorter: true,
      render: (item) => <label className="text-capitalize">{item.sku}</label>,
    },
    {
      title: "Nama",
      sorter: true,
      render: (item) => (
        <label className="text-capitalize">
          {item.name.substring(0, 20) + "..."}
        </label>
      ),
    },
    {
      title: "Material",
      sorter: true,
      render: (item) => (
        <label className="text-capitalize">{item.material}</label>
      ),
    },
    {
      title: "Motif",
      sorter: true,
      render: (item) => <label className="text-capitalize">{item.motif}</label>,
    },
    {
      title: "Variasi",
      sorter: true,
      render: (item) => (
        <label className="text-capitalize">{item.variant}</label>
      ),
    },
    {
      title: "Qty",
      sorter: true,
      render: (item) => <label className="text-capitalize">{item.qty}</label>,
    },
    {
      title: "Harga",
      sorter: true,
      render: (item) => <label className="text-capitalize">{item.price}</label>,
    },
    {
      title: "Total",
      sorter: true,
      render: (item) => <label className="text-capitalize">{item.total}</label>,
    },
  ];

  useEffect(() => {
    getFetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterData.search, filterData.status]);
  const handleSubmitCreate = () => {
    setIsModalDetail(false);
  };
  const handleCancelDetail = () => {
    setIsModalDetail(false);
  };
  const handleEditModalForm = (item) => {
    setFormData({
      ...formData,
      date: moment(item.date),
      delivery: item.delivery,
      deliveryAmount: item.deliveryAmount,
      description: item.description,
      detailOrder: item.details,
      discountAmount: item.discountAmount,
      numberTransaction: item.number,
      payment: item.payment,
      source: item.source,
      status: item.status,
      total: item.total,
      user: item.user,
    });

    setIsModalDetail(true);
    setTitleModal("Detail Data");
    setStepAction("detail-data");
  };
  const handleDownloadTemplate = async () => {
    const fileUrl = process.env.REACT_APP_TEMPLATE_EXCEL;
    const link = document.createElement("a");

    link.href = fileUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleUploadFile = async (event) => {
    try {
      const formDataUpload = new FormData();
      const selectedFile = event.target.files[0];
      formDataUpload.append("file", selectedFile, selectedFile.name);
      const response = await ApiPostMultipart(`file-upload`, formDataUpload);

      setFormDataUpload({
        ...formDataUpload,
        fileName: response.data.data.filename,
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
  const handleOnChangeStatus = (event) => {
    setFilterData({ ...filterData, status: event });
  };

  const handleShowUpload = () => {
    setTitleModal("Upload Excel");
    setStepAction("save-data");
    setIsModalUpload(true);
  };
  const handleCancelUpload = () => {
    setIsModalUpload(false);
  };
  const handleSubmitUpload = async () => {
    try {
      let formDataOrder = {
        file: formDataUpload.fileName,
      };
      await ApiPostRequest(`order/upload`, formDataOrder);
      setIsModalUpload(false);
      setLoading(true);
    } catch (error) {}
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

  const getFetchData = async () => {
    try {
      setLoading(true);
      let params = {
        name: "order",
        search: filterData.search,
        status: filterData.status,
      };
      const response = await ApiGetRequest(`order`, params);
      setDataTable(response.data.data);
    } catch (error) {
      notificationError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="new-order">
        {/* <Row gutter={[24, 0]} className="pnom-table-filter">
          <Col md={20} />
          <Col md={4}>
            <Button
              onClick={handleDownloadTemplate}
              type="primary"
              icon={<CloudDownloadOutlined />}
              block={true}
              size={"default"}
            >
              Download
            </Button>
          </Col>
        </Row> */}
        <Row gutter={[24, 0]} className="pnom-table-filter">
          <Col md={6}>
            <Input
              value={filterData.search}
              onChange={(event) =>
                setFilterData({ ...filterData, search: event.target.value })
              }
              placeholder="Pencarian..."
            />
          </Col>
          <Col md={4}>
            <Select
              placeholder="Status"
              onChange={handleOnChangeStatus}
              options={statusOrderModel}
              value={filterData.status}
            />
          </Col>
          <Col md={6}></Col>
          <Col md={4}>
            <Button
              type="primary"
              onClick={handleShowUpload}
              icon={<CloudUploadOutlined />}
              block={true}
              size={"default"}
            >
              Upload Excel
            </Button>
          </Col>
          <Col md={4}>
            <Button
              onClick={() => handleDownloadTemplate()}
              type="primary"
              icon={<CloudDownloadOutlined />}
              block={true}
              id="downloadLink"
              size={"default"}
            >
              Download Template
            </Button>
          </Col>
        </Row>
        <Row className="pnom-table" gutter={[24, 0]}>
          <Col xs={24} xl={24}>
            <Table
              bordered={false}
              pagination={tableParams.pagination}
              columns={columnsOrder}
              loading={loading}
              onChange={handleTableChange}
              dataSource={dataTable}
              scroll={{
                x: 1300,
              }}
            />
          </Col>
        </Row>
      </div>

      <PnomModal
        visible={isModalDetail}
        onCancel={handleCancelDetail}
        onOk={handleSubmitCreate}
        title={isTitleModal}
        isAction={stepAction}
        width={1400}
      >
        <Content className="form-data">
          <Form>
            <Row gutter={[24, 0]}>
              <Col md={{ span: 6 }}>
                <Form.Item className="username mb-0" label="No Order">
                  <Input value={formData.numberTransaction} disabled />
                </Form.Item>
              </Col>
              <Col md={{ span: 6 }}>
                <Form.Item className="username mb-0" label="Tanggal Pesanan">
                  <DatePicker value={formData.date} disabled />
                </Form.Item>
              </Col>
              <Col md={{ span: 6 }}>
                <Form.Item className="username mb-0" label="No Pengiriman">
                  <Input value={formData?.delivery?.receiptNumber} disabled />
                </Form.Item>
              </Col>
              <Col md={{ span: 6 }}>
                <Form.Item className="username mb-0" label="Pemesanan">
                  <Input value={sourceOrder(formData?.source)} disabled />
                </Form.Item>
              </Col>
              <Col md={{ span: 6 }}>
                <Form.Item className="username mb-0" label="Status">
                  <Input value={statusOrder(formData?.status)} disabled />
                </Form.Item>
              </Col>
              <Col md={{ span: 6 }}>
                <Form.Item className="username mb-0" label="Pembayaran">
                  <Input
                    value={paymentOder(formData?.payment?.type)}
                    disabled
                  />
                </Form.Item>
              </Col>
              <Col md={{ span: 6 }}>
                <Form.Item className="username mb-0" label="Nama Pembeli">
                  <Input value={formData?.user?.name} disabled />
                </Form.Item>
              </Col>
              <Col md={{ span: 6 }}>
                <Form.Item className="username mb-0" label="Email">
                  <Input value={formData?.user?.email} disabled />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[24, 0]}>
              <Col xs={24} xl={24}>
                <h3 className="font-weight-bold">Barang</h3>
              </Col>
              <Col xs={24} xl={24}>
                <Table
                  columns={columnsTransaction}
                  dataSource={formData.detailOrder}
                />
              </Col>
            </Row>
          </Form>
        </Content>
      </PnomModal>

      <PnomModal
        visible={isModalUpload}
        onCancel={handleCancelUpload}
        onOk={handleSubmitUpload}
        title={isTitleModal}
        isAction={stepAction}
        width={600}
      >
        <Row gutter={[24, 0]}>
          <Col md={24}>
            <Form.Item
              className="username mb-2"
              label="Upload File"
              name="upload_banner"
            >
              <input
                type="file"
                id="file-upload"
                multiple
                onChange={handleUploadFile}
              />
            </Form.Item>
          </Col>
        </Row>
      </PnomModal>
    </>
  );
};

export default NewOrder;
