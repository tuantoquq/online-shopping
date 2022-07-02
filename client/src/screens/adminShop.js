import axiosConfig from '../config/axios';

import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import MUIDataTable from 'mui-datatables';
import AdminSidebar from '../components/adminSidebar';
import Grid from '@mui/material/Grid';

export default function AdminShop() {
  const [rows, setRows] = useState([]);
  console.log(rows);

  const columns = [
    {
      name: 'shopName',
      options: {
        filter: true,
      },
      label: 'Tên cửa hàng',
    },
    {
      name: 'address',
      options: {
        filter: true,
      },
      label: 'Địa chỉ',
    },

    {
      name: 'status',
      options: {
        filter: true,
      },
      label: 'Trạng thái',
    },
  ];
  const options = {
    filter: false,
    print: false,
    selectableRows: 'single',
    responsive: 'standard',
    selectableRows: false,
  };
  useEffect(() => {
    axiosConfig({
      method: 'get',
      url: '/shops',
    })
      .then((res) => {
        let total = res.data.data.totalShops;
        console.log(total);
        axiosConfig({
          method: 'get',
          url: `/shops?limit=${total}`,
        })
          .then((res) => {
            setRows(
              res.data.data.listShop.map((item) => {
                let status = item.status === 1 ? 'Active' : 'InActive';
                return {
                  shopName: item.shopName,
                  address: item.address,
                  status: status,
                };
              })
            );
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <AdminSidebar />
        </Grid>
        <Grid item xs={9}>
          <MUIDataTable
            title={'Lịch sử tiến trình'}
            data={rows}
            columns={columns}
            options={options}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
