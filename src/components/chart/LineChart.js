import { Typography } from "antd";
import ReactApexChart from "react-apexcharts";

import lineChart from "./configs/lineChart";

function LineChart(props) {
  const { users = {} } = props;
  const categories = users?.categories || [];
  const series = users?.series || [];
  const chartOptions = {
    ...lineChart.options,
    xaxis: {
      ...lineChart.options.xaxis,
      categories,
    },
  };
  const { Title, Paragraph } = Typography;
  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Total Users</Title>
          <Paragraph className="lastweek">
            Pengguna<span className="bnb2"></span>
          </Paragraph>
        </div>
      </div>

      <ReactApexChart
        className="full-width"
        options={chartOptions}
        series={series}
        type="area"
        height={350}
        width={"100%"}
      />
    </>
  );
}

export default LineChart;
