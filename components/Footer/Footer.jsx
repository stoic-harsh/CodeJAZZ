import { Abel, Edu_TAS_Beginner } from "next/font/google"

const abel = Abel({
    subsets: ["latin"],
    weight: "400"
})

const edu_tass = Edu_TAS_Beginner({
    subsets: ['latin']
})


export default function Footer() {

    return <div className="bg-black text-white flex flex-col sm:flex-row items-center justify-center w-[100vw] bottom-0 py-4">

        <div className={`${abel.className} text-gray-300 text-[20px] flex flex-col items-center `}>
            Supported by
            <img src="/logo.png" alt="logo_CodeJAZZ" className="w-[70px] sm:w-[80px]" />

            <div className={edu_tass.className}>
                Code JAZZ @Next.js
            </div>
        </div>

        <div className="h-[1px] w-2/3 sm:w-[1px] sm:h-[100px] bg-white mt-2 mb-3 sm:my-0 sm:mx-[50px] md:mx-[100px]" />

        <div className="flex flex-col mb-1 items-center">

            <div className='text-gray-300'>
                Made with respect 🫡 by stoic-harsh
            </div>
            
            <div className="">
                <span className="cursor-pointer">Privacy Policy</span> | <span className="cursor-pointer">Terms of Service</span>
            </div>
        </div>
                


    </div>
}