import React, { useState, useEffect, Component } from 'react';

import { format, add } from 'date-fns';

import clsx from 'clsx';
import styles from './CSS/adminDashboardCSS.module.scss';
import AdminSidebar from '../components/adminSidebar';
import AdminHeader from '../components/adminHeader';
import LineGraph from '../components/lineGraph';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import axios from '../config/axios';
import 'bootstrap-daterangepicker/daterangepicker.css';
import TokenService from '../service/TokenService';
import RoleService from '../service/RoleService';
import { Navigate } from 'react-router-dom';

function StatisticOrder({ navigation }) {
  const width = window.screen.width - 370;
  const height = window.screen.height * 0.85 - 200;

  const toDay = new Date();
  const thisDayMonthBefore = add(toDay, { days: -30 });
  // console.log(toDay);
  // console.log(thisDayMonthBefore);
  const [startDate, setStartDate] = useState(thisDayMonthBefore);
  const [endDate, setEndDate] = useState(toDay);

  const [countOrder, setCountOrder] = useState([]);

  useEffect(() => {
    //request for data
    let date = [];
    if (startDate && endDate) {
      let start = startDate;
      while (
        format(start, 'yyyy-MM-dd') !==
        format(add(endDate, { days: 1 }), 'yyyy-MM-dd')
      ) {
        date.push(start);
        start = add(start, { days: 1 });
      }
    }

    axios
      .post(
        '/statistic/countOrder',
        {
          startDate: format(startDate, 'yyyy-MM-dd'),
          endDate: format(endDate, 'yyyy-MM-dd'),
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        const data1 = date.map((i) => {
          for (const e of res.data.data) {
            // console.log(e._id);
            if (e._id === format(i, 'yyyy-MM-dd')) {
              return e.count;
            }
          }
          return 0;
        });
        setCountOrder(data1);
      })
      .catch((err) => console.log(err));

    // nếu có data 2 thì thêm vào
    // axios
    //   .post(
    //     '/statistic/countShop',
    //     {
    //       startDate: format(startDate, 'yyyy-MM-dd'),
    //       endDate: format(endDate, 'yyyy-MM-dd'),
    //     },
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     const data2 = date.map((i) => {
    //       for (const e of res.data.data) {
    //         // console.log(e._id);
    //         if (e._id === format(i, 'yyyy-MM-dd')) {
    //           return e.count;
    //         }
    //       }
    //       return 0;
    //     });
    //     setNewAccount(data2);
    //   })
    //   .catch((err) => console.log(err));

    // //respons data
  }, [startDate, endDate]);

  // useEffect(() => {
  //   //request for data

  //   const newAccountsLastWeek = [7, 6, 5, 4, 3, 2, 1].map(
  //     (i) => Math.floor(Math.random() * i * 10 + 1) * (8 - i) * i
  //   );
  //   setNewAccountsLastWeek(newAccountsLastWeek);
  //   setSelecteDateNewAccounts(newAccountsLastWeek[6]);
  // }, [selectedDate2]);
  const accessToken = TokenService.getLocalAccessToken(
    RoleService.getLocalRole()
  );
  if (!accessToken) {
    return <Navigate to="/admin/login"></Navigate>;
  }
  if (accessToken) {
    if (RoleService.getLocalRole() === 'customer') {
      return <Navigate to="/"></Navigate>;
    }
    if (RoleService.getLocalRole() === 'shopper') {
      return <Navigate to="/shopper/accept-order"></Navigate>;
    }
    if (RoleService.getLocalRole() === 'admin') {
      return (
        <div>
          <AdminHeader />
          <div className={clsx(styles.pageContainer)}>
            <AdminSidebar select="statistic-order" />
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
                  lines={[countOrder]}
                  xAxis={['Số đơn hàng']}
                  width={width}
                  height={height}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
export default StatisticOrder;
