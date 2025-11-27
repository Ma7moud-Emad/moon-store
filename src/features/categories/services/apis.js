import axios from "axios";

async function getCategories() {
  const res = await axios.get(
    "https://ecommerce.routemisr.com/api/v1/categories"
  );

  return res.data.data;
}

export default getCategories;
