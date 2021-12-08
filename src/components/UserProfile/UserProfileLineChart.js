import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { Col, Row, Typography } from "antd";
import PortfolioHistory from "../utility/PortfolioHistory";
import { useSelector } from "react-redux";

const { Title } = Typography;

export const dollarFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: 'USD'
})

// const dummyPortfolio = [
//   {
//     name: "Cash",
//     asset: 200,
//     percentChange: 1,
//     timestamp: 1637190000000,
//   },
//   {
//     name: "Bitcoin",
//     asset: 300,
//     percentChange: 1.0235, // 300 * 1.0235 = 307.235
//     timestamp: 1637190000000,
//   },
// ]

//const newObj = new PortfolioHistory();
//newObj.setHistory([{name: "Player 1"},{name: "Player 2"}]);
//newObj.addPortfolio(dummyPortfolio)

//console.log("Obj1",newObj)
//console.log("Obj2",newObj2)

const UserProfileLineChart = ({ userProfileData }) => {
  //console.log("profile data",userProfileData)
  const asset = [];
  const timestamp = [];

  userProfileData?.history?.forEach((item) => {
    asset.push(item.totalAssetValue());
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
           Total Asset: {dollarFormat.format( userProfileData.sumCurrentAsset())}
          </Title>
          <Title level={5} className="price-change">
            {userProfileData?.totalDollarGainOrLoss() >= 0 ? "+" : ""}
            {`$${userProfileData?.totalDollarGainOrLoss()} `}

            {userProfileData?.totalPercentChange() >= 1 ? "(+" : "("}
            {`${((userProfileData?.totalPercentChange()-1)*100).toFixed(2)}%)`}
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
