import Navbar from "@/components/Navbar";
import About from "./components/About";
import BehindTheGreek from "./components/BehindTheGreek";
import Hero from "./components/Hero";
import PemilihanKasuh, {
  dataProp,
} from "@/components/pemilihan_kasuh/PemilihanKasuh";

export default function Home() {
  let mappedData: dataProp[] = [
    {
      name: "Sultan Alta Alvaro Valencia",
      kuota: 3,
      nim: 18221110,
      pendaftar: 1,
      image: "",
    },
    {
      name: "Ardhan Nur Urfan",
      kuota: 3,
      nim: 18221118,
      pendaftar: 1,
      image: "",
    },
    {
      name: "Komengsky",
      kuota: 3,
      nim: 18221000,
      pendaftar: 1,
      image: "",
    },
  ];

  return (
    <div>
      <PemilihanKasuh data={mappedData} />
    </div>
  );
}
