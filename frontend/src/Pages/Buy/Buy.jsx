import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Typography } from '@mui/material';
import React from 'react';
import EnhancedTableHead from '../../Components/EnhancedTableHead';
import getComparator from '../../functions/getComparator';
import BuyProductsTable from './BuyProductsTable';
import CreateOrder from './CreateOrder';

function createData(date, amount, types, price, status, products) {
    return {
        date,
        amount,
        types,
        price,
        status,
        products
    };
}

const rows = [
    createData("03.01.2025", 5, 3, 1700, "Arrived", [{ image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunchi', amount: 3, price: 300, totalPrice: 900, amountInOne: 1 }, { image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch', amount: 3, price: 300, totalPrice: 900, amountInOne: 1 }, { image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch', amount: 3, price: 300, totalPrice: 900, amountInOne: 1 }]),
    createData("03.01.2025", 5, 3, 1700, "Arrived", [{ image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch2', amount: 3, price: 300, totalPrice: 900, amountInOne: 1 }, { image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch', amount: 3, price: 300, totalPrice: 900, amountInOne: 1 }, { image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch', amount: 3, price: 300, totalPrice: 900, amountInOne: 1 }]),
    createData("03.01.2025", 5, 3, 1700, "Arrived", [{ image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch3', amount: 3, price: 300, totalPrice: 900, amountInOne: 1 }, { image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch', amount: 3, price: 300, totalPrice: 900, amountInOne: 1 }, { image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch', amount: 3, price: 300, totalPrice: 900, amountInOne: 1 }]),
    createData("03.01.2025", 5, 3, 1700, "Arrived", [{ image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch4', amount: 3, price: 300, totalPrice: 900, amountInOne: 1 }, { image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch', amount: 3, price: 300, totalPrice: 900, amountInOne: 1 }, { image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch', amount: 3, price: 300, totalPrice: 900, amountInOne: 1 }]),
    createData("03.01.2025", 5, 3, 1700, "Arrived", [{ image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch5', amount: 3, price: 300, totalPrice: 900, amountInOne: 1 }, { image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch', amount: 3, price: 300, totalPrice: 900, amountInOne: 1 }, { image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch', amount: 3, price: 300, totalPrice: 900, amountInOne: 1 }]),
    createData("03.01.2025", 5, 3, 1700, "Arrived", [{ image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch6', amount: 3, price: 300, totalPrice: 900, amountInOne: 1 }, { image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch', amount: 3, price: 300, totalPrice: 900, amountInOne: 1 }, { image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch', amount: 3, price: 300, totalPrice: 900, amountInOne: 1 }]),
    createData("03.01.2025", 5, 3, 1700, "Arrived", [{ image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch7', amount: 3, price: 300, totalPrice: 900, amountInOne: 1 }, { image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch', amount: 3, price: 300, totalPrice: 900, amountInOne: 1 }, { image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch', amount: 3, price: 300, totalPrice: 900, amountInOne: 1 }]),
    createData("03.01.2025", 5, 3, 1700, "Arrived", [{ image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch8', amount: 3, price: 300, totalPrice: 900, amountInOne: 1 }, { image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch', amount: 3, price: 300, totalPrice: 900, amountInOne: 1 }, { image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch', amount: 3, price: 300, totalPrice: 900, amountInOne: 1 }]),
    createData("03.01.2025", 5, 3, 1700, "Arrived", [{ image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch9', amount: 3, price: 300, totalPrice: 900, amountInOne: 1 }, { image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch', amount: 3, price: 300, totalPrice: 900, amountInOne: 1 }, { image: 'https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', name: 'Crunch', amount: 3, price: 300, totalPrice: 900, amountInOne: 1 }]),

];

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
        disablePadding: false,
        label: 'Total amount',
    },
    {
        id: 'types',
        numeric: true,
        disablePadding: true,
        label: 'Product types',
    },
    {
        id: 'price',
        numeric: true,
        disablePadding: true,
        label: 'Total price',
    },
    {
        id: 'status',
        numeric: true,
        disablePadding: true,
        label: 'Status',
    },
];

const headCellsProduct = [
    {
        id: 'image',
        numeric: false,
        disablePadding: false,
        label: 'Image',
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Name',
    },
    {
        id: 'amount',
        numeric: true,
        disablePadding: true,
        label: 'Amount bought',
    },
    {
        id: 'price',
        numeric: true,
        disablePadding: true,
        label: 'Price',
    },
    {
        id: 'totalPrice',
        numeric: true,
        disablePadding: true,
        label: 'Total price',
    },
    {
        id: 'amountInOne',
        numeric: true,
        disablePadding: true,
        label: 'Amount in one',
    }
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
                                                                <TableCell align="left">{row.date}</TableCell>
                                                                <TableCell align="left">{row.amount}</TableCell>
                                                                <TableCell align="right">{row.types}</TableCell>
                                                                <TableCell align="right">{row.price}</TableCell>
                                                                <TableCell align="right">{row.status}</TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </AccordionSummary>
                                                <AccordionDetails sx={{ padding: '0 !important' }}>
                                                    <Typography>
                                                        <BuyProductsTable rowsData={row.products}/>
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
