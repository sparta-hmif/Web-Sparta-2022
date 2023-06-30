import Image from "next/image";
import Carousel from "./Carousel";

const operasional = {
  namaLengkap: "Fajar Maulana",
  nim: "13521080",
  jabatan: "Ketua Bidang",
  divisi: "Operasional",
  yunani: "Icarus",
};

const IT = {
  ketua: {
    namaLengkap: "Rava Maulana",
    nim: "13521149",
    jabatan: "Ketua Divisi",
    divisi: "IT",
    yunani: "Poseidon",
  },
  wakil: {
    namaLengkap: "Kevin Sebastian",
    nim: "18221143",
    jabatan: "Wakil Ketua Divisi",
    divisi: "IT",
    yunani: "Poseidon",
  },
  wakil_2: {
    namaLengkap: "Kevin Sebastian",
    nim: "18221143",
    jabatan: "Wakil Ketua Divisi",
    divisi: "IT",
    yunani: "Poseidon",
  },
  staff: [
    {
      namaLengkap: "Sunday Okinawa",
      nim: "135182165",
    },
    {
      namaLengkap: "Sunday Okinawa",
      nim: "135182165",
    },
    {
      namaLengkap: "Sunday Okinawa",
      nim: "135182165",
    },
    {
      namaLengkap: "Sunday Okinawa",
      nim: "135182165",
    },
    {
      namaLengkap: "Sunday Okinawa",
      nim: "135182165",
    },
    {
      namaLengkap: "Sunday Okinawa",
      nim: "135182165",
    },
    {
      namaLengkap: "Sunday Okinawa",
      nim: "135182165",
    },
    {
      namaLengkap: "Sunday Okinawa",
      nim: "135182165",
    },
    {
      namaLengkap: "Sunday Okinawa",
      nim: "135182165",
    },
    {
      namaLengkap: "Sunday Okinawa",
      nim: "135182165",
    },
  ],
};

const logistik = {
  ketua: {
    namaLengkap: "Ariel Jovananda",
    nim: "13521086",
    jabatan: "Ketua Divisi",
    divisi: "Logistik",
    yunani: "Hades",
  },
  wakil: {
    namaLengkap: "Raka Admiharfan",
    nim: "18221094",
    jabatan: "Wakil Ketua Divisi",
    divisi: "Logistik",
    yunani: "Hades",
  },
  staff: [
    {
      namaLengkap: "Sunday Okinawa",
      nim: "135182165",
    },
    {
      namaLengkap: "Sunday Okinawa",
      nim: "135182165",
    },
    {
      namaLengkap: "Sunday Okinawa",
      nim: "135182165",
    },
    {
      namaLengkap: "Sunday Okinawa",
      nim: "135182165",
    },
    {
      namaLengkap: "Sunday Okinawa",
      nim: "135182165",
    },
    {
      namaLengkap: "Sunday Okinawa",
      nim: "135182165",
    },
  ],
};

const data = {
  kabid: operasional,
  divisiList: [IT, logistik],
};

const BehindTheGreek = () => {
  return (
    <div className="bg-gradient-to-b from-[#CA8E46] to-[#5E252A] relative h-[400rem] bg-no-repeat bg-cover bg-top">
      <Image
        alt="background"
        src="/images/landing/CahayaPanitia.svg"
        width={100}
        height={100}
        className="absolute w-full top-0 "
      />
      <Image
        alt="background"
        src="/images/landing/Cobain.svg"
        width={100}
        height={100}
        className="absolute w-full top-0 -translate-y-[16%]"
      />
      <Image
        alt="background"
        src="/images/landing/AwanAtas.svg"
        width={100}
        height={100}
        className="absolute w-full max-w-[80rem] top-1/2 right-0"
      />
      <Image
        alt="background"
        src="/images/landing/Bulan.svg"
        width={100}
        height={100}
        className="absolute w-1/2 max-w-[40rem] top-[60%] left-0"
      />
      <Image
        alt="background"
        src="/images/landing/CloudLeft.svg"
        width={100}
        height={100}
        className="absolute w-full max-w-[60rem] top-[80%] left-0"
      />
      <Image
        alt="background"
        src="/images/landing/CloudRight.svg"
        width={100}
        height={100}
        className="absolute w-full max-w-[60rem] top-[85%] right-0"
      />
      {/* INI TADINYA ADA MX AUTO */}
      <div className="text-center pt-[30%] w-full">
        <Image
          alt="background"
          src="/images/landing/BehindTheGreek.svg"
          width={100}
          height={100}
          className="mx-auto min-w-[20rem] w-5/12"
        />

        {/* Masukinn ke sini rap kalo mau nyoba" */}
        <div className="w-full mt-16">
          <Carousel {...data} />
        </div>
      </div>
    </div>
  );
};

export default BehindTheGreek;
