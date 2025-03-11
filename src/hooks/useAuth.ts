import { useQuery } from "@tanstack/react-query"
import { useDispatch } from "react-redux"
import { setUser } from "../store/slices/authSlice"
import api from "../api/axiosInstance"

export const useAuth = () => {
    const dispatch = useDispatch()

    return useQuery({
        queryKey: ["auth"],
        queryFn: async () => {
            const { data } = await api.get("/auth/me")
            dispatch(setUser({ user: data.user, token: localStorage.getItem("token")! }))
            return data.user
        },
        enabled: !!localStorage.getItem("token")
    })
}
