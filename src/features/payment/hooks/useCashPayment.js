import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import cashOrder from "../servies/apis";

export default function useCashOrder(token) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ cartId, shippingAddress }) =>
      cashOrder(token, cartId, shippingAddress), // v5
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const cashPaymentWithToast = (cartId, shippingAddress) => {
    return toast.promise(
      mutation
        .mutateAsync({ cartId, shippingAddress })
        .then((res) => {
          return res.message || "Cash payment successfully";
        })
        .catch((err) => {
          throw (
            err.response.data.message || err.message || "Failed cash payment"
          );
        }),
      {
        loading: "Cash payment is being processed...",
        success: (msg) => msg,
        error: (msg) => msg,
      }
    );
  };

  return { ...mutation, cashPaymentWithToast };
}
