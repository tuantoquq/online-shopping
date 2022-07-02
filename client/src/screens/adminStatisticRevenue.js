import styles from './CSS/admin_statistic.module.css';
import AdminSidebar from '../components/adminSidebar';
import React, { useState, useEffect } from 'react';

import ApexChart from '../components/lineChart';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import isFuture from 'date-fns/isFuture';
import MultiLineGraph from '../components/multiLineGraph';
import clsx from 'clsx';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import TokenService from '../service/TokenService';
import RoleService from '../service/RoleService';
import { Navigate } from 'react-router-dom';

function StatisticRevenue({ navigation }) {
  const toDay = new Date();
  const [selectedDate1, setSelectedDate1] = useState(new Date());

  const [visitsLastWeek, setVisitsLastWeek] = useState([]);
  const [selectedDateVisits, setSelecteDateVisits] = useState(
    visitsLastWeek[6]
  );
  const [thisMonthVisits] = useState(() => {
    const thisMonth = Math.floor(Math.random() * 10000 + 1);
    return thisMonth;
  });

  const [selectedDate2, setSelectedDate2] = useState(new Date());

  const [newAccountsLastWeek, setNewAccountsLastWeek] = useState([]);
  const [selectedDateNewAccounts, setSelecteDateNewAccounts] = useState(
    newAccountsLastWeek[6]
  );
  const [thisMonthNewAccount] = useState(() => {
    const thisMonth = Math.floor(Math.random() * 100 + 1);
    return thisMonth;
  });

  useEffect(() => {
    //request for data
    const lastWeekVisited = [7, 6, 5, 4, 3, 2, 1].map(
      (i) => Math.floor(Math.random() * i * 100 + 1) * (8 - i) * i
    );

    setVisitsLastWeek(lastWeekVisited);
    setSelecteDateVisits(lastWeekVisited[6]);
  }, [selectedDate1]);

  useEffect(() => {
    //request for data

    const newAccountsLastWeek = [7, 6, 5, 4, 3, 2, 1].map(
      (i) => Math.floor(Math.random() * i * 10 + 1) * (8 - i) * i
    );
    setNewAccountsLastWeek(newAccountsLastWeek);
    setSelecteDateNewAccounts(newAccountsLastWeek[6]);
  }, [selectedDate2]);
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
        <div className={styles.Home}>
          {/* <Header navigation={navigation} /> */}
          <div className={styles.content}>
            <div className={styles.tab1}>
              <AdminSidebar select="statistic-revenue" />
            </div>

            <div className={styles.tab2}>
              <h3 className={clsx(styles.rowTitle)}>
                {' '}
                Thống kê số lượt truy cập
              </h3>
              <div className={clsx(styles.pageRow)}>
                <div>
                  <div>
                    <span>
                      <strong>
                        {selectedDate1.getMonth() +
                          1 +
                          '/' +
                          selectedDate1.getFullYear()}{' '}
                      </strong>
                    </span>

                    <div>
                      <span>{thisMonthVisits}</span>
                    </div>
                  </div>

                  <div>
                    <span>
                      <strong>
                        {selectedDate1.getDate() +
                          '/' +
                          (selectedDate1.getMonth() + 1) +
                          '/' +
                          selectedDate1.getFullYear()}{' '}
                      </strong>
                    </span>
                    <div>
                      <span>{selectedDateVisits}</span>
                    </div>
                  </div>
                </div>
                <MultiLineGraph
                  className={clsx(styles.lineGraph)}
                  id="Số lượt truy cập trong tuần"
                  day={selectedDate1}
                  data={visitsLastWeek}
                  xAxis={['Chấp nhận', 'Từ chối']}
                  width="450"
                />

                <LocalizationProvider
                  className={clsx(styles.calendar)}
                  dateAdapter={AdapterDateFns}
                >
                  <CalendarPicker
                    className={clsx(styles.calendar)}
                    openTo="day"
                    date={selectedDate1}
                    shouldDisableDate={isFuture}
                    onChange={(newDate) => {
                      console.log(newDate);
                      setSelectedDate1(newDate);
                    }}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>
          {/* <Footer navigation={navigation} /> */}
        </div>
      );
    }
  }
}
export default StatisticRevenue;
