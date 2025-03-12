import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const useGoals = () => {
    const auth = useSelector((state: RootState) => state.auth);

    return useQuery({
        queryKey: ["goals", auth.user?._id],
        queryFn: async () => {
            if (!auth.user) throw new Error("User not authenticated");
            const { data } = await api.get(`/goals?userId=${auth.user._id}`);
            return data;
        },
        enabled: !!auth.user
    });
};
