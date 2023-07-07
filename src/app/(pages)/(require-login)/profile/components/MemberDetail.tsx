import Image from "next/image";

// Asset imports
import SpartaLogo from "@/../public/images/landing/sparta.png";

export interface MemberDetailProps {
  fullName?: string;
  nim?: string;
  imageURL?: string;
  shortName?: string;
}

const MemberDetail = ({
  fullName,
  nim,
  imageURL,
  shortName,
}: MemberDetailProps) => {
  return (
    <div className="flex flex-row gap-3 items-center justify-center">
      <div className="overflow-hidden rounded-full">
        <Image alt="Pict" src={imageURL || SpartaLogo} width={58} height={58} />
      </div>
      <div className="flex flex-col justify-center gap-0">
        <h6 className="font-koulen text-black">{shortName}</h6>
        <p className="font-sen font-bold text-black text-sub-2">{nim}</p>
      </div>
    </div>
  );
};

export default MemberDetail;
