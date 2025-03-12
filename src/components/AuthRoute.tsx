import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import { RootState } from "../store/store";

function AuthRoute() {
    const auth = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.user) {
            navigate("/register");
        }
    }, [auth.user, navigate]);

    return auth.user ? <Outlet /> : null;
}

export default AuthRoute;
