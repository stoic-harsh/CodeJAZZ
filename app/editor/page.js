"use client"


import LeftDrawer from "@/components/Drawer/LeftDrawer";
import { useEffect, useState } from "react";

import AppBar from "@/components/Appbar/appbar";



const Editor = ()=>{


    const [open, setOpen] = useState(false);

    return <div className="w-screen h-screen overflow-hidden">
        <LeftDrawer open={open} setOpen={setOpen}/>
        
        <div id="editor_textArea" className="w-screen transition-all duration-1000 h-screen">
            {/* App bar */}
            <AppBar setOpen={setOpen} />
            <textarea className="resize-none w-[100%] h-[100%] bg-green-600 outline-none overflow-y-auto"/>
        
        </div> 

    </div>

}

export default Editor;