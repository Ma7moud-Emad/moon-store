import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { resetCount } from "../services/apis";

export function useResetCount(token) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ productId, newCount }) =>
      resetCount(productId, newCount, token), // v5
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const resetCountWithToast = (productId, newCount) => {
    return toast.promise(
      mutation
        .mutateAsync({ productId, newCount })
        .then((res) => {
          return res.status || "Product count reset successfully";
        })
        .catch((err) => {
          throw err.response.data.message || "Failed to reset product count";
        }),
      {
        loading: "Resetting product count...",
        success: (msg) => msg,
        error: (msg) => msg,
      }
    );
  };

  return { ...mutation, resetCountWithToast };
}
