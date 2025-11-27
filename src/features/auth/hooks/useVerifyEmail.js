import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { verifyEmail } from "../servies/apis";

export function useVerifyEmail() {
  const mutation = useMutation({
    mutationFn: verifyEmail, // v5
    onSuccess: () => {
      setTimeout(() => {
        window.location.href = "/resetcode";
      }, 2000);
    },
  });

  const verifyEmailWithToast = (email) => {
    return toast.promise(
      mutation
        .mutateAsync(email)
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

  return { ...mutation, verifyEmailWithToast };
}
