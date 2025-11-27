import axios from "axios";

export default async function resetCode(code) {
  const response = await axios.post(
    "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
    code
  );
  return response;
}
export async function changePass(data) {
  const res = await axios.put(
    "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
    data
  );
  return res;
}

export async function verifyEmail(email) {
  const response = await axios.post(
    "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
    email
  );
  return response;
}
