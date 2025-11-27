import { useNavigate } from "react-router-dom";
import BreButton from "./BreButton";

export default function EmptyBox({ title, description, btnName, navigation }) {
  const navigate = useNavigate();
  return (
    <div className="mt-20 h-[60vh] md:h-[40vh] text-center flex justify-center items-center">
      <div>
        <h1 className="font-bold text-3xl text-neutral-800 mb-4 capitalize">
          {title}
        </h1>
        <p className="w-2/3 mx-auto text-neutral-600">{description}</p>
        <BreButton
          title={`${btnName}`}
          addCalsses="mx-auto mt-4 bg-light-brown text-white border-0"
          clickedFun={() => navigate(`/${navigation}`)}
        />
      </div>
    </div>
  );
}
