import React, { useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
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
  const role = props.role;
  const status = props.status;
  const rows = ids.map((id) => getAccountById(id, role, status));

  const [searchTerm, setSearchTerm] = useState('');

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    setPage(0);
    setRowsPerPage(10);
  }, [ids]);

  return (
    <div>
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
                      <Link
                        to={'customer?id=' + row.id}
                        className={clsx(styles.tableData, styles.alignLeft)}
                      >
                        {row.id}
                      </Link>
                    </td>
                    <td className={clsx(styles.tableData, styles.alignLeft)}>
                      <Link
                        to={'customer?id=' + row.id}
                        className={clsx(styles.tableData, styles.alignLeft)}
                      >
                        {row.email}
                      </Link>
                    </td>
                    <td className={clsx(styles.tableData, styles.alignLeft)}>
                      <Link
                        to={'customer?id=' + row.id}
                        className={clsx(styles.tableData, styles.alignLeft)}
                      >
                        {row.name}
                      </Link>
                    </td>
                    <td className={clsx(styles.tableData, styles.alignCenter)}>
                      <Link
                        to={'customer?id=' + row.id}
                        className={clsx(styles.tableData, styles.alignCenter)}
                      >
                        <Avatar alt={row.id + "'s avatar"} src={row.avatar} />
                      </Link>
                    </td>
                    <td className={clsx(styles.tableData, styles.alignLeft)}>
                      <Link
                        to={'customer?id=' + row.id}
                        className={clsx(styles.tableData, styles.alignLeft)}
                      >
                        {row.activeDate}
                      </Link>
                    </td>
                    <td className={clsx(styles.tableData, styles.alignCenter)}>
                      <Link
                        to={'customer?id=' + row.id}
                        className={clsx(styles.tableData, styles.alignCenter)}
                      >
                        {row.status ? (
                          <BlockIcon className={clsx(styles.locked)} />
                        ) : (
                          <CheckCircleIcon className={clsx(styles.unlocked)} />
                        )}
                      </Link>
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
