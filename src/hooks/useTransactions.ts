import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const useTransactions = () => {
    const auth = useSelector((state: RootState) => state.auth);


    return useQuery({
        queryKey: ["transactions", auth.user?._id],
        queryFn: async () => {
            if (!auth.user) throw new Error("User not authenticated");
            const { data } = await api.get(`/transactions?userId=${auth.user._id}`);
            return data;
        },
        enabled: !!auth.user,
    });
};
