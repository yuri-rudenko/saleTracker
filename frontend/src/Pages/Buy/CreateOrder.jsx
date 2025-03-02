import { Autocomplete, Button, Checkbox, Dialog, DialogTitle, FormControlLabel, Snackbar, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import OrderTableComponent from './OrderTableComponent';
import { useDispatch, useSelector } from 'react-redux';
import { resetChosenBuyItems } from '../../Store/product/product.slice';
import { createBuyAsync } from '../../Store/buys/buys.slice';

const options = [1, 2, 3]

const CreateOrder = (props) => {

    const { register, handleSubmit, control, setValue, formState: { errors }, reset } = useForm();

    const { onClose, open } = props;
    let [increment, setIncrement] = useState(0);

    const dispatch = useDispatch();

    const handleClose = () => {
        onClose();
        resetComponents()
    };

    const [components, setComponents] = useState([]);

    const deleteComponent = (number) => {

        setComponents((prevComponents) =>

            prevComponents.filter((component) => component.props.number !== number)

        );

        setValue(`products[${number}]`, undefined);
    };


    const addComponent = () => {
        setComponents((prevComponents) => {
            const newComponent = (
                <OrderTableComponent
                    deleteComponent={deleteComponent}
                    components={prevComponents}
                    setComponents={setComponents}
                    setValue={setValue}
                    register={register}
                    errors={errors}
                    number={increment}
                    key={increment}
                />
            );
            return [...prevComponents, newComponent];
        });
        setIncrement(prevIncrement => prevIncrement += 1);
    };


    const resetComponents = () => {
        setComponents([]);
        setIncrement(0);
        dispatch(resetChosenBuyItems());
        reset();
    }


    const [snackbar, setSnackbar] = useState({ open: false, message: "" });

    const handleSnackBarClose = () => {
        setSnackbar({ open: false, message: "" });
    };

    const onSubmit = async (data) => {

        try {
            await dispatch(createBuyAsync(data)).unwrap();

            setSnackbar({ open: true, message: "Succesfully created buy" });

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
                <DialogTitle sx={{ paddingBottom: 0 }}>Create new order</DialogTitle>

                <form onSubmit={handleSubmit(onSubmit)} style={{ padding: 20 }}>


                    <Button onClick={addComponent} variant="contained" sx={{ maxWidth: "150px" }} color="success" fullWidth>
                        Add new item
                    </Button>
                    <Button onClick={resetComponents} variant="contained" sx={{ maxWidth: "150px", marginLeft: "16px" }} color="error" fullWidth>
                        Clear
                    </Button>

                    <TableContainer style={{ minHeight: "210px", marginTop: "16px" }}>
                        <Table
                            sx={{ minWidth: 550 }}
                            aria-labelledby="tableTitle"
                            size={'medium'}
                        >
                            <TableBody>
                                {components}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TextField
                        size="small"
                        type='date'
                        placeholder="Date (default - now)"
                        {...register("date")}
                        error={!!errors.date}
                        helperText={errors.image?.date}
                        fullWidth
                        margin="normal"
                    />
                    <div className="arrived">
                        <FormControlLabel {...register("status")} control={<Checkbox defaultChecked />} label="Already arrived" />
                    </div>
                    <Button style={{ marginTop: "16px" }} type="submit" variant="contained" color="primary" fullWidth>
                        Submit
                    </Button>
                </form>
            </Dialog>
        </>
    );
}

export default CreateOrder;
