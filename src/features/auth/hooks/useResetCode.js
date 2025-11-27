import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import resetCode from "../servies/apis";

export function useResetCode() {
  const mutation = useMutation({
    mutationFn: resetCode, // v5
    onSuccess: () => {
      setTimeout(() => {
        window.location.href = "/resetpassword";
      }, 2000);
    },
  });

  const resetCodeWithToast = (code) => {
    return toast.promise(
      mutation
        .mutateAsync(code)
        .then((res) => {
          return res.data.message || "Verified successfully";
        })
        .catch((err) => {
          throw err.response.data.message || "Verification failed";
        }),
      {
        loading: "Checking...",
        success: (msg) => msg,
        error: (msg) => msg,
      }
    );
  };

  return { ...mutation, resetCodeWithToast };
}
