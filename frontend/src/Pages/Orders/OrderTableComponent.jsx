import { Autocomplete, TableCell, TableRow, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addChosenSellItem, removeChosenSellItem } from '../../Store/product/product.slice';

function createData(image, name, price, amount) {
    return {
        image,
        name,
        price,
        amount,
    };
}

const rows = [
    createData('https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', 'Crunch1', 250, 3),
    createData('https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', 'Crunch2', 250, 3),
    createData('https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', 'Crunch3', 250, 3),
    createData('https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', 'Crunch4', 250, 3),
    createData('https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif', 'Crunch5', 2501, 33),
];

const OrderTableComponent = (props) => {

    const { number, register, errors, setValue, setComponents, components, deleteComponent } = props;

    const [chosen, setChosen] = useState(false);

    const dispatch = useDispatch();
    const chosenSellItems = useSelector((state) => state.products.chosenSellItems);
    const rows = useSelector((state) => state.products.list);

    const handleSelectItem = (event, value) => {
        setChosen(value);
        if (value) {
            dispatch(addChosenSellItem(value));
            setValue(`products[${number}].name`, value.name);
            setValue(`products[${number}]._id`, value._id);
        }
    };

    useEffect(() => {
        console.log(chosenSellItems);
        
    }, [chosenSellItems])

    const handleRemoveItem = () => {
        if (chosen) {
            dispatch(removeChosenSellItem(chosen));
            setChosen(false);
            deleteComponent(number)
        }
    };

    const availableOptions = rows.filter(
        option => !chosenSellItems.some(item => item._id === option._id)
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
                        colSpan={5}
                        sx={{ padding: '6px' }}
                    >
                        <Autocomplete
                            options={availableOptions}
                            getOptionLabel={(option) => option.name}
                            onChange={handleSelectItem}
                            isOptionEqualToValue={(option, value) => option._id === value?._id}
                            clearOnEscape
                            renderOption={(props, option) => (
                                <li {...props} key={option.id}>
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
                            error={!!errors.items?.[number]?.price}
                            helperText={errors.items?.[number]?.price?.message}
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
                    <TableCell align="right" onClick={handleRemoveItem}>x</TableCell>
                </TableRow>
            )}
        </>
    );

}

export default OrderTableComponent;
