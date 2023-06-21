import React from 'react'
import Image from 'next/image'

const Login = () => {
  return (
    <div>
        <div className=" overflow-hidden min-h-screen bg-[url('/images/landing/HeroBackground.svg')] bg-no-repeat bg-center bg-cover relative ">
            <Image
                alt="mountain"
                src="/images/landing/MountainHero.svg"
                width={200}
                height={200}
                className="absolute w-screen bottom-[5%] inset-x-0 -translate-y-[6%] z-10"
            />
            <Image
                alt="mountain"
                src="/images/landing/GroundHero.svg"
                width={400}
                height={400}
                className="absolute object-none sm:object-contain w-screen bottom-0 sm:translate-y-[20%] z-20"
            />
            <Image
                alt="mountain"
                src="/images/landing/CloudLeft.svg"
                width={100}
                height={100}
                className="absolute w-[800px] -left-10 sm:left-0"
            />
            <Image
                alt="mountain"
                src="/images/landing/Batu1.svg"
                width={100}
                height={100}
                className="absolute bottom-4 w-8/12 right-0 -z-10 translate-x-[50%]"
            />
            <Image
                alt="mountain"
                src="/images/landing/BatuKiriCrop.svg"
                width={100}
                height={100}
                className="absolute bottom-0 w-1/2 z-20 left-0 translate-y-[10%] "
            />
            <Image
                alt="mountain"
                src="/images/landing/Logo.svg"
                width={100}
                height={100}
                className="absolute bottom-0 w-1/4 z-30 left-0 top-1/3 translate-x-[50%] translate-y-[10%] "
            />
            <Image
                alt="mountain"
                src="/images/landing/SelamatDatang.svg"
                width={100}
                height={100}
                className="absolute bottom-0 w-1/4 z-30 left-0 top-1/4 translate-x-[50%]"
            />
        </div>
    </div>
  )
}

export default Login