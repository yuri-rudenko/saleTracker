import { Button, Dialog, DialogTitle, Snackbar, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginAsync } from '../../Store/user/user.slice';

const Login = (props) => {

    const { register, handleSubmit, control, setValue, formState: { errors }, reset } = useForm();

    const { onClose, open } = props;
    const dispatch = useDispatch();


    const [snackbar, setSnackbar] = useState({ open: false, message: "" });

    const handleSnackBarClose = () => {
        setSnackbar({ open: false, message: "" });
    };

    const handleClose = () => {
        onClose();
    };

    const onSubmit = async (data) => {

        try {

            await dispatch(loginAsync(data)).unwrap();
            setSnackbar({ open: true, message: "Logined successfully!" });
            handleClose()

        } catch (error) {
            setSnackbar({ open: true, message: error });
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
            <Dialog maxWidth={"sm"} open={open} onClose={handleClose}>
                <DialogTitle>Login</DialogTitle>
                <form style={{ padding: 20 }} onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        size="small"
                        placeholder="Username"
                        {...register("username", { required: "Username is required", minLength: { value: 4, message: "Minimum length is 4" } })}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        size="small"
                        placeholder="Password"
                        {...register("password", { required: "Password is required", minLength: { value: 4, message: "Minimum length is 4" } })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
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
}

export default Login;
