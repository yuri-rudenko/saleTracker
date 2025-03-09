import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import OrderStatusButton from './Small/OrderStatusButton/OrderStatusButton';
import { useSelector } from 'react-redux';
import formatDate from '../functions/dates/formatDate';
import getMargin from '../functions/getMargin';

function createData(_id, name, qty, date, amount, revenue, status) {
  return { _id, name, qty, date, amount, revenue, status };
}


const RecentOrders = () => {

  const orders = useSelector((state) => state.sales.list);
  const sortedOrders = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date));

  const awaitingOrders = sortedOrders.filter(order => order.status === "Awaiting");
  const finalRows = awaitingOrders.slice(0, 5);

  if (finalRows.length < 5) {
    const extraOrders = sortedOrders
      .filter(order => order.status !== "Awaiting")
      .slice(0, 5 - finalRows.length);

    finalRows.push(...extraOrders);
  }

  
  const rows = finalRows.map(row =>
    createData(row._id, [...row.products].sort((a, b) => b.price * b.amount - a.price * a.amount)[0].product.name, row.amount, formatDate(new Date(row.date)), row.price, getMargin(row.products), row.status)
  )
  return (
    <div>
      <TableContainer style={{ margin: "16px 0px" }} component={Paper}>
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
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell style={{ fontWeight: 600 }} align="left">{row.name}</TableCell>
                <TableCell style={{ fontWeight: 600 }} align="left">{row.qty}</TableCell>
                <TableCell style={{ color: "#A7AEB1" }} align="left">{row.date}</TableCell>
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
