import axiosConfig from "../config/axios";

import { useEffect, useState } from "react";

import Box from '@mui/material/Box';
import MUIDataTable from "mui-datatables";
import AdminSidebar from "../components/adminSidebar";
import Grid from '@mui/material/Grid';
import { Tooltip, IconButton } from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';


export default function AdminShopRequest() {
    const [data, setData] = useState([])

    const columns = [
        {
            name: "firstName",
            options: {
                filter: true
            },
            label: 'Họ và tên'
        },
        {
            name: "email",
            options: {
                filter: true
            },
            label: 'Email',
        },

        {
            name: "phoneNumber",
            options: {
                filter: true
            },
            label: 'Số điện thoại'
        },
        {
            name: "issuePlace",
            options: {
                filter: true
            },
            label: 'Địa chỉ',
        },

        {
            name: "updatedAt",
            options: {
                filter: true
            },
            label: 'Ngày tạo'
        }

    ];

    const block = (email) =>{
        console.log(email)

    }
    const options = {
        filter: false,
        print: false,
        selectableRows: "single",
        responsive: "standard",
        selectableRows: true,
        textLabels: {},
        customToolbarSelect: selectedRows => (
            <>
                <Tooltip title="Kích hoạt tiến trình">
                    <IconButton
                        onClick={() => {
                            block(data[selectedRows.data[0].dataIndex]['email']);
                        }}

                    >
                        <BlockIcon />
                    </IconButton>

                </Tooltip>
            </>

        )
    };
    
    useEffect(() => {
        axiosConfig({
            method: 'get',
            url: '/shopper/get-shopper-with-state?state=0'
          })
            .then(res => {
              let shopperRequest = res.data.data            
                for( let i = 0;i< shopperRequest.length;i++){
                    shopperRequest[i]['updatedAt'] =  new Date(shopperRequest[i]['updatedAt']).toLocaleString()
                }
              setData([ ...shopperRequest])
  
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <AdminSidebar select={3}/>
                </Grid>
                <Grid item xs={9}>
                    <MUIDataTable
                        title={"Đăng ký bán hàng"}
                        data={data}
                        columns={columns}
                        options={options}

                    />
                </Grid>

            </Grid>

        </Box>
    )


}