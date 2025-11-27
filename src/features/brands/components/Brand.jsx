export default function Brand({ brand }) {
  return (
    <div className="flex flex-col justify-center items-center shadow-sm rounded-sm hover:translate-y-0.5 transition">
      <img src={brand.image} alt={brand.name} className="flex-1" />
      <h2 className="font-semibold text-neutral-800 text-lg uppercase">
        {brand.name}
      </h2>
    </div>
  );
}
