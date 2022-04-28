import React, { useEffect, useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import axios from "axios";

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

async function getTodayNews() {
  try {
    const { data } = await axios.get("/api/news/today");
    return data;

  } catch (error) {
    console.log(error);
  }
}

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  // // Our ten ren solution that we are using to get todays news that throws the error, because there is no data in '/api/news/today
  const [todayNews, setTodayNews] = useState([]);
  // useEffect(() => {
  //   getTodayNews().then((data) => {
  //     let coinArray;
  //     coinArray = JSON.parse(data?.[0].data);

  //     setTodayNews(coinArray);
  //   });
  // }, todayNews);
  const { data } = useGetCryptosQuery(100);

  // have to use this to render news, you can commented once u uncomment ten ren solutions
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });


  // our ten ren solution for getting todays news for the coin it throws the error if i uncomment it
  // const cryptoNews = {
  //   value: todayNews?.filter((coin) => {
  //     return coin.category === newsCategory;
  //   })[0]?.data,
  // };

  if (!cryptoNews?.value) return "Loading...";

  if (cryptoNews.value) {
    console.log("News Data:", cryptoNews.value);
  }

  return (
    <Row gutter={[24, 24]} style={{ padding: "20px" }}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurency">Cryptocurrency</Option>
            {data?.data?.coins?.map((coin) => (
              <Option value={coin.name}>{coin.name}</Option>
            ))}
          </Select>
        </Col>
      )}
      {cryptoNews?.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.name}
                </Title>
                <img
                  src={news?.image?.thumbnail?.contentUrl || demoImage}
                  alt=""
                />
              </div>
              <p>
                {news.description.length > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar
                    src={
                      news.provider[0]?.image?.thumbnail?.contentUrl ||
                      demoImage
                    }
                    alt=""
                  />
                  <Text className="provider-name">
                    {news.provider[0]?.name}
                  </Text>
                </div>
                <Text>
                  {moment(news.datePublished).startOf("ss").fromNow()}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
