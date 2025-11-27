import axios from "axios";

export default async function cashOrder(token, cartId, shippingAddress) {
  const res = await axios.post(
    `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
    { shippingAddress },
    {
      headers: {
        token: token,
      },
    }
  );

  return res.data;
}

export async function onlineOrder(token, cartId, shippingAddress) {
  const res = await axios.post(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
    { shippingAddress },
    {
      headers: {
        token: token,
      },
    }
  );

  return res.data;
}
