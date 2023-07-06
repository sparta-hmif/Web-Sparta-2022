import Image from "next/image";

interface MemberDetailProps {
  profile?: string;
  nama?: string;
  nim?: string;
}

const MemberDetail = ({
  profile,
  nama = "Nama Member",
  nim = "13518221",
}: MemberDetailProps) => {
  const defaultProfilePict = "/images/landing/placeholder.jpg";
  return (
    <div className="flex flex-row gap-3 items-center justify-center">
      <div className="overflow-hidden rounded-full">
        <Image
          alt="Pict"
          src={profile || defaultProfilePict}
          width={58}
          height={58}
        />
      </div>
      <div className="flex flex-col justify-center gap-0">
        <h6 className="font-koulen text-black">{nama}</h6>
        <p className="font-sen font-bold text-black text-sub-2">{nim}</p>
      </div>
    </div>
  );
};

export default MemberDetail;
