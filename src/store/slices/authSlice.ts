import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TUser } from "../../types/User.ts"

export type TAuthState = {
    user: TUser | null
    token: string | null
    loading: boolean
    error: string | null
}

const initialState: TAuthState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ user: TUser; token: string }>) => {
            state.user = action.payload.user
            state.token = action.payload.token
            localStorage.setItem("token", action.payload.token)
            localStorage.setItem("user", JSON.stringify(action.payload.user))
        },

        logout: (state) => {
            state.user = null
            state.token = null
            state.error = null
            localStorage.removeItem("token")
        }
    }
})

export const { setUser, logout } = authSlice.actions
export default authSlice.reducer
