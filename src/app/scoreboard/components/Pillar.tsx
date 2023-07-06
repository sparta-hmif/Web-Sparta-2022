import Image from "next/image";

interface PillarProps {
  name: string;
  nim: string;
  score: number;
  order: number;
  image?: string;
}

const Pillar: React.FC<PillarProps> = ({ name, nim, score, order, image }) => {
  const pillarPosition = () => {
    switch (order) {
      case 1:
        return "50%";
      case 2:
        return "83%";
      case 3:
        return "17%";
    }
  };
  return (
    <div
      className={`w-[32%] max-w-[16rem] flex flex-col items-center justify-center gap-4 absolute ${
        order === 1
          ? "bottom-1 md:-bottom-12 lg:bottom-8"
          : "-bottom-5 md:-bottom-24 lg:-bottom-7"
      } -translate-x-1/2`}
      style={{
        left: pillarPosition(),
      }}
    >
      <div className="py-2 px-1 flex flex-col items-center justify-around h-48 md:h-80 bg-white w-[95%] border-primaryDark-400 border-[3px] rounded-xl shadow-xl">
        <div className="w-1/2 aspect-square bg-gray-400 rounded-full relative">
          <div className="w-full h-full overflow-hidden rounded-full">
            <Image
              src={image || "/images/landing/placeholder.jpg"}
              alt="user"
              width={200}
              height={200}
              className="object-cover"
            />
          </div>
          <div className="font-koulen w-6/12 aspect-square rounded-full bg-[#CD9741] flex items-center justify-center text-lg md:text-3xl text-primaryDark-500 -bottom-2 -right-2 absolute">
            #{order}
          </div>
        </div>
        <div className="text-center">
          <p className="font-koulen text-lg lg:text-3xl md:text-2xl line-clamp-2 uppercase">
            {name}
          </p>
          <p className="font-sen text-xs md:text-lg font-light">{nim}</p>
        </div>
        <div className="shadow-[inset_5px_2px_7px_0_rgba(0,0,0,0.4)] px-4 md:px-8 py-1 text-center rounded-full bg-[#CD9741] text-primaryDark-500 font-koulen text-sm md:text-2xl">
          {score} PTS
        </div>
      </div>
      <Image
        src="/images/scoreboard/Pillar.svg"
        width={100}
        height={100}
        alt="Pillar"
        className="w-full"
      />
    </div>
  );
};

export default Pillar;
