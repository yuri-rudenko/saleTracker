import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import OrderStatusButton from './Small/OrderStatusButton/OrderStatusButton';

function createData(name, qty, date, amount, revenue, status) {
    return { name, qty, date, amount, revenue, status };
}
  
const rows = [
    createData('Crunch Distortion', 2, "January 20, 2022", '599₴', '251₴', <OrderStatusButton/>),
    createData('Crunch Distortion', 2, "January 20, 2022", '599₴', '251₴', <OrderStatusButton/>),
    createData('Crunch Distortion', 2, "January 20, 2022", '599₴', '251₴', <OrderStatusButton/>),
    createData('Crunch Distortion', 2, "January 20, 2022", '599₴', '251₴', <OrderStatusButton/>),
    createData('Crunch Distortion', 2, "January 20, 2022", '599₴', '251₴', <OrderStatusButton/>),
];
  

const RecentOrders = () => {
    return (
        <div>
            <TableContainer style={{margin: "16px 0px"}} component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Main Item</TableCell>
                    <TableCell align="left">Item Qty</TableCell>
                    <TableCell align="left">Order Date</TableCell>
                    <TableCell align="left">Amount</TableCell>
                    <TableCell align="left">Revenue</TableCell>
                    <TableCell align="left">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell style={{fontWeight: 600}} align="left">{row.name}</TableCell>
                      <TableCell style={{fontWeight: 600}} align="left">{row.qty}</TableCell>
                      <TableCell style={{color: "#A7AEB1"}}  align="left">{row.date}</TableCell>
                      <TableCell align="left">{row.amount}</TableCell>
                      <TableCell align="left">{row.revenue}</TableCell>
                      <TableCell align="left">{row.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
        </div>
    );
}

export default RecentOrders;
