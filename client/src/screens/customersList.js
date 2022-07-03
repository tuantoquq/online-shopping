import React, { useState, useEffect, useCallback } from 'react';

import clsx from 'clsx';
import styles from './CSS/customersListCSS.module.scss';
import AdminSidebar from '../components/adminSidebar';
import AdminHeader from '../components/adminHeader';
import AccountsList from '../components/accountsList';
import MUIDataTable from 'mui-datatables';
import axiosConfig from '../config/axios';
import { Tooltip, IconButton } from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';
import TokenService from '../service/TokenService';
import RoleService from '../service/RoleService';
import { Navigate } from 'react-router-dom';

function CustomerLists(props) {
  const [data, setData] = useState([]);
  // const [customerList, setCustomerList] = useState([]);
  useEffect(() => {
    axiosConfig({
      method: 'get',
      url: '/customer/getall',
    })
      .then((res) => {
        return res.data.data.map((item) => {
          let status = item.isBlock === 0 ? 'Active' : 'Is Block';

          return {
            email: item.email,
            phoneNumber: item.phoneNumber,
            fullname: item.firstName + item.lastName,
            gender: item.gender,
            role: 'Khách hàng',
            status: status,
          };
        });
      })
      .then((customerList) => {
        axiosConfig({
          method: 'get',
          url: '/shopper/get-shopper-with-state?state=1',
        })
          .then((res) => {
            let shopper = res.data.data.map((item) => {
              let status = item.isBlock === 0 ? 'Active' : 'Is Block';
              return {
                email: item.email,
                phoneNumber: item.phoneNumber,
                fullname: item.firstName + item.lastName,
                gender: item.gender,
                role: 'Người bán hàng',
                status: status,
              };
            });
            setData([...customerList, ...shopper]);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);
  const columns = [
    {
      name: 'email',
      options: {
        filter: true,
      },
      label: 'Email',
    },
    {
      name: 'phoneNumber',
      options: {
        filter: true,
      },
      label: 'Số điện thoại',
    },
    {
      name: 'fullname',
      options: {
        filter: true,
      },
      label: 'Họ và tên',
    },
    {
      name: 'gender',
      options: {
        filter: true,
      },
      label: 'Giới tính',
    },
    {
      name: 'role',
      options: {
        filter: true,
      },
      label: 'Vai trò',
    },
    {
      name: 'status',
      options: {
        filter: true,
      },
      label: 'Trạng thái',
    },
  ];
  const block = (email, role) => {
    // console.log(email,role)
  };

  const options = {
    filter: false,
    print: false,
    selectableRows: 'single',
    responsive: 'standard',
    selectableRows: true,
    textLabels: {},
    customToolbarSelect: (selectedRows) => (
      <>
        <Tooltip title="Kích hoạt tiến trình">
          <IconButton
            onClick={() => {
              block(
                data[selectedRows.data[0].dataIndex]['email'],
                data[selectedRows.data[0].dataIndex]['role']
              );
            }}
          >
            <BlockIcon />
          </IconButton>
        </Tooltip>
      </>
    ),
  };

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
            <AdminSidebar select="customers" />
            <div className={clsx(styles.pageBody)}>
              <MUIDataTable
                title={'Thông tin khách hàng'}
                data={data}
                columns={columns}
                options={options}
              />
            </div>
          </div>
        </div>
      );
    }
  }
}
export default CustomerLists;
