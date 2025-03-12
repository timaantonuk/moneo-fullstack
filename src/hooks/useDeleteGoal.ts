import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosInstance";

export const useDeleteGoal = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (goalId: string) => {
            await api.delete(`/goals/${goalId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["goals"]);
        }
    });
};
