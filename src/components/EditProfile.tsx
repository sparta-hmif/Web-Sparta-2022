import Button from "./Button";
import FileInput from "./FileInput";
import TextFields from "./TextFields";

const EditProfile = () => {
  return (
    <div className=" my-24 lg:mx-[90px] pt-2 flex pb-72">
      <div className="">
        <div className="pict h-[292px] w-[292px] bg-slate-300">
          <div className="relative top-[256px] left-[256px]">
            <FileInput type="image" />
          </div>
        </div>
      </div>
      <div className="  w-full pl-[100px]">
        <h5 className=" text-h5 font-sen font-bold mb-5">Basic Info</h5>
        <form action="">
          <div className="flex flex-col gap-6 mb-11">
            <TextFields placeholder="Email" type="email" />
            <TextFields placeholder="Nama Lengkap" />
            <TextFields placeholder="Nama Panggilan" />
            <TextFields placeholder="Instagram" />
          </div>
          <h5 className=" text-h5 font-sen font-bold mb-5">Security</h5>
          <div className="flex flex-col gap-6 mb-6">
            <TextFields placeholder="New Password" type="password" />
            <TextFields placeholder="Re-enter new password" type="password" />
          </div>
          <div className="flex gap-10  justify-end">
            <Button isPrimary={false} text="Cancel" />
            <Button isPrimary={true} text="Save" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
