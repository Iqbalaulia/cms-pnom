import React, { useEffect, useState } from "react";
import moment from "moment";

import {
  Upload,
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
} from "antd";
import {
  InboxOutlined,
  CloudDownloadOutlined,
  CloudUploadOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

import { ApiGetRequest } from "utils/api/config";
import { paginationModel } from "composables/useSetting";
import {
  notificationError,
  sourceOrder,
  statusOrder,
  paymentOder,
} from "utils/general/general";
import { orderModel } from "utils/models/OrderModels";

import PnomModal from "components/layout/Modal";
import PnomNotification from "components/layout/Notification";

const NewOrder = () => {
  const { Content } = Layout;
  const { RangePicker } = DatePicker;
  const { Dragger } = Upload;

  const [isTitleModal, setTitleModal] = useState("Detail Data");
  const [stepAction, setStepAction] = useState("detail-data");

  const [dataTable, setDataTable] = useState([]);
  const [tableParams, setTableParams] = useState(paginationModel);
  const [formData, setFormData] = useState(orderModel);
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
      render: (item) => sourceOrder(item.source),
    },
    {
      title: "Status",
      render: (item) => statusOrder(item.status),
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
  }, []);

  const handleShowCreate = () => {
    setIsModalDetail(true);
  };
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
  const handleDownloadData = () => {
    PnomNotification({
      type: "success",
      message: "Notification Title",
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
    });
  };
  const handleShowUpload = () => {
    setIsModalUpload(true);
  };
  const handleCancelUpload = () => {
    setIsModalUpload(false);
  };
  const handleSubmitUpload = () => {
    setIsModalUpload(false);
    setLoading(true);
    PnomNotification({
      type: "success",
      message: "Notification Title",
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
    });
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
              onClick={handleDownloadData}
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
            <Input placeholder="Pencarian..." />
          </Col>
          <Col md={6}>
            <RangePicker />
          </Col>
          <Col md={4}>
            <Select placeholder="Status" />
          </Col>
          <Col md={4}></Col>
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
        width={600}
      >
        <Row gutter={[24, 0]}>
          <Col md={24}>
            <Dragger>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from
                uploading company data or other band files
              </p>
            </Dragger>
          </Col>
        </Row>
      </PnomModal>
    </>
  );
};

export default NewOrder;
