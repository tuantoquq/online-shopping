import React, { useState, useEffect, memo } from 'react';
import Chart from 'react-apexcharts';

function LineGraph({ id, day, data, xAxis, width }) {
  const [prevWeek, setPrevWeek] = useState([]);

  useEffect(() => {
    const lastWeek = [7, 6, 5, 4, 3, 2, 1].map((i) => {
      let nDay = new Date();
      nDay.setDate(day.getDate() - i);
      //console.log(nDay);
      return (
        nDay.getDate() + '/' + (nDay.getMonth() + 1) + '/' + nDay.getFullYear()
      );
    });
    console.log(lastWeek);
    setPrevWeek(lastWeek);
  }, [day]);

  return (
    <Chart
      options={{
        chart: {
          id: id,
        },
        xaxis: {
          categories: prevWeek,
        },
      }}
      series={[
        {
          name: xAxis,
          data: data,
        },
      ]}
      type="line"
      width={width}
    />
  );
}

export default memo(LineGraph);
