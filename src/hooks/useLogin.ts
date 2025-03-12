import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "../api/axiosInstance";
import { TUser } from "../types/User";
import { setUser } from "../store/slices/authSlice.ts";

type TLoginData = {
    email: string;
    password: string;
}

export const useLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: async (userData: TLoginData) => {
            const { data } = await api.post<{ user: TUser; token: string }>("/auth/login", userData);
            return data;
        },
        onSuccess: (data) => {
            localStorage.setItem("token", data.token);
            dispatch(setUser({ user: data.user, token: data.token }));
            navigate("/");
        },
        onError: (error: any) => {
            console.error("Login error:", error.response?.data?.message || error.message);
        }
    });
};
