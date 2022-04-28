import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News";
import UserProfileLineChart from "./UserProfile/UserProfileLineChart";
import PortfolioHistory from "./utility/PortfolioHistory";

const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if (isFetching) return "Loading...";

  const portfolio1 = [
    {
      name: "Cash",
      asset: 200,
      percentChange: 1,
      timestamp: 1637190000000,
    },
    {
      name: "Bitcoin",
      asset: 300,
      percentChange: 1.0235, // 300 * 1.0235 = 307.235
      timestamp: 1637190000000,
    },
  ];

  const portfolio2 = [
    {
      name: "Cash",
      asset: 300, // 200 + 100
      percentChange: 1,
      timestamp: 1637258400000,
    },
    {
      name: "Bitcoin",
      asset: 207.05, // 300 * 1.0235 = 307.05 - 100 because user sold $100 worth of btc today
      percentChange: 0.9765,
      timestamp: 1637258400000,
    },
  ];

  const dummyData = new PortfolioHistory();
  dummyData.addPortfolio(portfolio1);
  dummyData.addPortfolio(portfolio2);

  return (
    <>
      <UserProfileLineChart userProfileData={dummyData} />
      <Title level={2} className="heading" style={{ padding: "20px" }}>
        Global Crypto Stats
      </Title>
      <Row style={{ padding: "20px" }}>
        <Col span={12}>
          <Statistic title="Total Cryptocurrencies" value={globalStats?.total} />
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
      <div className="home-heading-container" style={{ padding: "20px" }}>
        <Title level={2} className="home-title">
          Top 10 Cryptos In The World
        </Title>
      </div>
      <Cryptocurrencies simplified={true} />
      <div className="home-heading-container" style={{ padding: "20px" }}>
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={3}>
          <Link to="/news">Show more</Link>
        </Title>
      </div>
      <News />
    </>
  );
};

export default Homepage;
