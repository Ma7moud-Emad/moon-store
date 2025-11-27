import axios from "axios";

async function getBrands() {
  const res = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");

  return res.data.data;
}

export default getBrands;
