import { useDispatch } from "react-redux"
import { logout } from "../store/authSlice"

export const useLogout = () => {
    const dispatch = useDispatch()

    return () => {
        dispatch(logout())
    }
}
