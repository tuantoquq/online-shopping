import React from 'react';
import { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './CSS/AdminSidebarCSS.module.scss';
import GroupIcon from '@mui/icons-material/Group';
import InventoryIcon from '@mui/icons-material/Inventory';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import ExpandMore from '@mui/icons-material/ExpandMore';

function AdminSidebar({ select }) {
  const [selected, setSelected] = useState(select);

  return (
    <div className={clsx(styles.sidebar)}>
      <div className={clsx(styles.manageField)}>
        <div className={clsx(styles.manageFieldHeader)}>
          <LeaderboardIcon className={clsx(styles.icon)} />

          <div className={clsx(styles.manageHeaderRight)}>
            <span>Thống kê </span>
            <ExpandMore className={clsx(styles.icon)} />
          </div>
        </div>
        <div>
          <div className={clsx(styles.listItem)}>
            <Link
              to="/admin"
              className={clsx(styles.listItemButton, {
                [styles.selectedItem]: selected === 'statstic_visits',
              })}
              onClick={() => setSelected('statstic_visits')}
            >
              <span>Thống kê tài khoản </span>
            </Link>
            <Link
              to="/admin/statistic-revenue"
              className={clsx(styles.listItemButton, {
                [styles.selectedItem]: selected === 'statistic-revenue',
              })}
              onClick={() => setSelected('statistic-revenue1')}
            >
              <span>Thống kê doanh thu </span>
            </Link>
            <Link
              to="/admin/statistic-order"
              className={clsx(styles.listItemButton, {
                [styles.selectedItem]: selected === 'statistic-order',
              })}
              onClick={() => setSelected('statistic-order')}
            >
              <span>Thống kê đơn hàng </span>
            </Link>
          </div>
        </div>
      </div>
      <div className={clsx(styles.manageField)}>
        <div className={clsx(styles.manageFieldHeader)}>
          <GroupIcon className={clsx(styles.icon)} />
          <div className={clsx(styles.manageHeaderRight)}>
            <span>Quản lí tài khoản </span>
            <ExpandMore className={clsx(styles.icon)} />
          </div>
        </div>
        <div>
          <div className={clsx(styles.listItem)}>
            <Link
              to="/admin/customers"
              className={clsx(styles.listItemButton, {
                [styles.selectedItem]: selected === 'customers',
              })}
              onClick={() => setSelected('customers')}
            >
              <span>Danh sách khách hàng </span>
            </Link>

            <Link
              to="/admin/shop"
              className={clsx(styles.listItemButton, {
                [styles.selectedItem]: selected === 2,
              })}
              onClick={() => setSelected(2)}
            >
              <span>Danh sách cửa hàng </span>
            </Link>

            <Link
              to="/admin/shop-request"
              className={clsx(styles.listItemButton, {
                [styles.selectedItem]: selected === 3,
              })}
              onClick={() => setSelected(3)}
            >
              <span>Đăng kí bán hàng </span>
            </Link>
          </div>
        </div>
      </div>

      <div className={clsx(styles.manageField)}>
        <div className={clsx(styles.manageFieldHeader)}>
          <InventoryIcon className={clsx(styles.icon)} />

          <div className={clsx(styles.manageHeaderRight)}>
            <span>Quản lí sản phẩm </span>
            <ExpandMore className={clsx(styles.icon)} />
          </div>
        </div>
        <div>
          <div className={clsx(styles.listItem)}>
            <Link
              to="/admin"
              className={clsx(styles.listItemButton, {
                [styles.selectedItem]: selected === 4,
              })}
              onClick={() => setSelected(4)}
            >
              <span>Danh sách sản phẩm </span>
            </Link>
            <Link
              to="/admin"
              className={clsx(styles.listItemButton, {
                [styles.selectedItem]: selected === 5,
              })}
              onClick={() => setSelected(5)}
            >
              <span>Yêu cầu đăng bán </span>
            </Link>
            <Link
              to="/admin"
              className={clsx(styles.listItemButton, {
                [styles.selectedItem]: selected === 6,
              })}
              onClick={() => setSelected(6)}
            >
              <span>Sản phẩm bán chạy </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(AdminSidebar);
