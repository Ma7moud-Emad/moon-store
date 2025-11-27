import axios from "axios";

export default async function getCart(token) {
  const res = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
    headers: {
      token,
    },
  });
  return res.data;
}

export async function clearCart(token) {
  const res = await axios.delete(
    "https://ecommerce.routemisr.com/api/v1/cart",
    {
      headers: {
        token,
      },
    }
  );
  return res.data;
}
