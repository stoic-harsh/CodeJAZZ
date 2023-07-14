"use client"

import { v4 as uuidV4 } from "uuid";

import { Shizuru, Inter } from "next/font/google";

import { useState } from "react";

import AlertToast from "@/components/Toast/AlertToast";

const shizuru = Shizuru({
    subsets: ["latin"],
    weight: "400"
});

const inter = Inter({
    subsets: ["latin"]
})

const Home = ()=>{

    const [room_id, set_room_id] = useState("");
    const [userName, setUserName] = useState("");
    const [open, setOpen] = useState(false);
    const [color, setColor] = useState("success");
    const [message, setMessage] = useState("Message");


    const createNewRoom = ()=>{
        const id = uuidV4();
        set_room_id(id);

        setColor("success");
        setMessage("New room is ready");
        setOpen(true);
    }

    return <div className="w-[100vw] h-[100vh] overflow-hidden theme flex flex-col">
        
        {/* Logo */}
        <div className="text-white flex items-center mt-3 ml-4 sm:mt-6 sm:ml-9">
            <img className="w-[45px] mr-3" src="/logo.png" alt="logo_CodeJAZZ"/>
            <div className="bg-white w-[0.5px] h-[65px]"/>
            <div className={`${shizuru.className} ml-3 flex flex-col`}>
                <span className="text-[28px]">Code</span>
                <span className="ml-6 text-[25px] font-extrabold">JA<span className="text-yellow-300">Z</span><span className="text-orange-500">Z</span></span>
            </div>
        </div>

        {/* Login Form */}
        <div className="my-[80px] sm:my-[60px] w-[100vw] flex justify-center items-center text-[18px]">
            
            <div className="mx-[20px] w-[450px] text-white p-4 md:p-6 flex flex-col bg-[rgba(255,255,255,0.17)] md:bg-[rgba(255,255,255,0.07)] border-[rgba(255,255,255,0.1)] rounded-md border">
            
            <div className={`${shizuru.className} m-auto text-[33px] mb-[1px]`} style={{ wordSpacing: "-25px" }}>Code JA<span className="text-yellow-300">Z</span><span className="text-orange-500">Z</span></div>
            <div className={`${inter.className} m-auto text-[12px] text-teal-500`} style={{ fontWeight: "900" }}>Real-Time Code Collaboration</div>
            <div className="bg-[rgba(255,255,255,0.5)] h-[0.5px] mt-2 mb-6 " />

            <span className="text-[19px]">Paste Invitation ROOM ID</span>
            
            <input 
            className="my-3 rounded-md p-2 pl-4 text-slate-800" 
            type="text"
            placeholder="ROOM ID"     
            value={ room_id } 
            
            onInput={ (event)=>{
                set_room_id(event.target.value);
            } }
            />

            <input 
            className="my-3 rounded-md p-2 pl-4 text-slate-800" 
            type="text"
            placeholder="Enter username" 
            value ={ userName } 
            
            onInput={ (event)=>{
                setUserName(event.target.value);
            } }
            />

            <button className="button-animation self-end my-4 bg-green-600 max-w-fit px-4 py-[10px] rounded-lg"
            >Join Room</button>
            <span>If you don't have any invite, then create a <span className="cursor-pointer underline underline-offset-2 text-green-500" onClick={createNewRoom}>new room</span></span>
            </div>
        </div>


        {/* ALERT TOASTS */}
        <AlertToast open={open} message={message} color={color} setOpen={setOpen} />
    </div>
}

export default Home;