import { useForm, Controller } from "react-hook-form";
import { Dialog, DialogTitle, TextField, Autocomplete, Button } from "@mui/material";

const options = ["Brand A", "Brand B", "Brand C"];

const AddNewProduct = (props) => {
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const { onClose, open } = props;

    const handleClose = () => {
        onClose();
    };

    const onSubmit = (data) => console.log(data);

    return (
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
                    name="category"
                    control={control}
                    rules={{ required: "Category is required" }}
                    render={({ field }) => (
                        <Autocomplete
                            size="small"
                            {...field}
                            options={options}
                            getOptionLabel={(option) => option}
                            onChange={(_, value) => field.onChange(value)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Category"
                                    error={!!errors.category}
                                    helperText={errors.category?.message}
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
                            size="small"
                            {...field}
                            options={options}
                            getOptionLabel={(option) => option}
                            onChange={(_, value) => field.onChange(value)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Brand"
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
    );
};

export default AddNewProduct;
