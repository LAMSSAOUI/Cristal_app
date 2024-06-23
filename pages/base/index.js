import React from 'react'
import Navbar from '../../components/Navbar'

const index = () => {
  return (
    <div>
       <header className='sticky top-0 z-50'><Navbar /></header>
       <div class="w-screen mt-16">
          <div class="mx-auto grid max-w-screen-lg gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
            <div class="max-w-md rounded-lg border px-6 pt-6 pb-10">
              <div class="inline-block rounded-full border-8 border-emerald-50 bg-emerald-200 p-2 text-emerald-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="float-right h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
              <p class="text-sm font-medium text-gray-500">Nombre SAP demande</p>
              <p class="text-4xl font-medium text-gray-800">24,430</p>
              <span class="float-right rounded-full bg-rose-100 px-1 text-sm font-medium text-rose-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="inline h-4 w-4 pb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                </svg>
                3%</span
              >
            </div>

            <div class="max-w-md rounded-lg border px-6 pt-6 pb-10">
              <div class="inline-block rounded-full border-8 border-emerald-50 bg-emerald-200 p-2 text-emerald-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="float-right h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
              <p class="text-sm font-medium text-gray-500">Nombre SAGE demande</p>
              <p class="text-4xl font-medium text-gray-800">3,405</p>
              <span class="float-right rounded-full bg-emerald-100 px-1 text-sm font-medium text-emerald-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="inline h-4 w-4 pb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
                23%</span
              >
            </div>

            <div class="max-w-md rounded-lg border px-6 pt-6 pb-10">
              <div class="inline-block rounded-full border-8 border-emerald-50 bg-emerald-200 p-2 text-emerald-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="float-right h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
              <p class="text-sm font-medium text-gray-500">Nombre Total des demandes</p>
              <p class="text-4xl font-medium text-gray-800">405</p>
              <div class="float-right flex -space-x-2">
                <img class="h-7 w-7 rounded-full ring ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                <img class="h-7 w-7 rounded-full ring ring-white" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                <img class="h-7 w-7 rounded-full ring ring-white" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" />
                <img class="h-7 w-7 rounded-full ring ring-white" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                <div class="flex h-7 w-7 items-center justify-center rounded-full bg-gray-300 font-semibold text-white ring ring-white">+5</div>
              </div>
            </div>
          </div>
        </div>

    </div>
  )
}

export default index