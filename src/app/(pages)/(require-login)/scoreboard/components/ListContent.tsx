import Image from "next/image";

// Asset imports
import DefaultProfPic from "@/../public/images/landing/sparta.png";

interface ListContentProps {
  rank: number;
  name: string;
  nim: string;
  score: number;
  isUser?: boolean;
  image?: string;
}

const ListContent: React.FC<ListContentProps> = ({
  rank,
  name,
  nim,
  score,
  isUser,
  image,
}) => {
  return (
    <div
      className={`${
        isUser && "scale-[107%] md:scale-[103%]"
      } gap-2 px-3 md:px-10 w-11/12 border-4 border-primaryDark-400 rounded-xl py-1 md:py-2 flex items-center font-koulen text-primaryDark-400`}
    >
      <p className="w-[6%] text-base md:text-5xl">#{rank}</p>
      <div className="w-1/12 max-w-[5rem] aspect-square bg-primaryDark-400 rounded-full mx-0 md:mx-10 overflow-hidden relative">
        <Image
          src={image || DefaultProfPic}
          alt="user"
          fill={true}
          className="object-cover"
        />
      </div>
      <p className="text-base md:text-4xl line-clamp-1 flex-1">{name}</p>
      <div className="flex justify-center gap-2 ml-auto">
        <div className="border-[3px] md:border-4 border-primaryDark-400 py-1 px-1 lg:px-5 text-sm md:text-2xl rounded-md md:rounded-xl">
          {nim}
        </div>
        <div className="bg-primaryDark-400 py-1 px-2 lg:px-8 text-sm md:text-2xl rounded-md md:rounded-lg text-white flex items-center">
          {score} PTS
        </div>
      </div>
    </div>
  );
};

export default ListContent;
