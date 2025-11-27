import axios from "axios";

export default async function getWishlist(token) {
  const res = await axios.get(
    "https://ecommerce.routemisr.com/api/v1/wishlist",
    {
      headers: {
        token,
      },
    }
  );
  return res.data;
}
export async function addProductToWishlist(productId, token) {
  const res = await axios.post(
    "https://ecommerce.routemisr.com/api/v1/wishlist",
    { productId },
    {
      headers: {
        token,
      },
    }
  );
  return res.data;
}
export async function removeProductFromWishlist(productId, token) {
  const res = await axios.delete(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
    {
      headers: {
        token,
      },
    }
  );
  return res.data;
}
