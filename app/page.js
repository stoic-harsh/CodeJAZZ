"use client"

import { v4 as uuidV4 } from "uuid";
import { useRouter } from "next/navigation";

import { Shizuru, Inter } from "next/font/google";
import Footer from '@/components/Footer/Footer'


// ALERT MANAGEMENT
import { useContext, useState } from "react";
import { AlertContext } from "./layout";

// FONTS
const shizuru = Shizuru({
    subsets: ["latin"],
    weight: "400"
});

const inter = Inter({
    subsets: ["latin"]
});


import AblyHandler from "@/utils/Manage_Ably/Manage_Ably";
let channel;

const Home = ()=>{
    // ALERT MANAGEMENT
    const alertToast = useContext(AlertContext);

    // PROJECT STATES MANAGEMENT
    const [room_id, set_room_id] = useState("");
    const [userName, setUserName] = useState("");
    

    const handleCreateRoom = ()=>{
        const id = uuidV4();
        set_room_id(id);

        alertToast.setColor("success");
        alertToast.setAlert("New room is ready.");
        alertToast.setOpen(true);
    }

    
    const router = useRouter();
    const handleJoinRoom = ()=>{
        if(room_id === "" || userName === ""){
            alertToast.setColor("error");
            alertToast.setAlert("Enter Required Field");
            alertToast.setOpen(true);
            return ;
        }

        async function initAbly(){
            channel = await AblyHandler(room_id);
            channel.publish("JOIN", {id: room_id, userName});
        }

        initAbly();

        // async function handleAbly(){
        //     try{
        //         channel = await useChannel(room_id, rooms);
                
        //         alertToast.setColor("info");
        //         alertToast.setAlert("Real-Time Communication enabled");
        //         alertToast.setOpen(true);

        //         channel.publish("JOIN", userName);
        //     }catch(err){
        //         alertToast.setColor("warning");
        //         alertToast.setAlert(err.message);
        //         alertToast.setOpen(true);
        //     }
        // }
        // handleAbly();

        // router.push(`/editor/room/${room_id}`);
    }

    return <> 
    <div className="w-screen h-screen theme flex flex-col">
        
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
        <div className="my-[50px] sm:my-[60px] w-[100vw] flex justify-center items-center text-[18px]">
            
            <div className="mx-[20px] w-[450px] text-white p-4 md:p-6 flex flex-col bg-[rgba(255,255,255,0.17)] md:bg-[rgba(255,255,255,0.07)] border-[rgba(255,255,255,0.1)] rounded-md border">
            
            <div className={`${shizuru.className} m-auto text-[33px] mb-[1px]`} style={{ wordSpacing: "-25px" }}>Code JA<span className="text-yellow-300">Z</span><span className="text-orange-500">Z</span></div>
            <div className={`${inter.className} m-auto text-[12px] text-teal-500`} style={{ fontWeight: "900" }}>Real-Time Code Collaboration</div>
            <div className="bg-[rgba(255,255,255,0.5)] h-[0.5px] mt-2 mb-6 " />

            <span className="text-[19px]">Paste Invitation ROOM ID</span>
            
            <input 
            className=" outline-none my-3 rounded-md p-2 pl-4 text-slate-800" 
            placeholder="ROOM ID*"     
            value={ room_id } 
            
            onInput={ (event)=>{
                set_room_id(event.target.value.trim());
            } }
            />

            <input
            className="outline-none my-3 rounded-md p-2 pl-4 text-slate-800" 
            type="text"
            placeholder="Enter username*" 
            value ={ userName } 
            
            onInput={ (event)=>{
                setUserName(event.target.value.trim());
            } }
            />

            <button className="button-animation self-end my-4 bg-green-600 max-w-fit px-4 py-[10px] rounded-lg"
            onClick={ handleJoinRoom }>Join Room</button>
            <span>If you don't have any invite, then create a <span className="cursor-pointer underline underline-offset-2 text-green-500" onClick={handleCreateRoom}>new room</span></span>
            </div>
        </div>

    </div>

        <Footer />
    </>
}

export default Home;