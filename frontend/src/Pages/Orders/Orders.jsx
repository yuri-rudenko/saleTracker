import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Typography } from '@mui/material';
import React from 'react';
import EnhancedTableHead from '../../Components/EnhancedTableHead';
import getComparator from '../../functions/getComparator';
import OrdersProductsTable from './OrdersProductsTable';
import CreateOrder from './CreateOrder';

function createData(status, date, amount, price, margin, type, products) {
    return {
        status,
        date,
        amount,
        price,
        margin,
        type,
        products
    };
}

const rows = [
    createData("Sold", "03.01.2025", 3, 1700, 589, "OLX Nova", [{ image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch9', amount: 3, price: 300, totalPrice: 900, margin: 156}, { image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch', amount: 3, price: 300, totalPrice: 900, margin: 156}, { image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch1', amount: 2, price: 3100, totalPrice: 9030, margin: 156}]),
    createData("Sold", "03.01.2025", 3, 1700, 589, "OLX Nova", [{ image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch9', amount: 3, price: 300, totalPrice: 900, margin: 156}, { image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch', amount: 3, price: 300, totalPrice: 900, margin: 156}, { image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch2', amount: 1, price: 300, totalPrice: 900, margin: 156}]),
    createData("Sold", "03.01.2025", 3, 1700, 589, "OLX Nova", [{ image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch9', amount: 3, price: 300, totalPrice: 900, margin: 156}, { image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch', amount: 3, price: 300, totalPrice: 900, margin: 156}, { image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch3', amount: 3, price: 300, totalPrice: 900, margin: 156}]),
    createData("Sold", "03.01.2025", 3, 1700, 589, "OLX Nova", [{ image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch9', amount: 3, price: 300, totalPrice: 900, margin: 156}, { image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch', amount: 3, price: 300, totalPrice: 900, margin: 156}, { image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch4', amount: 3, price: 300, totalPrice: 2900, margin: 156}]),
    createData("Sold", "03.01.2025", 3, 1700, 589, "OLX Nova", [{ image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch9', amount: 3, price: 300, totalPrice: 900, margin: 156}, { image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch', amount: 3, price: 300, totalPrice: 900, margin: 156}, { image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch5', amount: 3, price: 300, totalPrice: 900, margin: 156}]),
    createData("Sold", "03.01.2025", 3, 1700, 589, "OLX Nova", [{ image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch9', amount: 3, price: 300, totalPrice: 900, margin: 156}, { image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch', amount: 3, price: 300, totalPrice: 900, margin: 156}, { image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch6', amount: 3, price: 300, totalPrice: 900, margin: 156}]),
    createData("Sold", "03.01.2025", 3, 1700, 589, "OLX Nova", [{ image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch9', amount: 3, price: 300, totalPrice: 900, margin: 156}, { image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch', amount: 3, price: 300, totalPrice: 900, margin: 156}, { image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch7', amount: 3, price: 300, totalPrice: 900, margin: 156}]),
    createData("Sold", "03.01.2025", 3, 1700, 589, "OLX Nova", [{ image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch9', amount: 3, price: 300, totalPrice: 900, margin: 156}, { image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch', amount: 3, price: 300, totalPrice: 900, margin: 156}, { image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch', amount: 3, price: 300, totalPrice: 900, margin: 156}]),
    createData("Sold", "03.01.2025", 3, 1700, 589, "OLX Nova", [{ image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch9', amount: 3, price: 300, totalPrice: 900, margin: 156}, { image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch', amount: 3, price: 300, totalPrice: 900, margin: 156}, { image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch8', amount: 3, price: 300, totalPrice: 500, margin: 156}]),
    createData("Sold", "03.01.2025", 3, 1700, 589, "OLX Nova", [{ image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch9', amount: 3, price: 300, totalPrice: 900, margin: 156}, { image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch', amount: 3, price: 300, totalPrice: 900, margin: 156}, { image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch9', amount: 3, price: 300, totalPrice: 900, margin: 156}]),
    createData("Sold", "03.01.2025", 3, 1700, 589, "OLX Nova", [{ image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch9', amount: 3, price: 300, totalPrice: 900, margin: 156}, { image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch', amount: 3, price: 300, totalPrice: 900, margin: 156}, { image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch999', amount: 3, price: 300, totalPrice: 900, margin: 156}]),
];


const headCells = [
    {
        id: 'status',
        numeric: false,
        disablePadding: true,
        label: 'Status',
    },
    {
        id: 'date',
        numeric: false,
        disablePadding: false,
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
];

const Buy = () => {

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [open, setOpen] = React.useState(false);

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

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            [...rows]
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [order, orderBy, page, rowsPerPage],
    );

    return (
        <div>
            <div className="buttons">
                <div className="create-new-product">
                    <Button onClick={handleClickOpen} variant="outlined">
                        Create new order
                    </Button>

                    <CreateOrder onClose={handleClose} open={open}/>
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
                                rowCount={rows.length}
                                headCells={headCells}
                                setOrder={setOrder}
                                setOrderBy={setOrderBy}
                            />
                            <TableBody>
                                {visibleRows.map((row, index) => (
                                    <TableRow>
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
                                                                <TableCell align="left">{row.status}</TableCell>
                                                                <TableCell align="left">{row.date}</TableCell>
                                                                <TableCell align="right">{row.amount}</TableCell>
                                                                <TableCell align="right">{row.price}</TableCell>
                                                                <TableCell align="right">{row.margin}</TableCell>
                                                                <TableCell align="right">{row.type}</TableCell>
                                                            </TableRow>

                                                        </TableBody>
                                                    </Table>
                                                </AccordionSummary>
                                                <AccordionDetails sx={{ padding: '0 !important' }}>
                                                    <Typography>
                                                        <OrdersProductsTable rowsData={row.products}/>
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
                        count={rows.length}
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
