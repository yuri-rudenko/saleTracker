import { useForm, Controller } from "react-hook-form";
import { Dialog, DialogTitle, TextField, Autocomplete, Button, TableContainer, Table, TableBody, TableCell, TableRow, TableHead, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { editProductViewsAsync } from "../../Store/product/product.slice";
import { useState } from "react";

function createData(_id, name, views) {
    return {
        _id,
        name,
        views,
    };
}

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

    const products = useSelector((state) =>
        state.products.list.map(item => createData(item._id, item.name, item.views[item.views.length - 1].views))
    );

    const dispatch = useDispatch();

    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const { onClose, open } = props;

    const handleClose = () => {
        onClose();
    };


    const [snackbar, setSnackbar] = useState({ open: false, message: "" });

    const handleSnackBarClose = () => {
        setSnackbar({ open: false, message: "" });
    };

    const onSubmit = async (data) => {

        try {


            const newData = Object.fromEntries(
                Object.entries(data).filter(([_, value]) => value !== undefined && value !== null && value !== "")
            )

            const final = Object.entries(newData).map(([key, value]) => ({
                _id: key,
                views: value
            }));

            await dispatch(editProductViewsAsync(final)).unwrap();

            setSnackbar({ open: true, message: "Succesfully updated views" });

        } catch (error) {
            setSnackbar({ open: true, message: error.message });
        }

    };

    return (
        <>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleSnackBarClose}
                message={snackbar.message}
            />
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
                                rowCount={products.length}
                            />
                            <TableBody>
                                {products.map((row, index) => {

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
                                                    // { min: { value: row.views, message: "Value is low" } }
                                                    {...register(`${row._id}`,)}
                                                    error={!!errors[`${row._id}`]}
                                                    helperText={errors[`${row._id}`]?.message}
                                                    id="outlined-number"
                                                    label="Number"
                                                    type="number"
                                                    placeholder={row.views}
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
        </>
    );
};

export default ChangeViews;
