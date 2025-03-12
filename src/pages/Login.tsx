import { Button, TextField, Typography, CircularProgress, Alert } from "@mui/material";
import { Link } from "react-router-dom";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLogin } from "../hooks/useLogin.ts";

function Login() {
    type TFormFields = {
        email: string;
        password: string;
    };

    const { register, handleSubmit, formState: { errors } } = useForm<TFormFields>();
    const { mutate: loginUser, isPending, error } = useLogin();

    const onSubmit: SubmitHandler<TFormFields> = (data) => {
        console.log(data);
        loginUser(data);
    };

    return (
        <section className="flex justify-center items-center h-screen">
            <div className="main-wrapper flex flex-col items-center justify-center py-5">
                <div className="flex items-center gap-2 mb-2">
                    <MonetizationOnIcon sx={{ fontSize: "4rem" }} />
                    <Typography variant="h2">Moneo App</Typography>
                </div>
                <Typography variant="h5" sx={{ marginBottom: "2rem" }}>Login to your account</Typography>


                {error && (
                    <Alert severity="error" sx={{ marginBottom: "1rem" }}>
                        {error?.response?.data?.message || "Login failed. Please try again."}
                    </Alert>
                )}

                <form className="flex flex-col gap-5 w-full max-w-2xl" onSubmit={handleSubmit(onSubmit)}>
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
                        {...register("password", { required: "Password is required!" })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        fullWidth
                    />

                    <Button type="submit" variant="contained" color="primary" size="large" disabled={isPending}>
                        {isPending ? <CircularProgress size={24} color="inherit" /> : "Log In"}
                    </Button>

                    <Button component={Link} to="/register" variant="outlined" color="primary" size="large">
                        New here? Create an account!
                    </Button>
                </form>
            </div>
        </section>
    );
}

export default Login;
