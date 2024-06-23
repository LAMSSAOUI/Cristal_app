import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import { useRouter } from 'next/router';

const index = () => {
    const router = useRouter();
    const [path , setPath] = useState('')

    const handleAppliquerClick = () => {
        router.push(`/${path}`); // Replace with your actual supprimer page URL
      };
  return (
    <div>
        <header className='sticky top-0 z-50'><Navbar /></header>
        <div class="flex  w-screen items-center justify-center bg-gray-100 p-5">
            <div class="flex w-[36rem] flex-col rounded-2xl bg-white px-6 shadow-2xl sm:px-14">
                <div class="flex w-full justify-between self-start pt-12 pb-8">
                <h2 class="font-serif text-2xl font-semibold text-gray-700">Choose what you want</h2>
                </div>
                <div class="flex w-full flex-col pb-8 pt-4">
                <div class="relative mb-4">
                    <input class="peer hidden" id="radio_1" type="radio" name="radio" onClick={() => setPath('supprimer')}  />
                    <span class="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-gray-900"></span>
                    <label class="flex cursor-pointer flex-col rounded-2xl border border-gray-300 bg-slate-100/80 p-4 pr-8 sm:pr-16" for="radio_1">
                    <span class="mb-2 text-lg font-semibold">Supprimer</span>
                      <p class="text-sm sm:text-base">Si vous avez cliquer sur Supprimer vous allez supprimer la demande</p>
                    </label>
                </div>
                <div class="relative mb-4">
                    <input class="peer hidden" id="radio_2" type="radio" name="radio"  onClick={() => setPath('modifier')}/>
                    <span class="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-gray-900"></span>
                    <label class="flex cursor-pointer flex-col rounded-2xl border border-gray-300 bg-slate-100/80 p-4 pr-8 sm:pr-16" for="radio_2">
                    <span class="mb-2 text-lg font-semibold">Modifier</span>
                     <p class="text-sm sm:text-base">Si vous avez cliquer sur Modifier vous allez modifier la demande</p>
                    </label>
                </div>
                <div class="my-4 space-y-3">
                    <label for="terms" class="flex space-x-4">
                    <input id="terms" name="terms" type="checkbox" class="h-6 w-6 shrink-0 accent-gray-900" checked />
                    <span id="terms-description" class="text-sm text-gray-600">I agree to the <a class="underline" href="#">Terms and Conditions</a>. Learn about our Privacy Policy and our measures to keep your data safe and secure.</span>
                    </label>     
                </div>

                <button class="my-2 rounded-md bg-gray-900 py-3 font-medium text-white" onClick={handleAppliquerClick}>Appliquer</button>
                </div>
            </div>
        </div>

    </div>
  )
}

export default index