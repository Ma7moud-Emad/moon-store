import toast from "react-hot-toast";

/**
 * عرض Toast لأي Promise
 * @param {Promise} promise - أي Promise
 * @param {Object} messages - رسائل toast {loading, success, error}
 */
export default function toastPromise(promise, messages) {
  return toast.promise(promise, {
    loading: messages.loading || "Processing...",
    success: messages.success || "Success",
    error: messages.error || "Something went wrong",
  });
}
