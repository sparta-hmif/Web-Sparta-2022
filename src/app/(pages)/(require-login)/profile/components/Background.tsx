import Image from "next/image";

const Background = () => {
  return (
    <div className="overflow-hidden h-full w-full bg-[url('/images/landing/HeroBackground.svg')] bg-no-repeat bg-center bg-cover relative select-none">
      <div className="z-0">
        <Image
          alt="mountain"
          src="/images/landing/CloudLeft.svg"
          width={100}
          height={100}
          className="absolute w-[800px] left-0 top-1/3 md:-top-10"
        />
        <Image
          alt="mountain"
          src="/images/landing/CloudRight.svg"
          width={100}
          height={100}
          className="absolute w-[800px] -right-10 md:-top-10"
        />
        <Image
          alt="mountain"
          src="/images/landing/CloudLeft.svg"
          width={100}
          height={100}
          className="absolute w-[200px] bottom-[150px] right-0 scale-x-[-1] md:hidden"
        />
        <Image
          alt="mountain"
          src="/images/landing/CloudRight.svg"
          width={100}
          height={100}
          className="absolute w-[200px] bottom-[80px] left-0 scale-x-[-1] md:hidden"
        />
      </div>
      <div className="z-[1]">
        <Image
          alt="mountain"
          src="/images/landing/MountainHero.svg"
          width={200}
          height={200}
          className="absolute w-full bottom-[8%] inset-x-[0] scale-[1.05] lg:bottom-[13%]"
        />
        <Image
          alt="mountain"
          src="/images/landing/GroundHero.svg"
          width={400}
          height={400}
          className="absolute inset-x-[0] w-full bottom-0 2xl:-bottom-[16%]"
        />
      </div>
      <div className="z-[2]">
        <div className="absolute inset-x-[0] w-full bottom-0">
          <Image
            alt="mountain"
            src="/images/landing/Batu1.svg"
            width={100}
            height={100}
            className="absolute w-2/5 right-10 bottom-[70px]"
          />
          <Image
            alt="mountain"
            src="/images/landing/Batu2.svg"
            width={100}
            height={100}
            className="absolute w-1/6 bottom-10 left-[30%] translate-x-[-50%]"
          />
          <Image
            alt="mountain"
            src="/images/landing/Batu4.svg"
            width={100}
            height={100}
            className="absolute w-1/3 bottom-2 left-[10%] translate-x-[-85%]"
          />
          <Image
            alt="mountain"
            src="/images/landing/Batu5.svg"
            width={100}
            height={100}
            className="absolute w-1/6 bottom-2 right-[50%] translate-x-[50%]"
          />
          <Image
            alt="mountain"
            src="/images/landing/Batu3.svg"
            width={100}
            height={100}
            className="absolute w-1/3 bottom-5 right-[10%] translate-x-[90%]"
          />
        </div>
      </div>
    </div>
  );
};

export default Background;
