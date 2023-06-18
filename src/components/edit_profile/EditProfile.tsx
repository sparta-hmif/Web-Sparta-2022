import TextField from "./TestTextField";

const EditProfile = () => {
  return (
    <div className=" my-24 lg:mx-[90px] pt-2 flex justify-between pb-72">
      <div className="">
        <div className=" h-[292px] w-[292px] bg-slate-300 "></div>
      </div>
      <div className=" bg-green-500 w-[70%] pl-[100px]">
        <h5 className=" text-h5 font-sen font-bold mb-5">Basic Info</h5>
        <form action="" className="flex flex-col">
          {/* <TextField
            name="email"
            placeholder="Email"
            type="email"
            style="pl-[19px] py-[13px] w-full rounded-[15px] placeholder:text-body-1 font-sen text-secondaryDark-200 mb-6 "
          />
          <TextField
            style="pl-[19px] py-[13px] w-full rounded-[15px] placeholder:text-body-1 font-sen text-secondaryDark-200 mb-6 "
            type="text"
            name="nama-lengkap"
            placeholder="Nama Lengkap"
          />
          <TextField
            style="pl-[19px] py-[13px] w-full rounded-[15px] placeholder:text-body-1 font-sen text-secondaryDark-200 mb-6 "
            type="text"
            name="nama-panggilan"
            placeholder="Nama Panggilan"
          />
          <TextField
            type="text"
            name="instagram"
            placeholder="Instagram"
            style=" pl-[19px] py-[13px] w-full rounded-[15px] placeholder:text-body-1 font-sen text-secondaryDark-200 "
          />
          <h5 className="text-h5 font-sen font-bold mb-5 mt-12">Security</h5>
          <TextField
            type="password"
            name="password"
            placeholder="New Password"
            style=" pl-[19px] py-[13px] w-full rounded-[15px] placeholder:text-body-1 font-sen text-secondaryDark-200 mb-6 "
          />
          <TextField
            type="password"
            name="password"
            placeholder="Re-enter new password"
            style=" pl-[19px] py-[13px] w-full rounded-[15px] placeholder:text-body-1 font-sen text-secondaryDark-200 mb-6 "
          /> */}
          <div className="flex  justify-end">
            <button
              type="button"
              className=" px-10 py-[15px] border-[3px] border-secondary-400 rounded-[15px] text-secondary-400 font-bold font-sen text-base mr-10"
            >
              Cancel
            </button>
            <button
              type="submit"
              className=" px-10 py-[15px] bg-secondary-400 rounded-[15px] text-white font-bold font-sen text-base"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
