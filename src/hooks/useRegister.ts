import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import api from "../api/axiosInstance"
import { TUser } from "../types/User"
import { setUser } from "../store/slices/authSlice.ts"

interface RegisterData {
    fullName: string
    email: string
    password: string
}

export const useRegister = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return useMutation({
        mutationFn: async (userData: RegisterData) => {
            const { data } = await api.post<{ user: TUser; token: string }>("/auth/register", userData)
            return data
        },
        onSuccess: (data) => {
            localStorage.setItem("token", data.token)
            dispatch(setUser({ user: data.user, token: data.token }))
            navigate("/")
        },
        onError: (error: any) => {
            console.error("Registration error:", error.response?.data?.message || error.message)
        }
    })
}
