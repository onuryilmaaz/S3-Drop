import React from 'react'
import Constant from '../utils/Constant'
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";


function Hero() {
  return (
    <section className="bg-gray-50">
  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-5xl font-extrabold sm:text-7xl text-black" >
        <span>Dosyalarınızı tek bir yerden</span> <span className='text-primary'>Yükleyin, Kaydedin</span> ve kolayca <span className='text-primary'>İndirin</span>
      </h1>

      <p className="mt-4 sm:text-xl/relaxed text-gray-500">
        {Constant.desc}
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
            href="/auth/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-900 md:text-base"
          >
            <span>Giriş Yap</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>

      </div>
    </div>
  </div>
</section>
  )
}

export default Hero
