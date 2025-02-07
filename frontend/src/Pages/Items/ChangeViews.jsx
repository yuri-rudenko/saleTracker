import { useForm, Controller } from "react-hook-form";
import { Dialog, DialogTitle, TextField, Autocomplete, Button, TableContainer, Table, TableBody, TableCell, TableRow, TableHead } from "@mui/material";

const options = ["Brand A", "Brand B", "Brand C"];

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

function EnhancedTableHead(props) {

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
            id: 'views',
            numeric: true,
            disablePadding: true,
            label: 'Total views',
        }
    ];

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
                            {headCell.label}
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
    );
}

const ChangeViews = (props) => {
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const { onClose, open } = props;

    const handleClose = () => {
        onClose();
    };

    const onSubmit = (data) => {
        const newData = Object.entries(data).map(([key, value]) => {
            const row = rows.find(el => el.name === key);
            
            if (!row) return null;
    
            return row.views != value ? { [key]: value } : null;
        }).filter(Boolean);
    
        console.log(newData);
    };

    return (
        <Dialog maxWidth={"sm"} onClose={handleClose} open={open}>
            <DialogTitle>Change Views</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)} style={{ padding: 20 }}>

                <TableContainer>
                    <Table
                        sx={{ minWidth: '400px' }}
                        aria-labelledby="tableTitle"
                        size={'small'}
                    >
                        <EnhancedTableHead
                            order={"asc"}
                            orderBy={"name"}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {rows.map((row, index) => {

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
                                            <img style={{ height: "50px", width: "50px" }} src={row.image} alt="item" />
                                        </TableCell>
                                        <TableCell align="left">{row.name}</TableCell>
                                        <TableCell align="right">
                                            <TextField
                                                {...register(`${row.name}`, { min: { value: row.views, message: "Value is low" } })}
                                                error={!!errors[`${row.name}`]}
                                                helperText={errors[`${row.name}`]?.message}
                                                id="outlined-number"
                                                label="Number"
                                                type="number"
                                                defaultValue={row.views}
                                                size="small"
                                                style={{ maxWidth: "100px" }}
                                                slotProps={{
                                                    inputLabel: {
                                                        shrink: true,
                                                    },
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Button style={{ marginTop: "16px" }} type="submit" variant="contained" color="primary" fullWidth>
                    Submit
                </Button>
            </form>
        </Dialog>
    );
};

export default ChangeViews;
