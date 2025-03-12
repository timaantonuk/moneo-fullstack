import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosInstance";

interface GoalData {
    title: string;
    emoji: string;
    color: string;
    isCompleted: boolean;
    targetAmount: number;
}

export const useAddGoal = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (goalData: GoalData) => {
            console.log("🚀 sending in API:", JSON.stringify(goalData)); // 🔥 Debug log

            const { data } = await api.post("/goals", goalData, {
                headers: { "Content-Type": "application/json" },
            });

            console.log("✅ Сервер ответил:", data); // 🔥 Debug log
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["goals"]);
        }
    });
};

