import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="relative w-full grid grid-cols-2 grid-flow-row gap-2 py-10 md:pb-16 bg-pink-500 md:grid-cols-3 bg-[url('/images/footer/FooterBackground.svg')] bg-cover bg-center">
      {/* <Image
        width={1920}
        height={1080}
        src="/images/footer/FooterBackground.svg"
        alt="Footer"
        className="absolute top-0 left-0 w-full h-full object-cover -z-10 select-none"
      /> */}
      <div className="flex items-center h-full w-full justify-center py-5">
        <Image
          width={100}
          height={100}
          src="/images/footer/Logo.svg"
          alt="Sparta"
          className="w-3/4 max-w-[15rem] h-auto pb-4 md:pb-8"
        />
      </div>
      <div className="pb-5 col-span-2 md:col-span-1 col-start-1 row-start-1 md:col-start-2 flex flex-col lg:flex-row font-sen font-bold text-h6 xl:text-h5 text-white gap-10 justify-center items-center w-full">
        <Link href="/" className="hover:text-primary-400">Home</Link>
        <Link href="/scoreboard" className="hover:text-primary-400">Scoreboard</Link>
        <Link href="/journey" className="hover:text-primary-400">Journey</Link>
      </div>
      <div className="flex items-center h-full w-full justify-center py-5">
        <Image
          width={100}
          height={100}
          src="/images/landing/HMIF.svg"
          alt="HMIF"
          className="w-3/4 max-w-[15rem] h-auto"
        />
      </div>
    </div>
  );
};

export default Footer;
