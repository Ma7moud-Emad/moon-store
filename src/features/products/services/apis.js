import axios from "axios";

export default async function getProducts(params = {}) {
  const res = await axios.get(
    "https://ecommerce.routemisr.com/api/v1/products",
    {
      params: {
        page: params.page,
        limit: params.limit,
      },
    }
  );

  return res.data.data;
}

export async function getProduct(ProductId) {
  const res = await axios.get(
    `https://ecommerce.routemisr.com/api/v1/products/${ProductId}`
  );

  return res.data.data;
}

export async function addProductToCart(productId, token) {
  const res = await axios.post(
    "https://ecommerce.routemisr.com/api/v1/cart",
    { productId },
    {
      headers: {
        token,
      },
    }
  );
  return res.data;
}

export async function removeProduct(productId, token) {
  const res = await axios.delete(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {
      headers: {
        token,
      },
    }
  );
  return res.data;
}

export async function resetCount(productId, newCount, token) {
  const res = await axios.put(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    { count: newCount },
    {
      headers: {
        token,
      },
    }
  );
  return res.data;
}
