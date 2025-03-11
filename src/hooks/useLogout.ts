import { useDispatch } from "react-redux"
import {logout} from "../store/slices/authSlice.ts";


export const useLogout = () => {
    const dispatch = useDispatch()

    return () => {
        dispatch(logout())
    }
}
