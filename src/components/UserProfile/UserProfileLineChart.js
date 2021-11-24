import React from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { Col, Row, Typography } from "antd";

const { Title } = Typography;

const UserProfileLineChart = ({ userProfileData }) => {
  const asset = [];
  const timestamp = [];

  userProfileData?.history?.forEach((item) => {
    asset.push(item.asset);
    timestamp.push(new Date(item.timestamp).toLocaleDateString());
  });

  const data = {
    labels: timestamp,
    datasets: [
      {
        label: "User Portfolio",
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
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          UserProfile
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            Change: {userProfileData?.totalChange}%
          </Title>
          <Title level={5} className="current-price">
            Current Portfolio: $ {userProfileData?.totalAsset}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default UserProfileLineChart;
