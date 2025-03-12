import { Accordion, AccordionDetails, AccordionSummary, Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Snackbar, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Typography } from '@mui/material';
import React, { useState } from 'react';
import EnhancedTableHead from '../../Components/EnhancedTableHead';
import getComparator from '../../functions/getComparator';
import OrdersProductsTable from './OrdersProductsTable';
import CreateOrder from './CreateOrder';
import { useDispatch, useSelector } from 'react-redux';
import getMargin from '../../functions/getMargin';
import getStandartDate from '../../functions/dates/getStandartDate';
import { approveSaleAsync, deleteSaleAsync, editSaleAsync } from '../../Store/sales/sales.slice';

function createData(_id, status, date, amount, price, margin, type, products) {
    return {
        _id,
        status,
        date: getStandartDate(date),
        amount,
        price,
        margin,
        type,
        products
    };
}


const headCells = [
    {
        id: 'date',
        numeric: false,
        disablePadding: true,
        label: 'Date',
    },
    {
        id: 'amount',
        numeric: true,
        disablePadding: true,
        label: 'Amount',
    },
    {
        id: 'price',
        numeric: true,
        disablePadding: true,
        label: 'Price',
    },
    {
        id: 'margin',
        numeric: true,
        disablePadding: true,
        label: 'Margin',
    },
    {
        id: 'type',
        numeric: true,
        disablePadding: true,
        label: 'Type',
    },
    {
        id: 'status',
        numeric: true,
        disablePadding: true,
        label: 'Status',
    }
];

const Buy = () => {

    const dispatch = useDispatch();

    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('date');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [editingStatus, setEditingStatus] = useState({});
    const [selectValues, setSelectValues] = useState({});

    const handleChange = async (rowId, event) => {
        try {
            switch (event.target.value) {
                case "Sent":
                    await dispatch(editSaleAsync({ _id: rowId, fieldsToUpdate: { status: "Sent" } })).unwrap();
                    break;
                case "Declined":
                    await dispatch(editSaleAsync({ _id: rowId, fieldsToUpdate: { status: "Declined" } })).unwrap();
                    break;
                case "Delete":
                    await dispatch(deleteSaleAsync(rowId)).unwrap();
                    break;
                case "Approved":
                    await dispatch(approveSaleAsync(rowId)).unwrap();
                    break;
            }
        } catch(error) {
            setSnackbar({ open: true, message: error.message });
        }

        setSelectValues(prev => ({
            ...prev,
            [rowId]: event.target.value
        }));
    };

    const toggleEditingStatus = (rowId) => {
        setEditingStatus(prev => ({
            ...prev,
            [rowId]: !prev[rowId]
        }));
    };

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const approveSale = (id, status) => {
        if (status === "Approved") return;
        dispatch(approveSaleAsync(id));
    }

    const sales = useSelector((state) =>
        state.sales.list.map(sale => createData(sale._id, sale.status, sale.date, sale.products.reduce((acc, product) => acc + product.amount, 0), Number(sale.price).toFixed(1), Number(getMargin(sale.products)).toFixed(1), sale.type, sale.products))
    );

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sales.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            [...sales]
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [order, orderBy, page, rowsPerPage, sales],
    );

    const [snackbar, setSnackbar] = useState({ open: false, message: "" });

    const handleSnackBarClose = () => {
        setSnackbar({ open: false, message: "" });
    };

    return (
        <div>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleSnackBarClose}
                message={snackbar.message}
            />
            <div className="buttons">
                <div className="create-new-product">
                    <Button onClick={handleClickOpen} variant="outlined">
                        Create new order
                    </Button>

                    <CreateOrder onClose={handleClose} open={open} />
                </div>
            </div>
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={'medium'}
                        >
                            <EnhancedTableHead
                                order={order}
                                orderBy={orderBy}
                                rowCount={sales.length}
                                headCells={headCells}
                                setOrder={setOrder}
                                setOrderBy={setOrderBy}
                            />
                            <TableBody>
                                {visibleRows.map((row, index) => (
                                    <TableRow key={row._id}>
                                        <TableCell colSpan={6} style={{ padding: 0 }}>
                                            <Accordion
                                                sx={{ boxShadow: 'none', '&:before': { display: 'none' } }}
                                            >
                                                <AccordionSummary
                                                    disableGutters
                                                    sx={{
                                                        '.MuiAccordionSummary-content': {
                                                            margin: '0 !important',
                                                            minHeight: 'unset',
                                                            alignItems: 'center',
                                                        },
                                                        minHeight: 'unset',
                                                        padding: 0
                                                    }}
                                                >
                                                    <Table>
                                                        <TableBody>
                                                            <TableRow
                                                                hover
                                                                tabIndex={-1}
                                                                key={row.id}
                                                                sx={{
                                                                    cursor: 'pointer',
                                                                    '& td, & th': { borderBottom: 'none' }
                                                                }}
                                                            >
                                                                <TableCell sx={{ width: '16%' }} align="left">{row.date}</TableCell>
                                                                <TableCell sx={{ width: '17%' }} align="right">{row.amount}</TableCell>
                                                                <TableCell sx={{ width: '16%' }} align="right">{row.price}</TableCell>
                                                                <TableCell sx={{ width: '17%' }} align="right">{row.margin}</TableCell>
                                                                <TableCell sx={{ width: '16%' }} align="right">{row.type}</TableCell>
                                                                {editingStatus[row._id] ?
                                                                    <TableCell sx={{ width: '17%' }} align="right" onClick={event => event.stopPropagation()}>
                                                                        <FormControl size="small" sx={{ width: "70%" }}>
                                                                            <InputLabel id={`select-label-${row._id}`}>{row.status}</InputLabel>
                                                                            <Select
                                                                                labelId={`select-label-${row._id}`}
                                                                                value={selectValues[row._id] || ""}
                                                                                onChange={(event) => handleChange(row._id, event)}
                                                                                onClose={() => toggleEditingStatus(row._id)}
                                                                            >
                                                                                <MenuItem value="Awaiting">Awaiting</MenuItem>
                                                                                <MenuItem value="Sent">Sent</MenuItem>
                                                                                <MenuItem value="Approved">Approved</MenuItem>
                                                                                <MenuItem value="Declined">Declined</MenuItem>
                                                                                <MenuItem value="Delete">Delete</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </TableCell>
                                                                    :
                                                                    <TableCell
                                                                        sx={{ width: '17%' }}
                                                                        align="right"
                                                                        onClick={event => event.stopPropagation()}
                                                                        onDoubleClick={() => toggleEditingStatus(row._id)}
                                                                    >
                                                                        {row.status}
                                                                    </TableCell>
                                                                }
                                                            </TableRow>

                                                        </TableBody>
                                                    </Table>
                                                </AccordionSummary>
                                                <AccordionDetails sx={{ padding: '0 !important' }}>
                                                    <Typography>
                                                        <OrdersProductsTable rowsData={row.products} />
                                                    </Typography>
                                                </AccordionDetails>
                                            </Accordion>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: 53 * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={sales.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
        </div>
    );
}

export default Buy;
