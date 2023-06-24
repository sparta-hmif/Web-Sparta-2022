import { IconContext } from "react-icons";
import { LuChevronDown } from "react-icons/lu";

const FilterButton = () => {
  return (
    <div
      className="flex border-[3px] border-primary-400 rounded-xl text-[12px] font-bold font-sen justify-center items-center px-4 gap-3 hover:cursor-pointer"
      onClick={() => {
        console.log("CLICKED!!");
      }}
    >
      <div className="text-primary-400">Filter</div>
      <div className="">
        <IconContext.Provider value={{ style: { fontSize: 18 } }}>
          <LuChevronDown color="#E6B93D" />
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default FilterButton;
