import Image from "next/image";

const About = () => {
  return (
    <div className="bg-gradient-to-b from-[#6C2932] to-[#5D242A] to-35% lg:to-50% pt-56 relative">
      <Image
        alt="mountain"
        src="/images/landing/Layer.svg"
        width={100}
        height={100}
        className="absolute w-full top-0 -translate-y-[96%] hidden"
        priority={true}
      />
      {/* <div className="absolute top-0 left-0 -translate-x-[50%] bg-pink-500 h-80">
        <Image
          alt="mountain"
          src="/images/landing/BatuKiri.svg"
          width={10}
          height={10}
          className="w-[120%] bottom-0"
        />
      </div> */}

      <Image
        alt="Batu"
        src="/images/landing/BatuBata.svg"
        width={200}
        height={200}
        className="absolute w-full left-0 top-[20%]"
        priority={true}
      />
      <div className="overflow-hidden absolute h-80 left-1/2 -translate-x-1/2 w-full top-0 -translate-y-[60%]">
        <div className="relative w-full max-w-[39rem] h-full mx-auto">
          <Image
            alt="mountain"
            src="/images/landing/Batu3.svg"
            width={100}
            height={100}
            className="absolute top-[10%] w-9/12 max-w-[40rem] right-0 translate-x-[100%]"
            priority={true}
          />
          <Image
            alt="mountain"
            src="/images/landing/Batu4.svg"
            width={100}
            height={100}
            className="absolute bottom-0 w-9/12 max-w-[40rem] left-0 -translate-x-[140%]"
            priority={true}
          />
          <Image
            alt="mountain"
            src="/images/landing/Batu5.svg"
            width={100}
            height={100}
            className="absolute bottom-[25%] lg:bottom-[10%] w-3/12 max-w-[40rem] left-0"
            priority={true}
          />
          <Image
            alt="mountain"
            src="/images/landing/Batu6.svg"
            width={100}
            height={100}
            className="absolute top-[25%] w-3/12 max-w-[40rem] left-0 -translate-x-full"
            priority={true}
          />
        </div>
      </div>

      <div className="container text-center mx-auto px-6 relative">
        <Image
          alt="about"
          src="/images/landing/About.svg"
          width={200}
          height={200}
          className="mx-auto w-5/12 min-w-[20rem]"
          priority={true}
        />
        <Image
          alt="about"
          src="/images/landing/HMIF.svg"
          width={200}
          height={200}
          className="mx-auto w-[17rem] lg:w-[23rem] mt-12 mb-10 border-[10px] border-primaryDark-400"
          priority={true}
        />
        <p className="text-primary-400 mt-5 lg:mt-10 mb-3 font-sen font-bold text-h6 lg:font-hammersmith lg:text-h4 lg:font-normal">
          Apa itu HMIF?
        </p>
        <p className="body-2 lg:body-1 text-white lg:px-32">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro quaerat
          atque eius distinctio debitis nulla corrupti autem, sed reprehenderit
          obcaecati consectetur nisi unde maxime qui mollitia fugit voluptate
          soluta quasi quibusdam dolorem sequi vel totam dolore quis. Iure quas
          aliquam dignissimos harum repellat recusandae reiciendis quibusdam,
          optio amet nesciunt debitis?
        </p>
        <div className="gap-5 grid grid-cols-2 lg:grid-cols-3 grid-flow-row lg:px-10 py-10 mt-10">
          <div className="col-span-2 lg:col-span-1 bg-[url('/images/landing/AboutSparta.svg')] rounded-lg h-[13rem] lg:h-[19rem] bg-cover bg-center bg-no-repeat py-5 lg:py-7 px-5 lg:px-10 text-primaryDark-400 text-start">
            <p className="font-sen font-bold text-h6 lg:font-hammersmith lg:text-h4 lg:font-normal">
              Apa itu SPARTA?
            </p>
            <p className="caption lg:body-1">
              SPARTA (Simulasi dan Pelatihan Keorganisasian Untuk Anggota)
              adalah kaderisasi tahap awal pada rangkaian masa orientasi anggota
              baru Himpunan Mahasiswa Informatika ITB.
            </p>
          </div>
          <div className="rounded-lg lg:row-start-2 lg:row-span-2 bg-[url('/images/landing/AboutPlaceholder.jpg')] row-span-1 h-[12rem] lg:h-[38rem] bg-cover bg-no-repeat"></div>
          <div className="rounded-lg lg:row-span-2 bg-[url('/images/landing/AboutPlaceholder.jpg')] row-span-1 h-[12rem] lg:h-[38rem] bg-cover bg-no-repeat"></div>
          <div className="col-span-2 lg:col-span-1 lg:row-span-3 bg-[url('/images/landing/VisiMisi.svg')] pb-10 rounded-lg bg-no-repeat bg-cover px-10 text-primaryDark-400 text-start">
            <Image
              alt="about"
              src="/images/landing/Helmet.svg"
              width={200}
              height={200}
              className="mx-auto w-4/12 my-8 lg:my-16"
              priority={true}
            />
            <p className="font-sen font-bold text-h6 lg:font-hammersmith lg:text-h4 lg:font-normal">
              VISI
            </p>
            <p className="caption lg:body-1 mb-4 lg:mb-8">
              Mewujudkan SPARTA HMIF ITB 2021 sebagai penanam kesadaran urgensi
              berhimpun dalam mencapai tujuan HMIF ITB dan kebutuhan anggotanya.
            </p>
            <p className="font-sen font-bold text-h6 lg:font-hammersmith lg:text-h4 lg:font-normal">
              MISI
            </p>
            <ul className="caption lg:body-1 list-decimal pl-5">
              <li>Membangun rasa kekeluargaan dan empati warga HMIF ITB</li>
              <li>
                Mengenalkan HMIF ITB sekaligus memantik dan menanamkan kesadaran
                urgensi berhimpun di HMIF ITB
              </li>
              <li>
                Menumbuhkan sikap profesional dalam lingkungan akademik maupun
                nonakademik
              </li>
              <li>
                Mengembangkan keahlian keinformatikaan dan mengaplikasikannya
                untuk kebutuhan masyarakat
              </li>
              <li>
                Meningkatkan kemampuan pemecahan masalah dan pengambilan
                keputusan untuk memenuhi kebutuhan anggota HMIF ITB
              </li>
            </ul>
          </div>
          <div className="rounded-lg bg-white col-span-1 hidden lg:block bg-[url('/images/landing/AboutPlaceholder.jpg')] h-[19rem] bg-center bg-cover bg-no-repeat"></div>
        </div>
      </div>
    </div>
  );
};

export default About;
