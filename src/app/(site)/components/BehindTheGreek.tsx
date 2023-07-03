import Image from "next/image";
import Carousel from "./Carousel";

const BehindTheGreek = async () => {
  const res = await fetch("http://localhost:3000/api/panitia/konseptor");
  const data = await res.json();

  return (
    <div className="bg-gradient-to-b from-[#CA8E46] to-[#5E252A] relative h-[400rem] bg-no-repeat bg-cover bg-top">
      <Image
        alt="background"
        src="/images/landing/CahayaPanitia.svg"
        width={100}
        height={100}
        className="absolute w-full top-0 "
        priority={true}
      />
      <Image
        alt="background"
        src="/images/landing/Cobain.svg"
        width={100}
        height={100}
        className="absolute w-full top-0 -translate-y-[16%]"
        priority={true}
      />
      <Image
        alt="background"
        src="/images/landing/AwanAtas.svg"
        width={100}
        height={100}
        className="absolute w-full max-w-[80rem] top-1/2 right-0"
        priority={true}
      />
      <Image
        alt="background"
        src="/images/landing/Bulan.svg"
        width={100}
        height={100}
        className="absolute w-1/2 max-w-[40rem] top-[60%] left-0"
        priority={true}
      />
      <Image
        alt="background"
        src="/images/landing/CloudLeft.svg"
        width={100}
        height={100}
        className="absolute w-full max-w-[60rem] top-[80%] left-0"
        priority={true}
      />
      <Image
        alt="background"
        src="/images/landing/CloudRight.svg"
        width={100}
        height={100}
        className="absolute w-full max-w-[60rem] top-[85%] right-0"
        priority={true}
      />
      {/* INI TADINYA ADA MX AUTO */}
      <div className="text-center pt-[30%] w-full">
        <Image
          alt="background"
          src="/images/landing/BehindTheGreek.svg"
          width={100}
          height={100}
          className="mx-auto min-w-[20rem] w-5/12"
          priority={true}
        />

        {/* Masukinn ke sini rap kalo mau nyoba" */}
        <div className="w-full mt-[220px]">
          <Carousel {...data} bidang="konseptor" />
        </div>

        <div className="w-full mt-[220px]">
          <Carousel {...data} bidang="konseptor" />
        </div>

        <div className="w-full mt-[220px]">
          <Carousel {...data} bidang="konseptor" />
        </div>

        <div className="w-full mt-[220px]">
          <Carousel {...data} bidang="konseptor" />
        </div>

        <div className="w-full mt-[220px]">
          <Carousel {...data} bidang="konseptor" />
        </div>

        <div className="w-full mt-[220px]">
          <Carousel {...data} bidang="konseptor" />
        </div>

        <div className="w-full mt-[220px]">
          <Carousel {...data} bidang="konseptor" />
        </div>
      </div>
    </div>
  );
};

export default BehindTheGreek;
