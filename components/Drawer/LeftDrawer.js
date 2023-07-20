"use client"

import { useState } from "react";
import { Drawer, Button } from "@mui/material";


import { Shizuru, Inter } from "next/font/google";
import IconButton from '@mui/material/IconButton';
import { HighlightOff } from '@mui/icons-material';


import Link from "next/link";

import NamedAvatar from "@/components/Avatar/Avatar";

const shizuru = Shizuru({
    subsets: ["latin"],
    weight: "400"
});

const inter = Inter({ subsets: ['latin'] })

const LeftDrawer = ({ open, setOpen, users })=>{
    
    const handleDrawerClose = ()=>{
        setOpen(false);
    }

    const linkClass = "text-indigo-200 text-bold underline underline-2";

    
    return <Drawer
        sx={{
          width: "280px",
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: "280px",
            boxSizing: 'border-box',
            backgroundColor: '#031818',
            color: 'white',
            padding: '10px',
            overflow: 'hidden'
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
    >
        
        {/* LOGO ON TOP OF DRAWER */}
        <div className="pl-3 flex items-center ">
            <img className="w-[60px]" src="/logo.png" alt="logo_CodeJAZZ"/>
            <div className="bg-white ml-3 mr-5 w-[0.5px] h-[70px]"/>
            <div className={`${shizuru.className} flex flex-col`}>
                <span className="text-[30px]">Code</span>
                <span className="ml-6 text-[27px] font-extrabold">JA<span className="text-yellow-300">Z</span><span className="text-orange-500">Z</span></span>
            </div>
            
            <IconButton
                color="inherit"
                aria-label="close drawer"
                onClick={handleDrawerClose}
                className="text-white self-start"
            >
                <HighlightOff className="text-[33px] mr-[-50px]"/>
            </IconButton>
        </div>


        <div>```````````````````````````````````````````````````````````</div>
        <div>Dashboard created by "stoic-harsh". Reach out to him at :</div>
        <div className={`${inter.className} font-extrabold text-center mt-1 text-[15px]`} style={{ wordSpacing: "10px" }}>
            <Link target="_blank" className={linkClass} href="https://www.linkedin.com/in/stoic-harsh/">LinkedIn</Link> | <Link target="_blank" className={linkClass} href="https://github.com/stoic-harsh/">Github</Link> | <Link target="_blank" className={linkClass} href="mailto:20bme011@nith.ac.in">Gmail</Link>
        </div>

        <div className="my-2 w-full h-[0.5px] bg-[rgba(255,255,255,0.5)]" />
        

        {/* Users */}
        <div>Active Connections : {users?.length}</div>
        <div className="overflow-auto flex flex-wrap my-3 mb-3 ml-2">
            {
                users && (users.map((user)=>{
                    return <NamedAvatar key={user} name={user}/>
                }))
            }
        </div>
        
        <div className="grow"/>

        
        {/* Buttons */}
        <div className="flex flex-col gap-3 mb-5 sm:mb-0">
            <Button className="crypto font-sans" variant="contained" color="success">
                Copy Meeting ID
            </Button>

            <Button className="font-sans font-bold" variant="outlined" color="error">
                Leave Meeting
            </Button>
        </div>
    </Drawer>
}

export default LeftDrawer;