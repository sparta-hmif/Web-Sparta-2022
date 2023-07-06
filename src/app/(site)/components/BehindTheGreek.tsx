import Image from "next/image";

// Component imports
import Carousel from "./Carousel";
import CarouselSekjen from "./CarouselSekjen";

const BehindTheGreek = async () => {
  // Fetch zeus data
  const resZeus = await fetch("http://localhost:3000/api/panitia/ketua");
  const dataZeus = await resZeus.json();
  console.log(dataZeus);

  // Fetch konseptor data
  const resKonseptor = await fetch(
    "https://www.sparta22hmif.com/api/panitia/konseptor"
  );
  const dataKonseptor = await resKonseptor.json();

  // Fetch mamet data
  const resMamet = await fetch("http://localhost:3000/api/panitia/mamet");
  const dataMamet = await resMamet.json();

  // Fetch lapangan data
  const resLapangan = await fetch("http://localhost:3000/api/panitia/lapangan");
  const dataLapangan = await resLapangan.json();

  // Fetch pensuasanaan data
  const resPensuasanaan = await fetch(
    "https://www.sparta22hmif.com/api/panitia/pensuasanaan"
  );
  const dataPensuasanaan = await resPensuasanaan.json();

  // Fetch operasional data
  const resOperasional = await fetch(
    "https://www.sparta22hmif.com/api/panitia/operasional"
  );
  const dataOperasional = await resOperasional.json();

  // Fetch kesekjenan data
  const resKesekjenan = await fetch(
    "http://localhost:3000/api/panitia/kesekjenan"
  );
  const dataKesekjenan = await resKesekjenan.json();

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

        <div className="w-full mt-[200px]">
          <Carousel {...dataMamet} bidang="materi dan metode" />
        </div>

        <div className="w-full mt-[200px]">
          <Carousel {...dataKonseptor} bidang="konseptor" />
        </div>

        <div className="w-full mt-[200px]">
          <Carousel {...dataLapangan} bidang="lapangan" />
        </div>

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
