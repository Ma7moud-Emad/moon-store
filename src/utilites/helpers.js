export default function filterProducts({
  data,
  selectedCategories,
  selectedBrands,
  priceRange,
  searchTerm = "",
}) {
  return data.filter((product) => {
    // ----- Filter by category -----
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category?._id);

    // ----- Filter by brand -----
    const brandMatch =
      selectedBrands.length === 0 ||
      selectedBrands.includes(product.brand?._id);

    // ----- Filter by price -----
    const priceMatch =
      product.price >= priceRange.min && product.price <= priceRange.max;

    // ----- Filter by search (title) -----
    const searchMatch =
      searchTerm === "" ||
      product.title.toLowerCase().includes(searchTerm.toLowerCase());

    return categoryMatch && brandMatch && priceMatch && searchMatch;
  });
}
