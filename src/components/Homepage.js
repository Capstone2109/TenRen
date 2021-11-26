import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News";
import UserProfileLineChart from "./UserProfile/UserProfileLineChart";

const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if (isFetching) return "Loading...";

  const dummyData = {
    get dollarGainLoss() {
      if (this.totalAsset === 0) return "";
      const gainOrLoss =
        this.history[this.history.length - 1].asset - this.history[0].asset;
      return gainOrLoss > 0
        ? `+$${gainOrLoss.toFixed(2)}`
        : `${gainOrLoss.toFixed(2)}`;
    },
    get percentChange() {
      if (this.history[this.history.length - 1].asset === this.history[0].asset)
        return "(0%)";
      const percent =
        ((this.history[this.history.length - 1].asset - this.history[0].asset) /
          this.history[0].asset) *
        100;

      return percent > 0
        ? `(+${percent.toFixed(2)}%)`
        : `(${percent.toFixed(2)}%)`;
    },
    get totalAsset() {
      const total = this?.history[this.history.length - 1]["asset"];
      return this.history ? total : "";
    },
    history: [
      {
        get timestamp() {
          return this.portfolio[0].timestamp;
        },
        get asset() {
          return this.portfolio.reduce((acc, curr) => {
            return acc + curr.asset;
          }, 0);
        },
        portfolio: [
          {
            name: "Bitcoin",
            asset: 300,
            percentChange: 1.0235, // 300 * 1.0235 = 307.235
            timestamp: 1637190000000,
          },
          {
            name: "Cash",
            asset: 200,
            percentChange: 1,
            timestamp: 1637190000000,
          },
        ],
      },
      {
        get timestamp() {
          return this.portfolio[0].timestamp;
        },
        get asset() {
          return this.portfolio.reduce((acc, curr) => {
            return acc + curr.asset;
          }, 0);
        },
        portfolio: [
          {
            name: "Bitcoin",
            asset: 207.05, // 300 * 1.0235 = 307.05 - 100 because user sold $100 worth of btc today
            percentChange: 0.9765,
            timestamp: 1637258400000,
          },
          {
            name: "Cash",
            asset: 300, // 200 + 100
            percentChange: 1,
            timestamp: 1637258400000,
          },
        ],
      },
    ],
  };

  return (
    <>
      <UserProfileLineChart userProfileData={dummyData} />

      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic title="Total Cryptocurrencies" value={globalStats.total} />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={millify(globalStats.totalExchanges)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap:"
            value={`$${millify(globalStats.totalMarketCap)}`}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={`$${millify(globalStats.total24hVolume)}`}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={millify(globalStats.totalMarkets)}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptos In The World
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show more</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={3}>
          <Link to="/news">Show more</Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
};

export default Homepage;
