import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material';
import React from 'react';
import getMargin from '../../functions/getMargin';

function createData(saleProduct) {
    return {
        image: saleProduct.product.image,
        name: saleProduct.product.name,
        amount: saleProduct.amount,
        price: saleProduct.price,
        totalPrice: saleProduct.price * saleProduct.amount,
        margin: getMargin([saleProduct])
    };
}

const headCells = [
    {
        id: 'image',
        numeric: false,
        disablePadding: true,
        label: 'Image',
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Name',
    },
    {
        id: 'amount',
        numeric: false,
        disablePadding: true,
        label: 'Amount',
    },
    {
        id: 'price',
        numeric: false,
        disablePadding: true,
        label: 'Price',
    },
    {
        id: 'totalPrice',
        numeric: false,
        disablePadding: true,
        label: 'Total',
    },
    {
        id: 'margin',
        numeric: true,
        disablePadding: true,
        label: 'Margin',
    },
];

const BuyProductsTable = (props) => {

    const { rowsData } = props;

    const rows = rowsData.map(row => createData(row));

    return (
        <div>
            <TableContainer>
                <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size={'medium'}
                >
                    <TableHead
                        sx={{
                            '& .MuiTableCell-root': {
                                padding: '4px 8px',
                                fontSize: '0.85rem',   
                            }
                        }}
                    >
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
                                    >
                                        {headCell.label}
                                    </TableCell>
                                )
                            }
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody
                        sx={{
                            '& .MuiTableCell-root': {
                              fontSize: '0.8rem',
                            }
                          }}
                    >
                        {rows.map((row, index) => {

                            return (
                                <TableRow
                                    hover
                                    tabIndex={-1}
                                    key={row.id}
                                    sx={{ cursor: 'pointer', '& td, & th': { borderBottom: '1px solid #f5f5f5' } }}
                                >
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        padding="none"
                                    >
                                        <img style={{ height: "48px", width: "48px" }} src={row.image} alt="item" />
                                    </TableCell>
                                    <TableCell align="left">{row.name}</TableCell>
                                    <TableCell align="left">{row.amount}</TableCell>
                                    <TableCell align="left">{row.price}</TableCell>
                                    <TableCell align="left">{row.totalPrice}</TableCell>
                                    <TableCell align="right">{row.margin}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default BuyProductsTable;
