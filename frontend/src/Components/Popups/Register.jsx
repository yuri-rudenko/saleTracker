import { Button, Dialog, DialogTitle, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { registerAsync } from '../../Store/user/user.slice';

const Register = (props) => {

    const { register, handleSubmit, control, setValue, formState: { errors }, reset } = useForm();

    const { onClose, open } = props;
    const dispatch = useDispatch();

    const handleClose = () => {
        onClose();
    };

    const onSubmit = async (data) => {

        try {

            await dispatch(registerAsync(data));

        } catch (error) {
            // setSnackbar({ open: true, message: error.message });
        }

    };

    return (
        <>
            <Dialog maxWidth={"sm"} open={open} onClose={handleClose}>
                <DialogTitle>Register</DialogTitle>
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

export default Register;
