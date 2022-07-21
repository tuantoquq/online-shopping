import React, { useState, useEffect, Component } from 'react';

import { format, add } from 'date-fns';

import clsx from 'clsx';
import styles from './CSS/adminDashboardCSS.module.scss';
import AdminSidebar from '../components/adminSidebar';
import AdminHeader from '../components/adminHeader';
import axios from '../config/axios';
import TokenService from '../service/TokenService';
import RoleService from '../service/RoleService';
import { Navigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function AdminProductPopular(props) {
    const [rows, setRow] = useState([
        {
            'fiels': 'Dịch vụ',
            'product': 'thẻ',
            'quantity': 600
        }
    ])



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
                    <AdminHeader select={6}/>
                    <div className={clsx(styles.pageContainer)}>
                        <AdminSidebar select="statstic_visits" />
                        <div className={clsx(styles.pageBody)}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>STT</TableCell>
                                            <TableCell align="center">Lĩnh vực bán chạy</TableCell>
                                            <TableCell align="center">Sản phẩm bán chạy</TableCell>
                                            <TableCell align="center">Số lượng sản phẩm đã bán</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row, index) => (
                                            <TableRow
                                                key={index}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {index}
                                                </TableCell>
                                                <TableCell align="center">{row.fiels}</TableCell>
                                                <TableCell align="center">{row.product}</TableCell>
                                                <TableCell align="center">{row.quantity}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </div>
                    </div>
                </div>
            );
        }
    }
}
export default AdminProductPopular;
