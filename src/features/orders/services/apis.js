import axios from "axios";

export default async function getOrders(token, userId) {
  const res = await axios.get(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
    {
      headers: {
        token: token,
      },
    }
  );

  return res.data;
}
