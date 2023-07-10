import Button from "../Button";

const EditKasuh = () => {
  return (
    <>
      <div className="pt-24 w-full px-7 lg:px-48 flex flex-col items-center gap-2">
        <p className="sub-1">Halo Calon Kasuh!</p>
        <p className="body- text-center">
          Silakan ceritakan tentang dirimu untuk memikat para SPARTANS! Kamu
          dianjurkan untuk menuliskan{" "}
          <span className="font-semibold">perkenalan singkat</span> tentang
          dirimu, beserta dengan{" "}
          <span className="font-semibold">
            hobi, MBTI, interest (lingkup HMIF atau luar),
          </span>{" "}
          dan <span className="font-semibold">domisili</span>. Inilah ajang
          untukmu memperkenalkan dirimu dengan semenarik mungkin. Ingat ya,
          tidak boleh menyinggung SARA. Selamat memikat para SPARTANS!
        </p>
      </div>
      <h5 className="mt-12 px-7 lg:px-48 text-primaryDark-400">Deskripsi</h5>
      <div className="mt-2 w-full px-7 lg:px-48 flex items-center">
        <textarea
          className="w-full rounded-lg h-72 bg-primaryLight-400 text-secondaryDark-400 p-4"
          placeholder="Description"
        ></textarea>
      </div>
      <div className="mt-2 w-full flex px-7 lg:px-48 justify-end mb-20">
        <div className="w-32 h-11">
          <Button isPrimary={true} text={"Save"} type = {"button"}/>{" "}
        </div>
      </div>
    </>
  );
};

export default EditKasuh;
