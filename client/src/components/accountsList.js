import React, { useState, useEffect, memo } from 'react';
import clsx from 'clsx';
import styles from './CSS/AccountsListCSS.module.scss';
import SampleAvatar from '../assets/Product/productSampleImage1.jpeg';

import Select from '@mui/material/Select';
import Avatar from '@mui/material/Avatar';

import TablePagination from '@mui/material/TablePagination';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlockIcon from '@mui/icons-material/Block';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import MenuItem from '@mui/material/MenuItem';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

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

function getAccountById(id, role, status) {
  const email = 'thoai.tv1234@gmail.com';
  const name = 'Trịnh Văn Thoại';
  const avatar = SampleAvatar;
  const d = new Date();
  const activeDate = d.toUTCString().substring(0, 16);
  return { id, email, name, avatar, activeDate, status };
}

function AccountsList(props) {
  const ids = props.idsList;
  // console.log(ids);
  const [id, setId] = useState('');
  const role = props.role;
  const status = props.status;
  const rows = ids.map((id) => getAccountById(id, role, status));
  const [errMsg, setErrMsg] = useState({ status: 'info', message: '' });
  const [open, setOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setErrMsg({ status: '', message: '' });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = (id) => {
    setOpenModal(true);
    setId(id);
  };
  const handleCloseModal = () => {
    setOpen(false);
    setOpenModal(false);
  };

  const handleChangeStatus = () => {
    ids.filter((i) => i !== id);
    //request to change the status
    setErrMsg({
      status: 'success',
      message: status
        ? 'Mở khóa tài khoản thành công'
        : 'Khóa tài khoản thành công',
    });
    handleCloseModal();
  };
  useEffect(() => {
    setPage(0);
    setRowsPerPage(10);
  }, [ids]);
  useEffect(() => {
    if (errMsg.message === '') {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [errMsg]);

  return (
    <div>
      <div
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
        onClose={handleCloseModal}
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
              {status ? 'Mở khóa tài khoản này?' : 'Khóa tài khoản này?'}
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
      </Modal>
      <div>
        <div className={clsx(styles.tableOption)}>
          <div className={clsx(styles.searchBar)}>
            <SearchIcon className={clsx(styles.searchIcon)} />
            <input
              className={clsx(styles.searchInput)}
              type="text"
              placeholder="Tìm kiếm tài khoản..."
              spellCheck={false}
              value={searchTerm}
              onChange={(e) => {
                console.log(e.target.value);
                return setSearchTerm(e.target.value);
              }}
            />
            {searchTerm && (
              <button
                className={clsx(styles.clearButton)}
                onClick={() => setSearchTerm('')}
              >
                <CloseIcon className={clsx(styles.clearIcon)} />
              </button>
            )}
          </div>
          <Select
            value={status}
            onChange={(e) => props.onStatusChange(e.target.value)}
          >
            <MenuItem value={false}>
              <LockOpenIcon />
            </MenuItem>
            <MenuItem value={true}>
              <LockIcon />
            </MenuItem>
          </Select>
        </div>
        <table className={clsx(styles.tableContainer)}>
          <thead>
            <tr className={clsx(styles.tableHeader)}>
              <th className={clsx(styles.columnHeader, styles.alignLeft)}>
                ID
              </th>
              <th className={clsx(styles.columnHeader, styles.alignLeft)}>
                Email
              </th>
              <th className={clsx(styles.columnHeader, styles.alignLeft)}>
                Họ và tên
              </th>
              <th className={clsx(styles.columnHeader, styles.alignCenter)}>
                Ảnh đại diện
              </th>
              <th className={clsx(styles.columnHeader, styles.alignLeft)}>
                Ngày đăng kí
              </th>
              <th className={clsx(styles.columnHeader, styles.alignCenter)}>
                Trạng thái
              </th>
            </tr>
          </thead>
          <tbody className={clsx(styles.tableBody)}>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <tr key={row.id} className={clsx(styles.tableRow)}>
                    <td className={clsx(styles.tableData, styles.alignLeft)}>
                      <div
                        onClick={() => {
                          handleOpenModal(row.id);
                        }}
                        className={clsx(styles.tableData, styles.alignLeft)}
                      >
                        {row.id}
                      </div>
                    </td>
                    <td className={clsx(styles.tableData, styles.alignLeft)}>
                      <div
                        onClick={() => {
                          handleOpenModal(row.id);
                        }}
                        className={clsx(styles.tableData, styles.alignLeft)}
                      >
                        {row.email}
                      </div>
                    </td>
                    <td className={clsx(styles.tableData, styles.alignLeft)}>
                      <div
                        onClick={() => {
                          handleOpenModal(row.id);
                        }}
                        className={clsx(styles.tableData, styles.alignLeft)}
                      >
                        {row.name}
                      </div>
                    </td>
                    <td className={clsx(styles.tableData, styles.alignCenter)}>
                      <div
                        onClick={() => {
                          handleOpenModal(row.id);
                        }}
                        className={clsx(styles.tableData, styles.alignCenter)}
                      >
                        <Avatar alt={row.id + "'s avatar"} src={row.avatar} />
                      </div>
                    </td>
                    <td className={clsx(styles.tableData, styles.alignLeft)}>
                      <div
                        onClick={() => {
                          handleOpenModal(row.id);
                        }}
                        className={clsx(styles.tableData, styles.alignLeft)}
                      >
                        {row.activeDate}
                      </div>
                    </td>
                    <td className={clsx(styles.tableData, styles.alignCenter)}>
                      <div
                        onClick={() => {
                          handleOpenModal(row.id);
                        }}
                        className={clsx(styles.tableData, styles.alignCenter)}
                      >
                        {row.status ? (
                          <BlockIcon className={clsx(styles.locked)} />
                        ) : (
                          <CheckCircleIcon className={clsx(styles.unlocked)} />
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <TablePagination
        className={clsx(styles.tablePagination)}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      ></TablePagination>
    </div>
  );
}

export default memo(AccountsList);
