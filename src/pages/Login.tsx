"use client"

import { Button, TextField, Typography, CircularProgress, Alert } from "@mui/material"
import { Link } from "react-router-dom"
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn"
import { type SubmitHandler, useForm } from "react-hook-form"
import { useLogin } from "../hooks/useLogin.ts"
import { useTranslation } from "react-i18next"

function Login() {
    type TFormFields = {
        email: string
        password: string
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TFormFields>()
    const { mutate: loginUser, isPending, error } = useLogin()
    const { t } = useTranslation()

    const onSubmit: SubmitHandler<TFormFields> = (data) => {
        loginUser(data)
    }

    return (
        <section className="flex justify-center items-center h-screen">
            <div className="main-wrapper flex flex-col items-center justify-center py-5">
                <div className="flex items-center gap-2 mb-2">
                    <MonetizationOnIcon sx={{ fontSize: "4rem" }} />
                    <Typography variant="h2">Moneo App</Typography>
                </div>
                <Typography variant="h5" sx={{ marginBottom: "2rem" }}>
                    {t("auth.login.title")}
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ marginBottom: "1rem" }}>
                        {error?.response?.data?.message || t("auth.login.loginFailed")}
                    </Alert>
                )}

                <form className="flex flex-col gap-5 w-full max-w-2xl" onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label={t("auth.login.email")}
                        type="email"
                        {...register("email", {
                            required: t("auth.login.emailRequired"),
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: t("auth.login.invalidEmail"),
                            },
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        fullWidth
                    />

                    <TextField
                        label={t("auth.login.password")}
                        type="password"
                        {...register("password", { required: t("auth.login.passwordRequired") })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        fullWidth
                    />

                    <Button type="submit" variant="contained" color="primary" size="large" disabled={isPending}>
                        {isPending ? <CircularProgress size={24} color="inherit" /> : t("auth.login.button")}
                    </Button>

                    <Button component={Link} to="/register" variant="outlined" color="primary" size="large">
                        {t("auth.login.newAccount")}
                    </Button>
                </form>
            </div>
        </section>
    )
}

export default Login

