import React, { useState, useEffect } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import isFuture from 'date-fns/isFuture';

import clsx from 'clsx';
import styles from './CSS/adminDashboardCSS.module.scss';
import AdminSidebar from '../components/adminSidebar';
import AdminHeader from '../components/adminHeader';
import LineGraph from '../components/lineGraph';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';

function AdminDashboard(props) {
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

  return (
    <div className={clsx(styles.pageContainer)}>
      <AdminHeader />
      <AdminSidebar select="statstic_visits" />
      <div className={clsx(styles.pageBody)}>
        <div>
          <h3 className={clsx(styles.rowTitle)}> Thống kê số lượt truy cập</h3>
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
            <LineGraph
              className={clsx(styles.lineGraph)}
              id="Số lượt truy cập trong tuần"
              day={selectedDate1}
              data={visitsLastWeek}
              xAxis="visits"
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

        <div>
          <h3 className={clsx(styles.rowTitle)}>
            Thống kê số lượt đăng ký mới
          </h3>
          <div className={clsx(styles.pageRow)}>
            <div>
              <div>
                <span>
                  <strong>
                    {selectedDate2.getMonth() +
                      1 +
                      '/' +
                      selectedDate2.getFullYear()}{' '}
                  </strong>
                </span>

                <div>
                  <span>{thisMonthNewAccount}</span>
                </div>
              </div>

              <div>
                <span>
                  <strong>
                    {selectedDate2.getDate() +
                      '/' +
                      (selectedDate2.getMonth() + 1) +
                      '/' +
                      selectedDate2.getFullYear()}{' '}
                  </strong>
                </span>
                <div>
                  <span>{selectedDateNewAccounts}</span>
                </div>
              </div>
            </div>
            <LineGraph
              className={clsx(styles.lineGraph)}
              id="Số lượt đăng ký mới trong tuần"
              day={selectedDate2}
              data={newAccountsLastWeek}
              xAxis="New accounts"
              width="450"
            />

            <LocalizationProvider
              className={clsx(styles.calendar)}
              dateAdapter={AdapterDateFns}
            >
              <CalendarPicker
                className={clsx(styles.calendar)}
                openTo="day"
                date={selectedDate2}
                shouldDisableDate={isFuture}
                onChange={(newDate) => {
                  console.log(newDate);
                  setSelectedDate2(newDate);
                }}
              />
            </LocalizationProvider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
