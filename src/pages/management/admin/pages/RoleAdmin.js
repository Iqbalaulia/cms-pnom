import React, { useEffect, useState } from "react";

import {
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
  Tooltip,
} from "antd";
import {
  CheckCircleOutlined,
  EditOutlined,
  InfoCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

import {
  paginationModel,
  rolesPermissionModel,
  statusModel,
} from "composables/useSetting";

import PnomModal from "components/layout/Modal";
import PnomNotification from "components/layout/Notification";
import MenuComponent from "components/layout/MenuComponent";

import { ApiGetRequest, ApiPostRequest, ApiPutRequest } from "utils/api/config";
import { roleModel, enableMenuModel } from "utils/models/AdminModels";
import { notificationError, notificationSuccess } from "utils/general/general";

const RoleAdmin = () => {
  const { Content } = Layout;

  const [dataTable, setDataTable] = useState([]);

  const [loading, setLoading] = useState(false);
  const [isModalForm, setIsModalForm] = useState(false);

  const [stepAction, setStepAction] = useState("save-data");
  const [isTitleModal, setTitleModal] = useState("Tambah Data");
  const [isUuid, setUuid] = useState("");

  const [tableParams, setTableParams] = useState(paginationModel);
  const [formData, setFormData] = useState(roleModel);
  const [filterData, setFilterData] = useState({
    startDate: "",
    endDate: "",
    search: "",
    status: 1,
  });
  const [formInputData] = Form.useForm();

  const columnsRoleAdmin = [
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
      title: "Nama Role",
      sorter: true,
      render: (item) => `${item.name}`,
    },
    {
      title: "Status",
      sorter: true,
      render: (item) => (
        <Tag color={item.status !== "0" ? "green" : "red"}>
          {item.status !== "0" ? "Aktif" : "Tidak Aktif"}
        </Tag>
      ),
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
          {filterData.status === 1 ? (
            <Tooltip placement="topLeft" title="Non aktif role">
              <Button
                onClick={() => handleUpdateStatus(item)}
                type="danger"
                ghost
                icon={<InfoCircleOutlined />}
                size={"large"}
              />
            </Tooltip>
          ) : (
            <Tooltip placement="topLeft" title="Aktifasi role">
              <Button
                onClick={() => handleUpdateStatus(item)}
                type="primary"
                ghost
                icon={<CheckCircleOutlined />}
                size={"large"}
              />
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getFetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterData.search, filterData.status]);

  const handleUpdateStatus = (item) => {
    updateStatusRole(item);
  };
  const handleResetField = () => {
    setFormData({ ...roleModel });
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
      name: item.name,
      status: parseInt(item.status),
    });

    formInputData.setFieldsValue({
      name: item.name,
      status: parseInt(item.status),
    });

    setUuid(item.uuid);
    setIsModalForm(true);
    setStepAction("update-data");
    setTitleModal("Edit Data");
  };
  const handleSubmit = () => {
    if (stepAction === `save-data`) saveDataForm();
    if (stepAction === `update-data`) updateDataForm(isUuid);
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
  const handleOnChangeStatus = (event) => {
    setFilterData({ ...filterData, status: event });
    getFetchData();
  };

  const getFetchData = async () => {
    try {
      let params = {
        startDate: filterData.startDate,
        endDate: filterData.endDate,
        search: filterData.search,
        status: filterData.status,
      };

      setLoading(true);
      const response = await ApiGetRequest(`admin/role`, params);
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
    const validateValue = await formInputData.validateFields();
    if (validateValue) {
      try {
        setLoading(true);
        let formRoleAdmin = {
          name: formData.name,
          permission: formData.permission,
          status: 1,
        };
        await ApiPostRequest(`admin/role`, formRoleAdmin);
        setIsModalForm(false);
        handleResetField();
        await getFetchData();
      } catch (error) {
        notificationError(error);
      } finally {
        setLoading(false);
      }
    }
  };
  const updateDataForm = async (uuid) => {
    const validateValue = await formInputData.validateFields();

    if (validateValue) {
      try {
        setLoading(true);
        let formRoleAdmin = {
          name: formData.name,
          status: formData.status,
          permission: formData.permission,
        };
        await ApiPutRequest(`admin/role/${uuid}`, formRoleAdmin);

        notificationSuccess("Data admin berhasil diupdate!");
        setIsModalForm(false);
        await getFetchData();
      } catch (error) {
        notificationError(error);
      } finally {
        setLoading(false);
      }
    }
  };
  const updateStatusRole = async (item) => {
    try {
      setLoading(true);
      let formRoleStatus = {
        name: item.name,
        permission: rolesPermissionModel.permission,
      };

      if (filterData.status === 1) {
        formRoleStatus.status = 0;
      } else {
        formRoleStatus.status = 1;
      }

      await ApiPutRequest(`admin/role/${item.uuid}`, formRoleStatus);

      if (filterData.status === 1) {
        notificationSuccess("Data berhasil di non aktifkan!");
      } else {
        notificationSuccess("Data berhasil di aktifkan!");
      }
      setIsModalForm(false);
      handleResetField();
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
      <div className="admin-table">
        <Row gutter={[24, 0]} className="pnom-table-filter">
          <Col md={{ span: 6 }} xs={{ span: 24 }}>
            <Input
              placeholder="Pencarian..."
              value={filterData.search}
              onChange={(event) =>
                setFilterData({ ...filterData, search: event.target.value })
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
              columns={columnsRoleAdmin}
              dataSource={dataTable}
              loading={loading}
              onChange={handleTableChange}
              rowKey={(record) => record.id}
              pagination={tableParams.pagination}
              scroll={{ x: 1300 }}
            />
          </Col>
        </Row>
      </div>

      <PnomModal
        onOk={handleSubmit}
        onCancel={handleCancelSubmit}
        visible={isModalForm}
        title={isTitleModal}
        isAction={stepAction}
        width={800}
      >
        <Content className="form-data">
          <Form
            form={formInputData}
            initialValues={{
              remember: true,
            }}
          >
            <Row gutter={[24, 0]}>
              <Col md={{ span: 24 }} xs={{ span: 24 }}>
                <Form.Item
                  className="username mb-0"
                  label="Nama"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Input data nama!",
                    },
                  ]}
                >
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    placeholder="Nama"
                  />
                </Form.Item>
              </Col>
              <Col md={{ span: 24 }} xs={{ span: 24 }}>
                <Form.Item
                  className="username"
                  label="Status"
                  name="status"
                  rules={[
                    {
                      required: true,
                      message: "Input data jenis status!",
                    },
                  ]}
                >
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
              </Col>
              <Col md={{ span: 24 }} xs={{ span: 24 }}>
                <MenuComponent
                  enableMenuModel={enableMenuModel}
                  setFormData={setFormData}
                />
              </Col>
            </Row>
          </Form>
        </Content>
      </PnomModal>
    </>
  );
};

export default RoleAdmin;
