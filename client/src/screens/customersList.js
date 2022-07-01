import React, { useState, useEffect, useCallback } from 'react';

import clsx from 'clsx';
import styles from './CSS/customersListCSS.module.scss';
import AdminSidebar from '../components/adminSidebar';
import AdminHeader from '../components/adminHeader';
import AccountsList from '../components/accountsList';

function CustomerLists(props) {
  const [locked, setLocked] = useState(false);
  const [accountIdsList, setAccountIdsList] = useState([]);
  console.log(accountIdsList);

  const handleStatusChange = useCallback((status) => setLocked(status), []);
  useEffect(() => {
    //request data
    console.log(locked + 'changed');
    const len = Math.floor(Math.random() * 40);
    let reponseData = [];
    for (let i = 0; i < len; i++) {
      reponseData.push(i);
    }
    console.log(reponseData);
    setAccountIdsList(reponseData);
  }, [locked]);

  return (
    <div>
      <AdminHeader />
      <div className={clsx(styles.pageContainer)}>
        <AdminSidebar select="customers" />
        <div className={clsx(styles.pageBody)}>
          <AccountsList
            idsList={accountIdsList}
            role="customer"
            status={locked}
            onStatusChange={handleStatusChange}
          />
        </div>
      </div>
    </div>
  );
}
export default CustomerLists;
