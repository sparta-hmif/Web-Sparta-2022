import { IconContext } from "react-icons";
import { BsCaretDownFill } from "react-icons/bs";

interface RankMarkerProps {
  width: number;
  height: number;
}

const RankMarker = ({ width, height }: RankMarkerProps) => {
  return (
    <div className="">
      <div
        className="relative flex justify-center items-center bg-primaryDark-400 text-white font-bold font-sen text-[10px] rounded-md"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        YOU
        <div className="absolute top-4">
          <IconContext.Provider
            value={{ size: `${height}px`, color: "#661E29" }}
          >
            <BsCaretDownFill />
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default RankMarker;
