import { useMutation } from "@tanstack/react-query"
import api from "../api/axiosInstance"
import { useDispatch } from "react-redux"
import { TUser } from "../types/User"
import {setUser} from "../store/slices/authSlice.ts";

type TLoginData = {
    email: string
    password: string
}

export const useLogin = () => {
    const dispatch = useDispatch()

    return useMutation({
        mutationFn: async (userData: TLoginData) => {
            const { data } = await api.post<{ user: TUser; token: string }>("/auth/login", userData)
            localStorage.setItem("token", data.token)
            dispatch(setUser({ user: data.user, token: data.token }))
            return data
        }
    })
}
