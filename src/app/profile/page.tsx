import Background from "./components/Background";
import ProfileDetail from "./components/ProfileDetail";
import PersonProfile from "./components/ProfileDetail";

export default function Home() {
  return (
    <>
      <div className="absolute z-0 flex items-center justify-center flex-col w-screen h-screen">
        <h1 className="font-koulen bg-gradient-to-b from-white to-[#D39947] text-transparent bg-clip-text hidden sm:block">
          PROFILE
        </h1>
        <ProfileDetail />
      </div>
      <div className="relative z-[-100]">
        <Background />
      </div>
    </>
  );
}

// TODO :
// TAnggal lahir masih salah
