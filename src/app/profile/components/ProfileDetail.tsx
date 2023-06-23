import Image from "next/image";

interface ProfileDetailProps {
  profilePicture?: string;
}

const ProfileDetail = ({ profilePicture }: ProfileDetailProps) => {
  return (
    <div className="max-w-[818px] ">
      <Image
        alt="Profile Picture"
        src={
          profilePicture ? profilePicture : "/images/landing/placeholder.jpg"
        }
        width={240}
        height={319}
        className=""
      />
    </div>
  );
};

export default ProfileDetail;
