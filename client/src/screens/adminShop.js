import React, { useState, useEffect, useCallback } from 'react';
import DefaultAvatar from '../assets/avatar/defaultAvatar.png';
import clsx from 'clsx';
import styles from './CSS/customersListCSS.module.scss';
import AdminSidebar from '../components/adminSidebar';
import AdminHeader from '../components/adminHeader';
import AccountsList from '../components/accountsList';
import { format } from 'date-fns';
import MUIDataTable from 'mui-datatables';
import axiosConfig from '../config/axios';
import { Tooltip, IconButton } from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';
import Avatar from '@mui/material/Avatar';
import TokenService from '../service/TokenService';
import RoleService from '../service/RoleService';
import { Navigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { changeShopperState } from '../service/AdminService';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  borderRadius: '4px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function AdminShop(props) {
  const [data, setData] = useState([]);
  // const [customerList, setCustomerList] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [itemIndex, setItemIndex] = useState();
  const [errMsg, setErrMsg] = useState({ status: 'info', message: '' });
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  console.log(openModal);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setErrMsg({ status: '', message: '' });
  };

  const handleChangeStatus = () => {
    changeShopperState(selectedItem.id, 1)
      .then((res) => {
        // console.log(res);
        let tmp = data;
        tmp.splice(itemIndex, 1);

        setData(tmp);

        setErrMsg({
          status: 'success',
          message: 'Phê duyệt yêu cầu đăng kí thành công',
        });
        setOpenModal(false);
      })
      .catch((err) => {
        setErrMsg({
          status: 'error',
          message: err.message,
        });
        console.log(err);
      });
  };

  useEffect(() => {
    if (errMsg.message === '') {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [errMsg]);

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
            console.log(res.data.data);
            setData(
              res.data.data.listShop.map((item) => {
                let status = item.status === 1 ? 'Active' : 'Blocked';
                let createdAt = item.createAt
                  ? format(new Date(item.createAt), 'dd/MM/yyyy')
                  : '';
                return {
                  shopName: item.shopName,
                  address: item.address,
                  status: status,
                  createdAt: createdAt,
                };
              })
            );
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);

  //data table
  const columns = [
    {
      name: 'id',
      options: {
        display: false,
        filter: false,
        search: false,
      },
    },

    {
      name: 'updatedAt',
      options: {
        display: false,
        filter: false,
      },
    },
    {
      name: 'shopName',
      label: 'Tên',
    },
    {
      name: 'address',
      label: 'Địa chỉ',
      options: {
        search: false,
      },
    },
    {
      name: 'createdAt',
      label: 'Ngày đăng kí',
      options: {
        search: false,
      },
    },
    {
      name: 'status',
      label: 'Trạng thái',
      options: {
        search: false,
        customBodyRender: (value, tableMeta) => {
          return value === 'Active' ? (
            <LockOpenIcon className={clsx(styles.unlocked)} />
          ) : (
            <LockIcon className={clsx(styles.locked)} />
          );
        },
      },
    },
  ];

  const options = {
    print: false,
    selectableRows: 'none',
    responsive: 'standard',
    // selectableRows: true,
    viewColumns: false,
    tableBodyHeight: '100%',
    filter: true,
    filterType: 'dropdown',
    // onRowClick: (rowData, rowState) => {
    //   setSelectedItem(data[rowState.dataIndex]);
    //   setItemIndex(rowState.dataIndex);
    //   setOpenModal(true);
    //   // console.log(rowData, rowState);
    // },
    // onRowClick: (selectedRows) => {
    //   console.log(data[selectedRows.data[0].dataIndex]);
    //   setSelectedItem(data[selectedRows.data[0].dataIndex]);
    //
    //   // return (
    //   //   <>
    //   //     <Tooltip
    //   //       title={
    //   //         selectedRows.status === 'Active'
    //   //           ? 'Khóa tài khoản'
    //   //           : 'Mở khóa tài khoản'
    //   //       }
    //   //     >
    //   //       <IconButton
    //   //         onClick={() => {
    //   //           block(
    //   //             data[selectedRows.data[0].dataIndex]['email'],
    //   //             data[selectedRows.data[0].dataIndex]['role']
    //   //           );
    //   //         }}
    //   //       >
    //   //         <BlockIcon />
    //   //         <span styles="font-size: 12px">
    //   //           {selectedRows.status === 'Active'
    //   //             ? 'Khóa tài khoản'
    //   //             : 'Mở khóa tài khoản'}
    //   //         </span>
    //   //       </IconButton>
    //   //     </Tooltip>
    //   //   </>
    //   // );
    // },
  };

  // const [customerList, setCustomerList] = useState([]);

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
          {/* <div
            className={
              errMsg
                ? clsx(styles.snackbar, styles.show)
                : clsx(styles.snackbar, styles.offscreen)
            }
            aria-live="assertive"
          >
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity={errMsg.status}
                sx={{ width: '100%' }}
              >
                {errMsg.message}
              </Alert>
            </Snackbar>
          </div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={openModal}>
              <Box sx={style}>
                <Typography
                  className={clsx(styles.modalTitle)}
                  id="transition-modal-title"
                  variant="h4"
                  component="h2"
                >
                  {'Phê duyệt yêu cầu đăng kí này?'}
                </Typography>
                <TextField
                  className={clsx(styles.modalTextField)}
                  id="outlined-multiline-static"
                  label="Lý do"
                  multiline
                  rows={8}
                />
                <div className={clsx(styles.modalButton)}>
                  <Button
                    className={clsx(styles.modalBtn)}
                    color="success"
                    onClick={handleChangeStatus}
                    variant="contained"
                  >
                    ĐỒNG Ý
                  </Button>
                  <Button
                    className={clsx(styles.modalBtn)}
                    onClick={() => {
                      setOpenModal(false);
                    }}
                    color="error"
                    variant="contained"
                  >
                    HỦY
                  </Button>
                </div>
              </Box>
            </Fade>
          </Modal> */}
          <div className={clsx(styles.pageContainer)}>
            <AdminSidebar select="shop" />
            <div className={clsx(styles.pageBody)}>
              <MUIDataTable
                title={'Thông tin yêu cầu đăng kí'}
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
export default AdminShop;
