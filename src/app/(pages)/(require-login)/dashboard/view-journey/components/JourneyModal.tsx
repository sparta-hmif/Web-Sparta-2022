import { FaStar } from "react-icons/fa";
import Button from "@/components/Button";

export interface JourneyModalProps {
  name: string;
  nim: string;
  rating: number;
  story: string;
  reflection: string;
}

const JourneyModal = ({
  name,
  nim,
  rating,
  story,
  reflection,
  onClose,
}: JourneyModalProps & { onClose: () => void }) => {
  const StarElement = ({ star }: { star: number }) => {
    return (
      <div className="flex gap-1">
        {[...Array(star)].map((_, index) => (
          <FaStar
            key={index}
            className="text-primary-400 text-xl md:text-2xl"
          />
        ))}
        {[...Array(5 - star)].map((_, index) => (
          <FaStar
            key={index}
            className="text-primaryLight-700 text-xl md:text-2xl"
          />
        ))}
      </div>
    );
  };
  return (
    <div className="fixed z-50 h-screen top-0 inset-x-0 bg-neutral-800/70 backdrop-blur-[2px]">
      <div className="w-full h-full relative flex justify-center items-center">
        <div className="w-11/12 h-[90%] max-w-[43rem] bg-white border-4 border-primaryDark-400 rounded-xl px-5 md:px-10 py-7 items-center flex flex-col justify-between gap-3">
          <div className="flex flex-col items-center relative">
            <h2 className="text-primaryDark-400 text-5xl md:text-7xl text-center truncate">
              {name}
            </h2>
            <h5 className="text-primaryDark-400 font-bold bg-white relative">
              {nim}
            </h5>
          </div>
          <div className="w-full max-w-[21rem] drop-shadow-lg rounded-2xl bg-white flex py-3 px-5 justify-center items-center gap-2">
            <StarElement star={rating} />
          </div>
          <div className="h-[60%] w-full flex flex-col mt-5">
            <h3 className="text-xl">What Spartan Did</h3>
            <div className="flex-1 overflow-auto">
              <p>{story}</p>
            </div>
            <h3 className="text-xl">Spartan{"'"}s Reflection</h3>
            <div className="flex-1 overflow-auto ">
              <p>{reflection}</p>
            </div>
          </div>
          <div className="flex w-full items-center justify-center">
            <Button text="Close" isPrimary={true} onClick={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JourneyModal;
