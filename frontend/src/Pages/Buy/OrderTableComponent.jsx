import { Autocomplete, TableCell, TableRow, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addChosenBuyItem, removeChosenBuyItem } from '../../Store/product/product.slice';

function createData(image, name, price, amount, amountInOne) {
    return {
        image,
        name,
        price,
        amount,
        amountInOne
    };
}

const OrderTableComponent = (props) => {

    const { number, register, errors, setValue, setComponents, components, deleteComponent } = props;

    const dispatch = useDispatch();
    const chosenBuyItems = useSelector((state) => state.products.chosenBuyItems);
    const rows = useSelector((state) => state.products.list);

    const handleSelectItem = (event, value) => {
        setChosen(value);
        if (value) {
            dispatch(addChosenBuyItem(value));
            setValue(`products[${number}].name`, value.name);
            setValue(`products[${number}]._id`, value._id);
        }
    };

    const handleRemoveItem = () => {
        if (chosen) {
            dispatch(removeChosenBuyItem(chosen));
            setChosen(false);
            deleteComponent(number)
        }
    };

    const [chosen, setChosen] = useState(false);

    const availableOptions = rows.filter(
        option => !chosenBuyItems.some(item => item._id === option._id)
    );

    return (
        <>
            {!chosen ? (
                <TableRow
                    hover
                    tabIndex={-1}
                    key={123}
                    sx={{ cursor: 'pointer' }}
                >
                    <TableCell
                        component="th"
                        scope="row"
                        padding="none"
                        colSpan={6}
                        sx={{ padding: '6px' }}
                    >
                        <Autocomplete
                            options={availableOptions}
                            getOptionLabel={(option) => option.name}
                            onChange={handleSelectItem}
                            clearOnEscape
                            isOptionEqualToValue={(option, value) => option._id === value?._id}
                            renderOption={(props, option) => (
                                <li {...props} key={option._id}>
                                    <img
                                        src={option.image}
                                        alt={option.name}
                                        style={{ width: 32, height: 32, marginRight: 10 }}
                                    />
                                    {option.name}
                                </li>
                            )}
                            renderInput={(params) => <TextField {...params} label="Select an Item" />}
                        />
                    </TableCell>
                </TableRow>
            ) : (
                <TableRow
                    hover
                    tabIndex={-1}
                    sx={{ cursor: 'pointer' }}
                >
                    <TableCell component="th" scope="row" padding="none">
                        <img style={{ height: "64px", width: "64px" }} src={chosen?.image} alt="item" />
                    </TableCell>
                    <TableCell align="left">
                        {chosen?.name}
                    </TableCell>
                    <TableCell align="right">
                        <TextField
                            size="small"
                            {...register(`products[${number}].price`, {
                                min: { value: 0.01, message: "Too low" },
                                required: "Price is required"
                            })}
                            type="number"
                            placeholder="Price"
                            error={!!errors.products?.[number]?.price}
                            helperText={errors.products?.[number]?.price?.message}
                            inputProps={{ step: "0.01" }}
                        />
                    </TableCell>
                    <TableCell align="right">
                        <TextField
                            size='small'
                            {...register(`products[${number}].amount`, { min: { value: 1, message: "Too low", }, required: "Amount is required" })}
                            type='number'
                            placeholder='Amount'
                        />
                    </TableCell>
                    <TableCell align="right">
                        <TextField
                            size='small'
                            {...register(`products[${number}].amountInOne`,
                                { min: { value: 1, message: "Too low" }, required: "A/I is required" })}
                            type='number'
                            placeholder='A/I'
                            defaultValue={1}
                        />
                    </TableCell>
                    <TableCell align="right" onClick={handleRemoveItem}>x</TableCell>
                </TableRow>
            )}
        </>
    );

}

export default OrderTableComponent;
