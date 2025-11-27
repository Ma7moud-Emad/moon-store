export default function Category({ category, addClasses }) {
  return (
    <div
      className={`flex flex-col justify-center items-center shadow-sm rounded-sm overflow-hidden hover:translate-y-0.5 transition ${addClasses}`}
    >
      <img src={category.image} alt={category.name} className="flex-1" />
      <h2 className="font-semibold text-neutral-800 text-lg uppercase">
        {category.name}
      </h2>
    </div>
  );
}
