import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { Button, Dialog, DialogTitle } from '@mui/material';
import AddNewProduct from './AddNewProduct';
import ChangeViews from './ChangeViews';
import EnhancedTableHead from '../../Components/EnhancedTableHead';
import getComparator from '../../functions/getComparator';


function createData(image, name, category, brand, left, buyprice, sellprice, sells, date, views, increase) {
    return {
        image,
        name,
        category,
        brand,
        left,
        buyprice,
        sellprice,
        sells,
        date,
        views,
        increase
    };
}

const rows = [
    createData('https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', 'Crunch1', 'Pedal', 'Saphue', 2, 309, 620, 6, "03.01.2025", 20, 3),
    createData('https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', 'Crunch32', 'Cable', 'Chihna', 2, 309, 620, 6, "03.01.2025", 20, 3),
    createData('https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', 'Crunch3', 'Pedal', 'Saphue', 2, 309, 620, 6, "03.01.2025", 20, 3),
    createData('https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', 'Crunch4', 'Pedal', 'Saphue', 2, 309, 620, 6, "03.01.2025", 20, 3),
    createData('https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', 'Crunch5', 'Pedal', 'Saphue', 2, 309, 620, 6, "03.01.2025", 20, 3),
    createData('https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', 'Crunc6h', 'Pedal', 'Saphue', 2, 309, 620, 6, "03.01.2025", 20, 3),
    createData('https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', 'Crunc234h', 'Pedal', 'Saphue', 2, 309, 620, 6, "03.01.2025", 20, 3),
    createData('https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', 'Cru3nch', 'Pedal', 'Saphue', 2, 309, 620, 6, "03.01.2025", 20, 3),
    createData('https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', 'C432runch', 'Pedal', 'Saphue', 2, 309, 620, 6, "03.01.2025", 20, 3),
    createData('https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', 'Cr1unch', 'Pedal', 'Saphue', 2, 309, 620, 6, "03.01.2025", 20, 3),
    createData('https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', 'Cru32nch', 'Pedal', 'Saphue', 2, 309, 620, 6, "03.01.2025", 20, 3),
    createData('https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', 'Cru4nch', 'Pedal', 'Saphue', 2, 309, 620, 6, "03.01.2025", 20, 3),
    createData('https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', 'Cr5unch', 'Pedal', 'Saphue', 2, 309, 620, 6, "03.01.2025", 20, 3),
    createData('https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', 'C6runch', 'Pedal', 'Saphue', 2, 309, 620, 6, "03.01.2025", 20, 3),
    createData('https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', 'Cr1unch', 'Pedal', 'Saphue', 2, 309, 620, 6, "03.01.2025", 20, 3),
    createData('https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', 'Crunch', 'Pedal', 'Saphue', 2, 309, 620, 6, "03.01.2025", 20, 3),
];

const headCells = [
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
        id: 'category',
        numeric: false,
        disablePadding: true,
        label: 'Category',
    },
    {
        id: 'brand',
        numeric: false,
        disablePadding: true,
        label: 'Brand',
    },
    {
        id: 'left',
        numeric: true,
        disablePadding: true,
        label: 'Amount left',
    },
    {
        id: 'buyprice',
        numeric: true,
        disablePadding: true,
        label: 'Avarage buy price',
    },
    {
        id: 'sellprice',
        numeric: true,
        disablePadding: true,
        label: 'Avarage sell price',
    },
    {
        id: 'totalsells',
        numeric: true,
        disablePadding: true,
        label: 'Total sells',
    },
    {
        id: 'date',
        numeric: true,
        disablePadding: true,
        label: 'Last sale',
    },
    {
        id: 'views',
        numeric: true,
        disablePadding: true,
        label: 'Total views',
    },
    {
        id: 'viewsincrease',
        numeric: true,
        disablePadding: true,
        label: 'Views increase',
    }
];

const Items = () => {

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [openAddNew, setOpenAddNew] = React.useState(false);
    const [openViews, setOpenViews] = React.useState(false);

    const handleClickOpen = () => {
        setOpenAddNew(true);
    };

    const handleClickOpenViews = () => {
        setOpenViews(true);
    };

    const handleClose = (value) => {
        setOpenAddNew(false);
        setOpenViews(false);
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
                    <Button variant="outlined" onClick={handleClickOpen}>
                        Add new item
                    </Button>
                    <Button variant="outlined" onClick={handleClickOpenViews}>
                        Change views
                    </Button>
                    <AddNewProduct
                        open={openAddNew}
                        onClose={handleClose}
                    />
                    <ChangeViews
                        open={openViews}
                        onClose={handleClose}
                    />
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
                                {visibleRows.map((row, index) => {

                                    return (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={row.id}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                padding="none"
                                            >
                                                <img style={{ height: "64px", width: "64px" }} src={row.image} alt="item" />
                                            </TableCell>
                                            <TableCell align="left">{row.name}</TableCell>
                                            <TableCell align="left">{row.category}</TableCell>
                                            <TableCell align="left">{row.brand}</TableCell>
                                            <TableCell align="right">{row.left}</TableCell>
                                            <TableCell align="right">{row.buyprice}</TableCell>
                                            <TableCell align="right">{row.sellprice}</TableCell>
                                            <TableCell align="right">{row.sells}</TableCell>
                                            <TableCell align="right">{row.date}</TableCell>
                                            <TableCell align="right">{row.views}</TableCell>
                                            <TableCell align="right">{row.increase}</TableCell>
                                        </TableRow>
                                    );
                                })}
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

export default Items;
