import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeProduct } from "../services/apis";
import toast from "react-hot-toast";

export function useRemoveFromCart(token) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (productId) => removeProduct(productId, token), // v5
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const removeFromCartWithToast = (productId) => {
    return toast.promise(
      mutation
        .mutateAsync(productId)
        .then((res) => {
          return res.status || "Product removed successfully";
        })
        .catch((err) => {
          throw err.response.data.message || "Failed to remove product";
        }),
      {
        loading: "Removing product from cart...",
        success: (msg) => msg,
        error: (msg) => msg,
      }
    );
  };

  return { ...mutation, removeFromCartWithToast };
}
