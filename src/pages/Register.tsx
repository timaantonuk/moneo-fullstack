"use client"

import { Button, TextField, Typography, CircularProgress, Alert } from "@mui/material"
import { Link } from "react-router-dom"
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn"
import { type SubmitHandler, useForm } from "react-hook-form"
import { useRegister } from "../hooks/useRegister.ts"
import { useTranslation } from "react-i18next"

function Register() {
    type TFormFields = {
        fullName: string
        email: string
        password: string
        confirmPassword: string
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<TFormFields>()
    const { mutate: registerUser, isPending, error } = useRegister()
    const { t } = useTranslation()

    const onSubmit: SubmitHandler<TFormFields> = (data) => {
        registerUser({
            fullName: data.fullName,
            email: data.email,
            password: data.password,
        })
    }

    return (
        <section className="flex justify-center items-center h-screen">
            <div className="main-wrapper flex flex-col items-center justify-center">
                <div className="flex items-center gap-2 mb-2">
                    <MonetizationOnIcon sx={{ fontSize: "4rem" }} />
                    <Typography variant="h2">Moneo App</Typography>
                </div>

                <Typography variant="h5" sx={{ marginBottom: "2rem" }}>
                    {t("auth.register.title")}
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ marginBottom: "1rem" }}>
                        {error?.response?.data?.message || t("auth.register.registerFailed")}
                    </Alert>
                )}

                <form className="flex flex-col gap-5 w-full px-16 max-w-2xl" onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label={t("auth.register.fullName")}
                        {...register("fullName", {
                            required: t("auth.register.fullNameRequired"),
                            minLength: {
                                value: 4,
                                message: t("auth.register.fullNameLength"),
                            },
                        })}
                        error={!!errors.fullName}
                        helperText={errors.fullName?.message}
                        fullWidth
                    />

                    <TextField
                        label={t("auth.register.email")}
                        type="email"
                        {...register("email", {
                            required: t("auth.register.emailRequired"),
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: t("auth.register.invalidEmail"),
                            },
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        fullWidth
                    />

                    <TextField
                        label={t("auth.register.password")}
                        type="password"
                        {...register("password", {
                            required: t("auth.register.passwordRequired"),
                            minLength: {
                                value: 8,
                                message: t("auth.register.passwordLength"),
                            },
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        fullWidth
                    />

                    <TextField
                        label={t("auth.register.confirmPassword")}
                        type="password"
                        {...register("confirmPassword", {
                            required: t("auth.register.confirmRequired"),
                            validate: (value) => value === watch("password") || t("auth.register.passwordsMatch"),
                        })}
                        fullWidth
                        sx={{ marginBottom: "2rem" }}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                    />

                    <Button type="submit" variant="contained" color="primary" size="large" disabled={isPending}>
                        {isPending ? <CircularProgress size={24} color="inherit" /> : t("auth.register.button")}
                    </Button>

                    <Button component={Link} to="/login" variant="outlined" color="primary" size="large">
                        {t("auth.register.haveAccount")}
                    </Button>
                </form>
            </div>
        </section>
    )
}

export default Register

