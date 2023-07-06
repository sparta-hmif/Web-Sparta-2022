"use client";

import Image from "next/image";
import useSWR from "swr";
import fetcher from "@/app/lib/fetcher";

// Component imports
import Carousel from "./Carousel";
import CarouselSekjen from "./CarouselSekjen";

const BehindTheGreek = async () => {
  // Fetch zeus data
  const { data: dataZeus, isLoading: ketuaLoading } = useSWR(
    "https://sparta22hmif.com/api/panitia/ketua",
    fetcher
  );

  // Fetch konseptor data
  const { data: dataKonseptor, isLoading: konseptorLoading } = useSWR(
    "https://sparta22hmif.com/api/panitia/konseptor",
    fetcher
  );

  // Fetch mamet data
  const { data: dataMamet } = useSWR(
    "https://sparta22hmif.com/api/panitia/mamet",
    fetcher
  );

  // Fetch lapangan data
  const { data: dataLapangan } = useSWR(
    "https://sparta22hmif.com/api/panitia/lapangan",
    fetcher
  );

  // Fetch pensuasanaan data
  const { data: dataPensuasanaan, isLoading: pensuLoading } = useSWR(
    "https://sparta22hmif.com/api/panitia/pensuasanaan",
    fetcher
  );

  // Fetch operasional data
  const { data: dataOperasional, isLoading: operasionalLoading } = useSWR(
    "https://sparta22hmif.com/api/panitia/operasional",
    fetcher
  );

  // Fetch kesekjenan data
  const { data: dataKesekjenan, isLoading: sekjenLoading } = useSWR(
    "https://sparta22hmif.com/api/panitia/kesekjenan",
    fetcher
  );

  if (
    ketuaLoading ||
    konseptorLoading ||
    pensuLoading ||
    operasionalLoading ||
    sekjenLoading
  )
    return <div></div>;

  return (
    <div className="bg-gradient-to-b from-[#CA8E46] to-[#6F332E] relative h-[300rem] bg-no-repeat bg-cover bg-top">
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
        className="absolute w-full max-w-[80rem] top-[35%] right-0"
        priority={true}
      />
      <Image
        alt="background"
        src="/images/landing/Bulan.svg"
        width={100}
        height={100}
        className="absolute w-1/2 max-w-[40rem] top-[45%] left-0"
        priority={true}
      />
      <Image
        alt="background"
        src="/images/landing/CloudLeft.svg"
        width={100}
        height={100}
        className="absolute w-full max-w-[50rem] top-[65%] left-0"
        priority={true}
      />
      <Image
        alt="background"
        src="/images/landing/CloudRight.svg"
        width={100}
        height={100}
        className="absolute w-full max-w-[50rem] top-[75%] right-0"
        priority={true}
      />

      <div className="text-center pt-[30%] w-full">
        <Image
          alt="background"
          src="/images/landing/BehindTheGreek.svg"
          width={100}
          height={100}
          className="mx-auto min-w-[20rem] w-5/12"
          priority={true}
        />

        <div className="w-full mt-[90px]">
          <Carousel kabid={dataZeus.ketua} divisiList={[]} bidang="ketua" />
        </div>

        <div className="w-full mt-[200px]">
          <CarouselSekjen {...dataKesekjenan} bidang="kesekjenan" />
        </div>
        {/* 
        <div className="w-full mt-[200px]">
          <Carousel {...dataMamet} bidang="materi dan metode" />
        </div> */}

        <div className="w-full mt-[200px]">
          <Carousel {...dataKonseptor} bidang="konseptor" />
        </div>

        {/* <div className="w-full mt-[200px]">
          <Carousel {...dataLapangan} bidang="lapangan" />
        </div> */}

        <div className="w-full mt-[200px]">
          <Carousel {...dataPensuasanaan} bidang="pensuasanaan" />
        </div>

        <div className="w-full mt-[200px]">
          <Carousel {...dataOperasional} bidang="operasional" />
        </div>
      </div>
    </div>
  );
};

export default BehindTheGreek;
