import StaffCardLong from "./(site)/components/StaffCardLong";
import StaffCardShort from "./(site)/components/StaffCardShort";

const data = {
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
  staff: [
    {
      namaLengkap: "Sundaymorning Okinawa",
      nim: "135182165",
    },
  ],
};

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center mt-12">
      {/* <h1 className="text-green-500 text-7xl mr-20">HELLO</h1> */}
      <StaffCardShort
        namaLengkap="Rava Maulana"
        nim="13521149"
        jabatan="Ketua Divisi"
        divisi="IT"
        yunani="Poseidon"
      />

      <div className="my-16">
        <StaffCardLong {...data} />
      </div>
    </div>
  );
}
