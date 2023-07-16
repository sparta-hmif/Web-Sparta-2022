import Button from "../Button";
import Pagination from "../Pagination/Pagination";
import Countdown from "./components/Coundown";
import DesuhCard from "./components/DesuhCard";

const PemilihanDesuh = () => {
  const date = new Date("08/17/2023 23:59:59").getTime();

  return (
    <>
      <div className="px-7 py-[80px] lg:px-[208px] lg:py-[100px] w-full">
        <Countdown target={date} pemilihan="Desuh" />
        <div className="my-5 lg:my-[54px] flex flex-col lg:flex-row lg:justify-between lg:items-center">
          <div>
            <h2 className="text-primaryDark-400 text-[40px] lg:text-[64px]">
              Pemilihan Desuh{" "}
              <span className="hidden lg:inline">(Adek Asuh)</span>
            </h2>
            <p className="body-1 text-[10px] lg:text-[16px]">
              Silakan pilih adek asuh yang sesuai dengan kriteriamu ya~
            </p>
          </div>
          <div className="h-auto w-full mt-2 lg:w-40 lg:h-12">
            <Button
              isPrimary={true}
              text={"Pilihanku"}
              type="button"
              onClick={undefined}
            />
          </div>
        </div>
        <div className="mb-5 lg:mb-[54px]">
          <DesuhCard
            nama={"NAMA ADEK ASUH"}
            nim={"19222XXX"}
            alasan={
              "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium minima sapiente fugit unde tempora nisi ipsa saepe repellat et recusandae. Fugiat iusto labore mollitia exercitationem itaque, sint repudiandae maiores aliquid dolore aspernatur quasi adipisci officiis temporibus dignissimos inventore et commodi pariatur alias quibusdam earum magnam est expedita quia tempora? Eligendi vel corporis saepe facilis doloribus."
            }
            photoUrl={""}
          />
          <DesuhCard
            disable
            nama={"NAMA ADEK ASUH"}
            nim={"19222XXX"}
            alasan={
              "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium minima sapiente fugit unde tempora nisi ipsa saepe repellat et recusandae. Fugiat iusto labore mollitia exercitationem itaque, sint repudiandae maiores aliquid dolore aspernatur quasi adipisci officiis temporibus dignissimos inventore et commodi pariatur alias quibusdam earum magnam est expedita quia tempora? Eligendi vel corporis saepe facilis doloribus."
            }
            photoUrl={""}
          />
        </div>
        <Pagination totalDataCount={10} currentPage={1} pageSize={1} />
      </div>
    </>
  );
};

export default PemilihanDesuh;
