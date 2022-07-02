import React, { useState, useEffect, Component } from 'react';

import { format, add } from 'date-fns';

import clsx from 'clsx';
import styles from './CSS/adminDashboardCSS.module.scss';
import AdminSidebar from '../components/adminSidebar';
import AdminHeader from '../components/adminHeader';
import LineGraph from '../components/lineGraph';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';

function AdminDashboard(props) {
  const width = window.screen.width - 370;
  const height = window.screen.height * 0.85 - 200;

  const toDay = new Date();
  const thisDayMonthBefore = add(toDay, { days: -30 });
  // console.log(toDay);
  // console.log(thisDayMonthBefore);
  const [startDate, setStartDate] = useState(thisDayMonthBefore);
  const [endDate, setEndDate] = useState(toDay);

  const [visted, setVisited] = useState([]);
  const [newAccount, setNewAccount] = useState([]);

  useEffect(() => {
    //request for data
    let data1 = [];
    let data2 = [];
    if (startDate && endDate) {
      let start = startDate;
      let i = 2;
      while (format(start, 'MM/dd/yyyy') !== format(endDate, 'MM/dd/yyyy')) {
        data1.push(Math.floor(i * Math.abs(Math.sin(i) + 3)));
        data2.push(Math.floor(i * Math.abs(Math.cos(i) + 3)));
        start = add(start, { days: 1 });
        // console.log(start);
        i = i + 1;
      }
      data1.push(Math.floor(i * Math.abs(Math.sin(i) + 3)));
      data2.push(Math.floor(i * Math.abs(Math.cos(i) + 3)));

      // console.log(timeRange);
    }
    //respons data
    setVisited(data1);
    setNewAccount(data2);
  }, [startDate, endDate]);

  // useEffect(() => {
  //   //request for data

  //   const newAccountsLastWeek = [7, 6, 5, 4, 3, 2, 1].map(
  //     (i) => Math.floor(Math.random() * i * 10 + 1) * (8 - i) * i
  //   );
  //   setNewAccountsLastWeek(newAccountsLastWeek);
  //   setSelecteDateNewAccounts(newAccountsLastWeek[6]);
  // }, [selectedDate2]);

  return (
    <div>
      <AdminHeader />
      <div className={clsx(styles.pageContainer)}>
        <AdminSidebar select="statstic_visits" />
        <div className={clsx(styles.pageBody)}>
          <div className={clsx(styles.pageRow)}>
            <DateRangePicker
              initialSettings={{
                startDate: format(startDate, 'MM/dd/yyyy'),
                endDate: format(endDate, 'MM/dd/yyyy'),
              }}
              onApply={(e, p) => {
                setEndDate(p.endDate._d);
                setStartDate(p.startDate._d);
              }}
            >
              <input className={clsx(styles.dateRangeInput)} />
            </DateRangePicker>
            <LineGraph
              className={clsx(styles.lineGraph)}
              id="visits"
              startDate={startDate}
              endDate={endDate}
              lines={[visted, newAccount]}
              xAxis={['Số lượt truy cập', 'Số lượt đăng kí mới']}
              width={width}
              height={height}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
