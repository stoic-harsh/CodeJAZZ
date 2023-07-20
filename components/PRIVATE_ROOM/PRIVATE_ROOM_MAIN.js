"use client"

import { AlertContext } from "../../app/layout";
import { useState, useContext, useEffect } from "react";

import LeftDrawer from "@/components/Drawer/LeftDrawer";

import AppBar from "@components/Appbar/Appbar";

import CodeEditorWindow from "@/components/CodeEditorWindow/CodeEditorWindow";
import available_languages from "@/utils/AvailableConfigurations/AvailableLanguages";

import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Loader from "@/components/Loader_Default/Loader";



const Editor = ({ code, setCode, id, channel })=>{

    // ALERT VARIABLES
    const alertToast = useContext(AlertContext);

    // APP BAR
    const [open, setOpen] = useState(false);

    // CONFIGURATION OF EDITOR
    const [themeIndex, setThemeIndex] = useState(0);
    const [languageIndex, setLanguageIndex] = useState(0);

    // STDIN
    const [input, setInput] = useState("");

    // STDOUT
    const [output, setOutput] = useState("");
    const [outputColor, setOutputColor] = useState("");

    // LOADER STATE
    const [loader, setLoader] = useState(false);

    // HANDLING COMPILATION
    const handleSubmit = async()=>{
        setLoader(true);
        try{
            const response = await fetch("/api/submit-code/", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    code: code,
                    id: available_languages[languageIndex].id,
                    input: input
                })
            });

            if(response.ok){
                const { status, stdout, stderr, compile_output } = await response.json();
                
                setLoader(false);
                if(status.id === 3 ){
                    setOutputColor("text-green-400");
                    setOutput(atob(stdout));
                    alertToast.setColor("success");
                    alertToast.setAlert("Accepted");
                    alertToast.setOpen(true);
                }
                else if(status.id === 6){
                    setOutputColor("text-teal-500");
                    setOutput(atob(compile_output));
                    throw new Error(status.description);
                }
                    
                else{
                    setOutputColor("text-red-500");
                    setOutput(atob(stderr));
                    throw new Error(status.description);
                }
            }
            else{
                throw new Error(response.statusText);
            }

        }catch(err){
            setLoader(false);
            alertToast.setColor("error");
            alertToast.setAlert(err.message);
            alertToast.setOpen(true);
        }
    }


    return <>
        <LeftDrawer open={open} setOpen={setOpen} />
        
        <div className="w-screen h-screen overflow-hidden">
            {/* App bar */}
            <AppBar setOpen={setOpen} setThemeIndex={setThemeIndex} setLanguageIndex={setLanguageIndex} themeIndex={themeIndex} languageIndex={languageIndex} />
            
            <div className="w-screen h-screen bg-black flex">
                {/* editor */}
                { loader ? <Loader /> :
                    (<div className="editor-window w-[50%] md:w-[70%] h-[91.3%] p-2">
                        <CodeEditorWindow channel={channel} themeIndex={themeIndex} languageIndex={languageIndex} setCode={setCode} code={code} />
                    </div>)
                }
                {/* output */}
                <div className="w-[50%] md:w-[30%] h-[91.3%] flex flex-col">
                    <div className="w-[100%] h-[50%] output-window p-3">
                    <div className="text-white mb-2">Output Window :</div>
                        <div className={`w-[100%] h-[90%] ${outputColor} bg-black rounded-md p-2 overflow-y-auto`}>{output}</div>
                    </div>
                    <div className="w-[100%] h-[50%] input-window p-3 flex flex-col">
                        <div className="text-white mb-2">Input Window :</div>
                        <textarea className="w-[100%] h-[75%] bg-white resize-none rounded-md p-4 outline-none" value={input} onChange = { (event)=>{ setInput(event.target.value); } } />
                        <Button onClick={handleSubmit} className="mt-5 self-end bg-lime-600 md:bg-lime-800" variant="contained" endIcon={<SendIcon />}>
                            Compile and Run
                        </Button>
                    </div>
                </div>
            </div>
        </div> 

    </>

}

export default Editor;