import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosInstance";

export const useDeleteTransaction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/transactions/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["transactions"]);
        }
    });
};
