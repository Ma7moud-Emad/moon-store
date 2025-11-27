import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { changePass } from "../servies/apis";

export function useChangePass() {
  const mutation = useMutation({
    mutationFn: changePass, // v5
    onSuccess: () => {
      setTimeout(() => {
        window.location.href = "/signin";
      }, 2000);
    },
  });

  const changePassWithToast = (data) => {
    return toast.promise(
      mutation
        .mutateAsync(data)
        .then((res) => {
          localStorage.setItem("userToken", res.data.token);
          return res.data.message || "updated successfully";
        })
        .catch((err) => {
          throw err.response.data.message || "updated failed";
        }),
      {
        loading: "Updating in progress...",
        success: (msg) => msg,
        error: (msg) => msg,
      }
    );
  };

  return { ...mutation, changePassWithToast };
}
