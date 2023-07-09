import Navbar from "@/components/Navbar";
import About from "./components/About";
import BehindTheGreek from "./components/BehindTheGreek";
import Hero from "./components/Hero";
import PemilihanDesuh from "@/components/pemilihan-desuh/PemilihanDesuh";

export default function Home() {
  return (
    <div>
      {/* <Hero />
      <About />
      <BehindTheGreek /> */}
      <PemilihanDesuh />
    </div>
  );
}
