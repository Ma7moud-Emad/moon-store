export default function ErrorMsg({ msg }) {
  return (
    <div className="w-screen h-screen bg-red-50 flex items-center">
      <div className="p-4">
        <p className="text-red-800 font-medium">Error:</p>
        <p className="text-red-600 mt-1">{msg || "Something went wrong"}</p>
      </div>
    </div>
  );
}
