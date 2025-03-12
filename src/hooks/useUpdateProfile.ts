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

export const useUpdateProfile = () => {
    const auth = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (updateData: UpdateProfileData) => {
            try {
                // Log the token to check if it exists
                console.log("Auth token:", auth.token)

                const { data } = await api.put(`/profile`, updateData)
                return data
            } catch (error) {
                console.error("Profile update error:", error)
                throw error
            }
        },
        onSuccess: (data) => {
            // Update the user in Redux store
            dispatch(setUser({ user: data.user, token: auth.token }))
            queryClient.invalidateQueries(["user"])
        },
        onError: (error) => {
            console.error("Failed to update profile:", error)
            // If we get a 401, we can handle it here as well
            if (error.response && error.response.status === 401) {
                console.log("Authentication error, please log in again")
            }
        },
    })
}

