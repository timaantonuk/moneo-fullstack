import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setUser } from "../store/slices/authSlice.ts";

interface UpdateProfileData {
    fullName?: string;
    avatar?: string;
    language?: string;
}

export const useUpdateProfile = () => {
    const auth = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (updateData: UpdateProfileData) => {
            const { data } = await api.put(`/profile`, updateData);
            return data;
        },
        onSuccess: (data) => {
            dispatch(setUser({ user: data.user, token: auth.token }));
            queryClient.invalidateQueries(["user"]);
        },
    });
};
