function getDate(dateString) {
    const [day, month, year] = dateString.split('/');
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
        if (Number(b[orderBy]) < Number(a[orderBy])) {
            return -1;
        }
        if (Number(b[orderBy]) > Number(a[orderBy])) {
            return 1;
        }
    }
    return 0;
}

export default function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}