import Card from "./component/Card";

const pilihan = [{
  id:1,
  nama: "Nama Kakak 1",
  nim: "13518201",
}, {
  id: 2,
  nama: "Nama Kakak 2",
  nim: "13518202",
  }, {
  id: 3,
  nama: "Nama Kakak 3",
  nim: "13518203",
}]
export default async function Home() {

  return (
    <div className="flex flex-col px-[1rem] py-[6rem] md:px-[10rem] gap-[3rem] text-[4rem] w-full">
      <div className="flex flex-col items-start justify-start gap-[0.5rem] text-left font-heading-2 font-koulen text-primaryDark-400 w-full">
        <div className="relative leading-[100%] uppercase flex items-start w-[100%]">
          Pilihanku
        </div>
        <div className="relative text-[1rem] font-button text-black text-sen inline-block">
          Kamu bisa mengurutkan prioritas pilihan kasuhmu di sini!
        </div>
      </div>
      <div className="items-center bg-primaryLight-400 w-full" />

      <Card/>
      <Card/>
      <Card/>
      <div className="relative w-[20%] items-end justify-end text-sub-1 text-white">
        <button className="rounded-lg bg-primary-400 hover:bg-primary-500 flex flex-row py-[1rem] px-[3rem] items-center justify-center">
          <b className="relative">Finalisasi</b>
        </button>
      </div>
    </div>
  );
}
