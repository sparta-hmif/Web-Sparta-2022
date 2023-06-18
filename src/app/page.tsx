import StaffCardShort from "./(site)/components/StaffCardShort";

export default function Home() {
  return (
    <div className="flex justify-center items-center mt-12">
      {/* <h1 className="text-green-500 text-7xl mr-20">HELLO</h1> */}
      <StaffCardShort
        namaLengkap="Rava Maulana"
        nim="13521149"
        jabatan="Ketua Divisi"
        divisi="IT"
        yunani="Poseidon"
      />
    </div>
  );
}
