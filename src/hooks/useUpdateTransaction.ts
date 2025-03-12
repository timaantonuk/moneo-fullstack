import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosInstance";

interface UpdateTransactionData {
    id: string;
    amount: number;
    description: string;
}

export const useUpdateTransaction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, amount, description }: UpdateTransactionData) => {
            const { data } = await api.put(`/transactions/${id}`, { amount, description });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["transactions"]);
        }
    });
};
