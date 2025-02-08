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
import { visuallyHidden } from '@mui/utils';
import { Button, Dialog, DialogTitle } from '@mui/material';
import AddNewProduct from './AddNewProduct';
import ChangeViews from './ChangeViews';


function createData(image, name, left, buyprice, sellprice, sells, date, views, increase) {
    return {
        image,
        name,
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
    createData('https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', 'Crunch1', 2, 309, 620, 6, "03.01.2025", 20, 3),
    createData('https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', 'Crunch32', 2, 309, 620, 6, "03.01.2025", 20, 3),
    createData('https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', 'Crunch3', 2, 309, 620, 6, "03.01.2025", 20, 3),
    createData('https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', 'Crunch4', 2, 309, 620, 6, "03.01.2025", 20, 3),
    createData('https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', 'Crunch5', 2, 309, 620, 6, "03.01.2025", 20, 3),
    createData('https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', 'Crunc6h', 2, 309, 620, 6, "03.01.2025", 20, 3),
    createData('https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', 'Crunc234h', 2, 309, 620, 6, "03.01.2025", 20, 3),
    createData('https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', 'Cru3nch', 2, 309, 620, 6, "03.01.2025", 20, 3),
    createData('https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', 'C432runch', 2, 309, 620, 6, "03.01.2025", 20, 3),
    createData('https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', 'Cr1unch', 2, 309, 620, 6, "03.01.2025", 20, 3),
    createData('https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', 'Cru32nch', 2, 309, 620, 6, "03.01.2025", 20, 3),
    createData('https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', 'Cru4nch', 2, 309, 620, 6, "03.01.2025", 20, 3),
    createData('https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', 'Cr5unch', 2, 309, 620, 6, "03.01.2025", 20, 3),
    createData('https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', 'C6runch', 2, 309, 620, 6, "03.01.2025", 20, 3),
    createData('https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', 'Cr1unch', 2, 309, 620, 6, "03.01.2025", 20, 3),
    createData('https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', 'Crunch', 2, 309, 620, 6, "03.01.2025", 20, 3),
];

function getDate(dateString) {
    const [day, month, year] = dateString.split('.');
    return new Date(year, month - 1, day);
}

function descendingComparator(a, b, orderBy) {
    if (orderBy === 'date') {
        if (getDate(b[orderBy]) < getDate(a[orderBy])) {
            return -1;
        }
        if (getDate(b[orderBy]) > getDate(a[orderBy])) {
            return 1;
        }
    } else {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

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

function EnhancedTableHead(props) {

    const { order, orderBy, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => {
                    if (headCell.id === "image") return (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? 'right' : 'left'}
                            padding={headCell.disablePadding ? 'none' : 'normal'}
                        >
                            <TableSortLabel>
                                {headCell.label}
                            </TableSortLabel>
                        </TableCell>
                    )
                    return (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? 'right' : 'left'}
                            padding={!headCell.disablePadding ? 'none' : 'normal'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    )
                }
                )}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

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

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
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
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
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
