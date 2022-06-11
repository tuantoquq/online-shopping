import React, { useState, useEffect, memo } from 'react';
import Chart from 'react-apexcharts';

function MultiLineGraph({ id, day, data, xAxis, width }) {
  const [prevWeek, setPrevWeek] = useState([]);
  const newData = data.map(i => i/2)

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
          name: xAxis[0],
          data: data,
        },
        {
          name: xAxis[1],
          data: newData,
        },
      ]}
      type="line"
      width={width}
    />
  );
}

export default memo(MultiLineGraph);
