import React from 'react';

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
        id: 'amount',
        numeric: false,
        disablePadding: false,
        label: 'Total amount',
    },
    {
        id: 'types',
        numeric: false,
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
    return (
        <div>
            buy
        </div>
    );
}

export default Buy;
