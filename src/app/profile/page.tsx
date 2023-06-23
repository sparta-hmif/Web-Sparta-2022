import Background from "./components/Background";
import ProfileDetail from "./components/ProfileDetail";
import PersonProfile from "./components/ProfileDetail";

export default function Home() {
  return (
    <>
      <div className="absolute z-0 flex items-center justify-center flex-col w-screen h-screen">
        <p className="font-koulen">PROFILE</p>
        <ProfileDetail />
      </div>
      <div className="relative z-[-100]">
        <Background />
      </div>
      {/* <div className="h-screen bg-slate-400"></div> */}
    </>
  );
}
