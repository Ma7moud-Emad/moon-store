import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { clearCart } from "../services/apis";

export function useClearCart(token) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => clearCart(token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const cleartCartWithToast = () => {
    return toast.promise(
      mutation
        .mutateAsync()
        .then((res) => {
          return res.message || "Cleaning successfully";
        })
        .catch((err) => {
          throw err.message || "Cleaning failed";
        }),
      {
        loading: "Cleaning in progress...",
        success: (msg) => msg,
        error: (msg) => msg,
      }
    );
  };

  return { ...mutation, cleartCartWithToast };
}
