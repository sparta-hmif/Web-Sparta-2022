import Link from "next/link";

const Footer = () => {
  return (
    <div className="relative w-screen h-fit flex flex-row justify-between items-center px-[5%] gap-[5%] pt-[50px] lg:pt-[120px]">
      <img
        src="/images/footer/FooterBackground.svg"
        alt="Footer"
        className="absolute top-0 left-0 w-full object-cover -z-10 select-none"
      />

      <img
        src="/images/footer/Logo.svg"
        alt="Sparta"
        className="w-[220px] h-auto pb-8"
      />
      <div className="flex flex-col lg:flex-row font-sen text-h6 xl:text-h5 text-white gap-[20%] justify-center items-center w-full">
        <Link href="/">Home</Link>
        <Link href="/scoreboard">Scoreboard</Link>
        <Link href="/gallery">Gallery</Link>
      </div>
      <img
        src="/images/landing/HMIF.svg"
        alt="HMIF"
        className="w-[220px] h-auto"
      />
    </div>
  );
};

export default Footer;
