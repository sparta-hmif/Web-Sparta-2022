import Link from "next/link";
import CardList, { KasuhProps } from "./components/CardList";
import { FaChevronLeft } from "react-icons/fa";

const pilihan: KasuhProps[] = [
  { rank: 1, nama: "Nama Kakak 1", nim: "13518201", kuota: 3, image: "" },
  { rank: 2, nama: "Nama Kakak 2", nim: "13518202", kuota: 4, image: "" },
  { rank: 3, nama: "Nama Kakak 3", nim: "13518203", kuota: 5, image: "" },
];

export default async function Page() {
  return (
    <div className="container mx-auto w-[87%] max-w-[65rem] py-10">
      <Link href="/kasuh">
        <div className="flex cursor-pointer items-center mb-3 gap-3">
          <FaChevronLeft size={20} className="text-primaryDark-400" />
          <p className="font-sen font-bold text-2xl text-primaryDark-400">
            Back
          </p>
        </div>
      </Link>
      <h2 className=" text-primaryDark-400 text-[40px] lg:text-6xl mt-10">
        PILIHANKU
      </h2>
      <p className=" body-1 text-sm md:text-lg">
        Kamu bisa mengurutkan prioritas pilihan kasuhmu di sini!
      </p>
      <div>
        <CardList pilihanKasuh={pilihan} />
      </div>
    </div>
  );
}
