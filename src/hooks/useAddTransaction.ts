import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosInstance";

interface AddTransactionData {
    type: "income" | "expense";
    category: string;
    amount: number;
    description: string;
    emoji: string;
}

export const useAddTransaction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (transactionData: AddTransactionData) => {
            const { data } = await api.post("/transactions", transactionData);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["transactions"]); // Обновляем список после добавления
        }
    });
};
