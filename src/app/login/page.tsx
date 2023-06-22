"use client";
import React from 'react'
import Image from 'next/image'
import TextFields from '@/components/TextFields'
import Button from '@/components/Button';

const Login = () => {
  return (
    <>
    <div className='relative overflow-hidden max-h-screen'>
       <div className='absolute top-0 z-30 bg-red-600 w-screen' >
        Navbar
       </div>
        <div className="hidden sm:block overflow-hidden min-h-screen bg-[url('/images/landing/HeroBackground.svg')] bg-no-repeat bg-center bg-cover ">
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
        <div className='min-h-full sm:w-1/2 bg-white sm:absolute sm:z-20 sm:top-0 sm:right-0 sm:flex sm:flex-row'>
        <div className="hidden sm:block bg-repeat-y w-8 bg-center mx-0 bg-[url('/images/landing/Border.svg')]"></div>
        <div className='sm:flex-auto flex flex-col pt-12 min-w-screen min-h-screen'>
            <div className='flex items-center justify-center gap-4 mx-4'>
                <Image
                    alt="mountain"
                    src="/images/landing/Sling.svg"
                    width={100}
                    height={100}
                />
                <h2 className='text-primary-400'>Login</h2>
                <Image
                    alt="mountain"
                    src="/images/landing/Sling.svg"
                    width={100}
                    height={100}
                    className='transform rotate-180'
                />
            </div>
            <div className='flex flex-col items-center justify-center gap-4 mx-12 mt-12 sm:mt-36'>
                <form className='flex flex-col gap-4 items-center'>
                    <TextFields
                        placeholder="Email"
                        width="150%"
                        height="50px"
                        value=''
                        onChange={() => {}}
                    />
                    <TextFields
                        placeholder="Password"
                        type='password'
                        width="150%"
                        height="50px"
                        value=''
                        onChange={() => {}}
                    />
                    <Button
                        text="Login"
                        isPrimary={true}
                        type="submit"
                        onClick={() => {}}
                    />
                </form>
                <div className='flex flex-col items-center justify-center'>
                    <p className='body-1 text-center  sm:w-2/3'>Silakan cek email Anda untuk mendapatkan <span className='text-primary-400'>username</span> dan <span className='text-primary-400'>password</span></p>
                    
                </div>
            </div>
            <div className='order-last flex-auto relative'>
                    <Image
                        alt="mountain"
                        src="/images/landing/Union.svg"
                        width={100}
                        height={100}
                        className='absolute bottom-0 left-0 translate-x-[-45%] translate-y-[5%]  w-1/2'
                    />
                    <Image
                        alt="mountain"
                        src="/images/landing/Union.svg"
                        width={100}
                        height={100}
                        className='absolute bottom-0 right-0 scale-x-[-1] translate-x-[45%] translate-y-[5%] w-1/2'
                    />
                </div>
        </div>
        </div>

    </div>
    </>
  )
}

export default Login