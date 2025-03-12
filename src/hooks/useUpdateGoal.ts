import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosInstance";

interface UpdateGoalData {
    id: string;
    isCompleted: boolean;
}

export const useUpdateGoal = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, isCompleted }: UpdateGoalData) => {
            const { data } = await api.put(`/goals/${id}`, { isCompleted });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["goals"]);
        }
    });
};
