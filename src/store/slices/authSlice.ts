import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {TUser} from "../../types/User.ts";


export type TAuthState = {
    user: null | TUser,
    token: string | null,
    loading: boolean,
    error: null | boolean,
}

const initialState: TAuthState = {
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{user: TUser; token: string;}>) => {
            state.user = action.payload.user
            state.token = action.payload.token
            localStorage.setItem("token", action.payload.token)
        },
        logout: (state) => {
            state.user = null
            state.token = null
            localStorage.removeItem('token')
        }
    },

})

export const { setUser, logout } = authSlice.actions

export default authSlice.reducer