import { Row, Col, Card, Typography, DatePicker, Table } from "antd";
import Echart from "components/chart/EChart";
import LineChart from "components/chart/LineChart";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { ApiGetRequest } from "utils/api/config";
import { notificationError } from "utils/general/general";
import {
  summaryDataModel,
  summaryChartModel,
  summaryListModel,
} from "utils/models/DashboardModels";

const Dashboard = () => {
  const { Title } = Typography;

  const [filterParams, setFilterParams] = useState({
    startDate: dayjs().subtract(2, "month").startOf("month"),
    endDate: dayjs().subtract(0, "month").endOf("month").startOf("month"),
  });
  const [summaryData, setSummaryData] = useState(summaryDataModel);
  const [summaryChart, setSummaryChart] = useState(summaryChartModel);
  const [summaryList, setSummaryList] = useState(summaryListModel);

  const columnDataList = [
    {
      title: "Produk",
      sorter: true,
      render: (item) => `${item.name}`,
    },
    {
      title: "Kategori",
      sorter: true,
      render: (item) => `${item.name}`,
    },
    {
      title: "Motif",
      sorter: true,
      render: (item) => `${item.name}`,
    },
    {
      title: "Variant",
      sorter: true,
      render: (item) => `${item.name}`,
    },
  ];
  useEffect(() => {
    fetchDataSummary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchDataChart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchDataList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterParams.startDate, filterParams.endDate]);

  const fetchDataSummary = async () => {
    try {
      const params = {
        startDate: dayjs(filterParams.startDate).format("YYYY-MM-DD"),
        endDate: dayjs(filterParams.endDate).format("YYYY-MM-DD"),
      };

      const response = await ApiGetRequest(`dashboard/summary`, params);
      setSummaryData({
        ...response.data.data,
      });
    } catch (error) {
      notificationError(error);
    }
  };

  const fetchDataList = async () => {
    try {
      const params = {
        startDate: dayjs(filterParams.startDate).format("YYYY-MM-DD"),
        endDate: dayjs(filterParams.endDate).format("YYYY-MM-DD"),
      };

      const response = await ApiGetRequest(`dashboard/list`, params);
      setSummaryList({
        ...response.data.data,
      });
    } catch (error) {
      notificationError(error);
    }
  };

  const fetchDataChart = async () => {
    try {
      const params = {
        startDate: dayjs(filterParams.startDate).format("YYYY-MM-DD"),
        endDate: dayjs(filterParams.endDate).format("YYYY-MM-DD"),
      };

      const response = await ApiGetRequest(`dashboard/chart`, params);

      const { dataValueUser, dataLabelUser } = response.data.data.user.reduce(
        (acc, element) => ({
          ...acc,
          dataValueUser: [...acc.dataValueUser, element.value],
          dataLabelUser: [...acc.dataLabelUser, element.label],
        }),
        { dataValueUser: [], dataLabelUser: [] },
      );

      const { dataValueOrder, dataLabelOrder } =
        response.data.data.orderAmount.reduce(
          (acc, element) => ({
            ...acc,
            dataValueOrder: [...acc.dataValueOrder, element.value],
            dataLabelOrder: [...acc.dataLabelOrder, element.label],
          }),
          { dataValueOrder: [], dataLabelOrder: [] },
        );

      setSummaryChart({
        order: response.data.data.order,
        orderAmount: {
          series: [
            {
              name: "Pengguna",
              data: dataValueOrder,
              offsetY: 0,
            },
          ],
          categories: dataLabelOrder,
        },
        user: {
          series: [
            {
              name: "Pengguna",
              data: dataValueUser,
              offsetY: 0,
            },
          ],
          categories: dataLabelUser,
        },
      });
    } catch (error) {
      notificationError(error);
    }
  };

  return (
    <>
      <div className="layout-content">
        <div className="filter-date mb-4">
          <Card>
            <Row gutter={[24, 0]}>
              <Col md={6}>
                <DatePicker
                  format={"YYYY-MM-DD"}
                  placeholder="Tanggal Mulai"
                  value={filterParams.startDate}
                  onChange={(event) =>
                    setFilterParams({
                      ...filterParams,
                      startDate: event,
                    })
                  }
                />
              </Col>
              <Col md={6}>
                <DatePicker
                  placeholder="Tanggal Akhir"
                  value={filterParams.endDate}
                  onChange={(event) =>
                    setFilterParams({
                      ...filterParams,
                      endDate: event,
                    })
                  }
                />
              </Col>
            </Row>
          </Card>
        </div>
        <Row className="rowgap-vbox" gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={6} xl={6} className="mb-24">
            <Card bordered={false} className="criclebox">
              <div className="number">
                <Row align="middle" gutter={[24, 0]}>
                  <Col xs={18}>
                    <span>Pengguna</span>
                    <Title level={3}>{summaryData.user}</Title>
                  </Col>
                  <Col xs={6}>
                    <div className="icon-box"></div>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={6} xl={6} className="mb-24">
            <Card bordered={false} className="criclebox">
              <div className="number">
                <Row align="middle" gutter={[24, 0]}>
                  <Col xs={18}>
                    <span>Total Pesanan</span>
                    <Title level={3}>{summaryData.orderAmount}</Title>
                  </Col>
                  <Col xs={6}>
                    <div className="icon-box"></div>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={6} xl={6} className="mb-24">
            <Card bordered={false} className="criclebox">
              <div className="number">
                <Row align="middle" gutter={[24, 0]}>
                  <Col xs={18}>
                    <span>Packing</span>
                    <Title level={3}>{summaryData.orderPacking}</Title>
                  </Col>
                  <Col xs={6}>
                    <div className="icon-box"></div>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={6} xl={6} className="mb-24">
            <Card bordered={false} className="criclebox">
              <div className="number">
                <Row align="middle" gutter={[24, 0]}>
                  <Col xs={18}>
                    <span>Shipping</span>
                    <Title level={3}>{summaryData.orderShipping}</Title>
                  </Col>
                  <Col xs={6}>
                    <div className="icon-box"></div>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <Echart
                startDate={filterParams.startDate}
                endDate={filterParams.endDate}
                orders={summaryChart.orderAmount}
                summaryData={summaryData}
              />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <LineChart users={summaryChart.user} />
            </Card>
          </Col>
        </Row>
        <Row gutter={[24, 0]}>
          <Col md={24}>
            <Card>
              <Row gutter={[24, 0]}>
                <Col md={24}>
                  <div className="ant-list-box table-responsive">
                    <Table
                      bordered={false}
                      columns={columnDataList}
                      className="ant-border-space"
                      dataSource={summaryList.productBestSeller}
                      scroll={{ x: 1300 }}
                    />
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Dashboard;
