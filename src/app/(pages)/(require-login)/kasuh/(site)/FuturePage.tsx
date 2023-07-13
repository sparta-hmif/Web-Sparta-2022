import Button from "@/components/Button";
import PemilihanKasuh from "../components/PemilihanKasuh";
import { dataProp } from "../components/PemilihanKasuh";
import Link from "next/link";

const data: dataProp[] = [
  {
    nim: 13519001,
    name: "John Doe",
    kuota: 3,
    image: "",
  },
  {
    nim: 13519002,
    name: "Asep Doe",
    kuota: 3,
    image: "",
  },
  {
    nim: 13519003,
    name: "Budi Doe",
    kuota: 3,
    image: "",
  },
  {
    nim: 13519004,
    name: "Caca Doe",
    kuota: 3,
    image: "",
  },
  {
    nim: 13519005,
    name: "Dede Doe",
    kuota: 3,
    image: "",
  },
];

const Page = () => {
  return (
    <div className="container mx-auto w-[87%] max-w-[65rem] py-10 md:pt-32">
      <h2 className=" text-primaryDark-400 text-[40px] lg:text-6xl">
        Pemilihan Kakak Asuh (Kasuh)
      </h2>
      <p className=" body-1 text-sm md:text-lg">
        Berisi sekumpulan aa kasep dan neng geulis HMIF ITB 2021 yang akan
        memberikan warna di dunia perkuliahanmu! Silahkan pilih 3 calon kandidat
        kakak asuh yang kamu mau! #TakeKasuhOut
      </p>
      <Link href="/kasuh/edit">
        <div className=" my-5 w-full">
          <Button isPrimary={true} text="Pilihan Kakak Asuhku - 3/3" />
        </div>
      </Link>
      <PemilihanKasuh data={data} />
    </div>
  );
};

export default Page;
