import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Graph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://api.coinbase.com/v2/prices/ETH-USD/spot',
      );
      const json = await response.json();
      setData((data) => [...data, [Date.now(), parseFloat(json.data.amount)]]);
    };
    const interval = setInterval(() => {
      fetchData();
    }, 5000*60);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      const toDate = Math.floor(Date.now() / 1000);
      const fromDate = toDate - 5 * 24 * 60 * 60;
      const response = await fetch(
        `https://api.coinbase.com/v2/prices/ETH-USD/historic?start=${fromDate}&end=${toDate}`,
      );
      const json = await response.json();
      const historicalData = json.data.prices.map((datum) => [
        new Date(datum.time).getTime(),
        parseFloat(datum.price),
      ]);
      setData((data) => [...historicalData, ...data]);
    };
    fetchHistoricalData();
  }, []);

  const options = {
    title: {
      text: 'Ethereum Price',
    },
    xAxis: {
      type: 'datetime',
    },
    yAxis: {
      title: {
        text: 'Price (USD)',
      },
    },
    series: [
      {
        name: 'ETH-USD',
        data: data,
      },
    ],
  };

  return <HighchartsReact className="px-100" highcharts={Highcharts} options={options} />;
};

export default Graph;
