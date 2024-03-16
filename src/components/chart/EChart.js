import { Row, Col, Typography } from "antd";
import dayjs from "dayjs";
import ReactApexChart from "react-apexcharts";

import eChart from "./configs/eChart";

function EChart(props) {
  const { orders = {}, startDate, endDate, summaryData } = props;
  const categories = orders?.categories || [];
  const series = orders?.series || [];
  const chartOptions = {
    ...eChart.options,
    xaxis: {
      ...eChart.options.xaxis,
      categories,
    },
  };
  const { Title, Paragraph } = Typography;

  return (
    <>
      <div id="chart">
        <ReactApexChart
          className="bar-chart"
          options={chartOptions}
          series={series}
          type="bar"
          height={220}
        />
      </div>
      <div className="chart-vistior">
        <Title level={5}>Total Pesanan </Title>
        <Paragraph className="lastweek">
          Grafik pesanan berdasarkan range (
          {dayjs(startDate).format("DD MMMM YYYY") +
            " - " +
            dayjs(endDate).format("DD MMMM YYYY")}
          ). Grafik dapat berubah sesuai pemilihan tanggal
        </Paragraph>
        <Row gutter>
          <Col xs={6} xl={6} sm={6} md={6}>
            <div className="chart-visitor-count">
              <Title level={5}>Cutting</Title>
              <span>{summaryData?.orderCutting}</span>
            </div>
          </Col>
          <Col xs={6} xl={6} sm={6} md={6}>
            <div className="chart-visitor-count">
              <Title level={5}>Printing</Title>
              <span>{summaryData?.orderPrinting}</span>
            </div>
          </Col>
          <Col xs={6} xl={6} sm={6} md={6}>
            <div className="chart-visitor-count">
              <Title level={5}>Pengiriman</Title>
              <span>{summaryData?.orderDelivered}</span>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default EChart;
