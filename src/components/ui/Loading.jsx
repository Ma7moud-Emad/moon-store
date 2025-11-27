import Spinner from "./Spinner";

export default function Loading() {
  return (
    <div className="absolute top-0 left-0 z-50 min-w-full min-h-screen flex items-center justify-center bg-white">
      <Spinner width="100" height="100" strokeWidth="3" color="#c69b7b " />
    </div>
  );
}
