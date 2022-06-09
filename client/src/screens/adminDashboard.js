import React, { useState, useEffect } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import isFuture from 'date-fns/isFuture';

import clsx from 'clsx';
import styles from './CSS/adminDashboardCSS.module.scss';
import AdminSidebar from '../components/adminSidebar';
import LineGraph from '../components/lineGraph';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';

function AdminDashboard(props) {
  const toDay = new Date();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [visitsLastWeek, setVisitsLastWeek] = useState([]);
  const [selectedDateVisits, setSelecteDateVisits] = useState(
    visitsLastWeek[6]
  );
  const [thisMonthVisits, setThisMonthVisits] = useState(() => {
    const thisMonth = Math.floor(Math.random() * 10000 + 1);
    return thisMonth;
  });

  useEffect(() => {
    //request for data
    const lastWeekVisited = [7, 6, 5, 4, 3, 2, 1].map(
      (i) => Math.floor(Math.random() * i * 100 + 1) * (8 - i) * i
    );
    setVisitsLastWeek(lastWeekVisited);
    setSelecteDateVisits(lastWeekVisited[6]);
  }, [selectedDate]);

  return (
    <div className={clsx(styles.pageContainer)}>
      <AdminSidebar select="statstic_visits" />
      <div className={clsx(styles.pageBody)}>
        <div className={clsx(styles.pageRow)}>
          <div>
            <div>
              <div>
                <span>
                  Số lượt truy cập trong tháng{' '}
                  <strong>
                    {toDay.getMonth() + 1 + '/' + toDay.getFullYear()}{' '}
                  </strong>
                </span>

                <div>
                  <span>{thisMonthVisits}</span>
                </div>
              </div>

              <div>
                <span>
                  Số lượt truy cập trong ngày{' '}
                  <strong>
                    {selectedDate.getDate() +
                      '/' +
                      (selectedDate.getMonth() + 1) +
                      '/' +
                      selectedDate.getFullYear()}{' '}
                  </strong>
                </span>
                <div>
                  <span>{selectedDateVisits}</span>
                </div>
              </div>
            </div>
          </div>
          <LineGraph
            className={clsx(styles.lineGraph)}
            id="Số lượt truy cập trong tuần"
            day={selectedDate}
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
              date={selectedDate}
              shouldDisableDate={isFuture}
              onChange={(newDate) => {
                console.log(newDate);
                setSelectedDate(newDate);
              }}
            />
          </LocalizationProvider>
        </div>

        <div className={clsx(styles.pageRow)}>
          <div>
            <div>
              <div>
                <span>
                  Số lượt truy cập trong tháng{' '}
                  <strong>
                    {toDay.getMonth() + 1 + '/' + toDay.getFullYear()}{' '}
                  </strong>
                </span>

                <div>
                  <span>{thisMonthVisits}</span>
                </div>
              </div>

              <div>
                <span>
                  Số lượt truy cập trong ngày{' '}
                  <strong>
                    {selectedDate.getDate() +
                      '/' +
                      (selectedDate.getMonth() + 1) +
                      '/' +
                      selectedDate.getFullYear()}{' '}
                  </strong>
                </span>
                <div>
                  <span>{selectedDateVisits}</span>
                </div>
              </div>
            </div>
          </div>
          <LineGraph
            className={clsx(styles.lineGraph)}
            id="Số lượt truy cập trong tuần"
            day={selectedDate}
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
              date={selectedDate}
              shouldDisableDate={isFuture}
              onChange={(newDate) => {
                console.log(newDate);
                setSelectedDate(newDate);
              }}
            />
          </LocalizationProvider>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
