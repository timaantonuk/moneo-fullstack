import { Button, TextField, Typography, CircularProgress, Alert } from "@mui/material";
import { Link } from "react-router-dom";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRegister } from "../hooks/useRegister.ts";

function Register() {
    type TFormFields = {
        fullName: string;
        email: string;
        password: string;
        confirmPassword: string;
    };

    const { register, handleSubmit, watch, formState: { errors } } = useForm<TFormFields>();
    const { mutate: registerUser, isPending, error } = useRegister();

    const onSubmit: SubmitHandler<TFormFields> = (data) => {
        registerUser({
            fullName: data.fullName,
            email: data.email,
            password: data.password
        });
    };

    return (
        <section className="flex justify-center items-center h-screen">
            <div className="main-wrapper flex flex-col items-center justify-center">
                <div className="flex items-center gap-2 mb-2">
                    <MonetizationOnIcon sx={{ fontSize: "4rem" }} />
                    <Typography variant="h2">Moneo App</Typography>
                </div>

                <Typography variant="h5" sx={{ marginBottom: "2rem" }}>Register new account</Typography>

                {error && (
                    <Alert severity="error" sx={{ marginBottom: "1rem" }}>
                        {error?.response?.data?.message || "Something went wrong. Please try again."}
                    </Alert>
                )}

                <form className="flex flex-col gap-5 w-full px-16 max-w-2xl" onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label="Full Name"
                        {...register("fullName", {
                            required: "Full name is required!",
                            minLength: {
                                value: 4,
                                message: "Full name must be at least 4 symbols!"
                            }
                        })}
                        error={!!errors.fullName}
                        helperText={errors.fullName?.message}
                        fullWidth
                    />

                    <TextField
                        label="Email"
                        type="email"
                        {...register("email", {
                            required: "Email is required!",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: "Invalid email format"
                            }
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        fullWidth
                    />

                    <TextField
                        label="Password"
                        type="password"
                        {...register("password", {
                            required: "Password is required!",
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters long"
                            }
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        fullWidth
                    />

                    <TextField
                        label="Confirm Password"
                        type="password"
                        {...register("confirmPassword", {
                            required: "Confirm Password is required!",
                            validate: (value) =>
                                value === watch("password") || "Passwords do not match"
                        })}
                        fullWidth
                        sx={{ marginBottom: "2rem" }}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                    />


                    <Button type="submit" variant="contained" color="primary" size="large" disabled={isPending}>
                        {isPending ? <CircularProgress size={24} color="inherit" /> : "Register"}
                    </Button>

                    <Button component={Link} to="/login" variant="outlined" color="primary" size="large">
                        Already have an account? Log in
                    </Button>
                </form>
            </div>
        </section>
    );
}

export default Register;
