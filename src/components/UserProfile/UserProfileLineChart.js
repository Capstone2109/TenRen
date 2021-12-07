import React from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { Col, Row, Typography } from "antd";

const { Title } = Typography;

const UserProfileLineChart = ({ userProfileData }) => {
  const asset = [];
  const timestamp = [];

  userProfileData?.history()?.forEach((item) => {
    asset.push(item.asset());
    timestamp.push(new Date(item.timestamp()).toLocaleDateString());
  });

  const data = {
    labels: timestamp,
    datasets: [
      {
        label: "Asset",
        data: asset,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div className="userprofile-graph">
      <Row className="chart-header">
        <Col>
          <Title level={5} className="current-price">
            ${userProfileData?.totalAsset()} 10
          </Title>
          <Title level={5} className="price-change">
            {userProfileData?.totalDollarGainOrLoss() >= 0 ? "+" : ""}
            {`$${userProfileData?.totalDollarGainOrLoss()} `}

            {userProfileData?.totalPercentChange() >= 0 ? "(+" : "("}
            {`${userProfileData?.totalPercentChange()}%)`}
          </Title>
        </Col>
        <Title level={2} className="chart-title">
          UserProfile
        </Title>
      </Row>
      <Line data={data} options={options} />
    </div>
  );
};

export default UserProfileLineChart;
