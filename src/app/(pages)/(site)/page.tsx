import Navbar from "@/components/Navbar";
import About from "./components/About";
import BehindTheGreek from "./components/BehindTheGreek";
import Hero from "./components/Hero";
import ProfilKasuh from "../../../components/profil-kasuh/ProfilKasuh"

export default function Home() {
  return (
    <div>
      {/* <Hero />
      <About />
      <BehindTheGreek /> */}
      <ProfilKasuh/>
    </div>
  );
}
