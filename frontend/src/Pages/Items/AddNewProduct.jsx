import { useForm, Controller } from "react-hook-form";
import { Dialog, DialogTitle, TextField, Autocomplete, Button, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrandsAsync } from "../../Store/typeBrand/brand.slice";
import { fetchTypesAsync } from "../../Store/typeBrand/type.slice";
import { useEffect, useState } from "react";
import { createProductAsync } from "../../Store/product/product.slice";

const AddNewProduct = (props) => {

    const { register, handleSubmit, control, formState: { errors } } = useForm();

    const dispatch = useDispatch();
    const brands = useSelector((state) => state.brands.list);
    const types = useSelector((state) => state.types.list);

    const loading = useSelector((state) => state.products.loading);

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
            await dispatch(createProductAsync(data)).unwrap();

            setSnackbar({ open: true, message: "Succesfully created item" });

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
                <DialogTitle>Add New Product</DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)} style={{ padding: 20 }}>

                    <TextField
                        size="small"
                        placeholder="Name"
                        {...register("name", { required: "Name is required", minLength: { value: 3, message: "Minimum length is 3" } })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        size="small"
                        placeholder="Image link"
                        {...register("image", { required: "Image is required", minLength: { value: 3, message: "Minimum length is 3" } })}
                        error={!!errors.image}
                        helperText={errors.image?.message}
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        size="small"
                        placeholder="Item link"
                        {...register("link", { required: "Image is required", minLength: { value: 3, message: "Minimum length is 3" } })}
                        error={!!errors.link}
                        helperText={errors.image?.link}
                        fullWidth
                        margin="normal"
                    />

                    <Controller
                        name="type"
                        control={control}
                        rules={{ required: "Type is required" }}
                        render={({ field }) => (
                            <Autocomplete
                                freeSolo
                                size="small"
                                {...field}
                                options={types.map(type => type.name)}
                                getOptionLabel={(option) => option}
                                onChange={(_, value) => field.onChange(value)}
                                onInputChange={(_, value) => field.onChange(value)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder="Type"
                                        error={!!errors.type}
                                        helperText={errors.type?.message}
                                        fullWidth
                                        margin="normal"
                                    />
                                )}
                            />
                        )}
                    />

                    <Controller
                        name="brand"
                        control={control}
                        rules={{ required: "Brand is required" }}
                        render={({ field }) => (
                            <Autocomplete
                                freeSolo
                                size="small"
                                options={brands.map(brand => brand.name)}
                                getOptionLabel={(option) => option}
                                value={field.value}
                                onChange={(_, value) => field.onChange(value)}
                                onInputChange={(_, value) => field.onChange(value)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder="Brand"
                                        error={!!errors.brand}
                                        helperText={errors.brand?.message}
                                        fullWidth
                                        margin="normal"
                                    />
                                )}
                            />
                        )}
                    />

                    <TextField
                        size="small"
                        type="number"
                        placeholder="Views (default = 0)"
                        {...register("views")}
                        error={!!errors.views}
                        helperText={errors.views?.message}
                        fullWidth
                        margin="normal"
                    />

                    <Button style={{ marginTop: "16px" }} type="submit" variant="contained" color="primary" fullWidth>
                        Submit
                    </Button>
                </form>
            </Dialog>
        </>
    );
};

export default AddNewProduct;
