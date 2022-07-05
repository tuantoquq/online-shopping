import React, { useState, useEffect, memo } from 'react';
import { format, add } from 'date-fns';
import Chart from 'react-apexcharts';
import PropTypes from 'prop-types';

function LineGraph({ id, startDate, endDate, lines, xAxis, width, height }) {
  const [selectedTime, setSelectedTime] = useState([]);
  // console.log(selectedTime);
  const series = xAxis.map((value, index) => {
    return {
      name: value,
      data: lines[index],
    };
  });
  useEffect(() => {
    let timeRange = [];
    let start = add(startDate, { days: 1 });
    while (
      format(start, 'MM/dd/yyyy') !==
      format(add(endDate, { days: 2 }), 'MM/dd/yyyy')
    ) {
      timeRange.push(start);
      // console.log(start);
      start = add(start, { days: 1 });
    }
    // timeRange.push(endDate);
    setSelectedTime(timeRange.map((day) => format(day, 'MM/dd/yyyy')));
    // console.log(timeRange);
  }, [startDate, endDate]);

  return (
    <Chart
      options={{
        chart: {
          id: id,
          type: 'area',
          stacked: false,

          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true,
          },
          toolbar: {
            autoSelected: 'zoom',
          },
        },
        stroke: {
          width: 3,
          // curve: 'smooth',
        },
        markers: {
          size: 3,
        },
        xaxis: {
          type: 'datetime',
          categories: selectedTime,
          tickAmount: 10,
          labels: {
            formatter: function (value, timestamp, opts) {
              return opts.dateFormatter(new Date(timestamp), 'dd/MM');
            },
          },
        },
      }}
      series={series}
      width={width}
      height={height}
    />
  );
}
export default memo(LineGraph);
