import { useMutation } from "@tanstack/react-query"
import api from "../api/axiosInstance"

type TRegisterData = {
    fullName: string
    email: string
    password: string
}

export const useRegister = () => {
    return useMutation({
        mutationFn: async (userData: TRegisterData) => {
            const { data } = await api.post("/auth/register", userData)
            return data
        }
    })
}
