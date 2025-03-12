import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice.ts";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <Button variant="contained" color="error" onClick={handleLogout}>
            Logout
        </Button>
    );
}

export default LogoutButton;
