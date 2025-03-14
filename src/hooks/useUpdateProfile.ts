import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../api/axiosInstance"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../store/store"
import { setUser } from "../store/slices/authSlice.ts"

interface UpdateProfileData {
    fullName?: string
    avatar?: string
    language?: string
}

interface MutationCallbacks {
    onSuccess?: () => void
    onError?: (error: any) => void
}

export const useUpdateProfile = () => {
    const auth = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (updateData: UpdateProfileData) => {
            try {
                const { data } = await api.put(`/profile`, updateData)
                return data
            } catch (error) {
                console.error("Profile update error:", error)
                throw error
            }
        },
        onSuccess: (data) => {
            if (auth.user) {
                dispatch(setUser({ user: data.user || auth.user, token: auth.token || "" }))
            }
            queryClient.invalidateQueries({ queryKey: ["user"] })
        },
        onError: (error) => {
            console.error("Failed to update profile:", error)
            if (error.response && error.response.status === 401) {
                console.log("Authentication error, please log in again")
            }
        },
    })
}

