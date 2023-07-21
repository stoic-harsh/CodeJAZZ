"use client"

import { AlertContext } from "../../../layout";
import { useState, useContext, useEffect, useRef } from "react";

import { useRouter } from "next/navigation";
import LeftDrawer from "@/components/Drawer/LeftDrawer";
import AppBar from "@/components/Appbar/Appbar";
import CodeEditorWindow from "@/components/CodeEditorWindow/CodeEditorWindow";
import available_languages from "@/utils/AvailableConfigurations/AvailableLanguages";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Loader from "@/components/Loader_Default/Loader";

import { UserContext } from "../../../layout";
import AblyHandler from "@/utils/Manage_Ably/Manage_Ably";

let channel;

const Editor = ()=>{
    // ALERT VARIABLES
    const alertToast = useContext(AlertContext);
    // LOADER STATE
    const [loader, setLoader] = useState(false);

    // EDITOR CONTENT
    const [code, setCode] = useState('');
    const editorRef = useRef(null);


    const userInfo = useContext(UserContext);
    const router = useRouter();
    const [connectedUsers, setConnectedUsers] = useState([]);

    async function onLoad(){
        setLoader(true);
        
        try{
            channel = await AblyHandler(userInfo.room_id, userInfo.userName);
        
        setLoader(false);
        alertToast.setColor('info');
        alertToast.setAlert('Real-time communication online!');
        alertToast.setOpen(true);
        
        // ACTIONS
        channel.subscribe('codeChange', (event)=>{
            if(userInfo.userName !== event.data.origin){
                editorRef.current.setValue(event.data.code);
            }
        });

        channel.presence.subscribe('enter', (event)=>{

            alertToast.setAlert(`${event.clientId} just joined!`);
            alertToast.setColor('success');
            alertToast.setOpen(true);

            channel.presence.get((err, members) => {
                if (!err) {
                    let temp_arr = []
                    members.map(({id, clientId})=>{
                        temp_arr.push({"key": id, "name": clientId});
                    })

                    setConnectedUsers(temp_arr);
                }
            });
        });

        channel.presence.subscribe('leave', (event)=>{

            alertToast.setAlert(`${event.clientId} left the meeting`);
            alertToast.setColor('warning');
            alertToast.setOpen(true);

            channel.presence.get((err, members) => {
                if (!err) {
                    let temp_arr = []
                    members.map(({id, clientId})=>{
                        temp_arr.push({"key": id, "name": clientId});
                    })

                    setConnectedUsers(temp_arr);
                }
            });
        });
        
        channel.presence.enter();

        }
        catch(err){
            alertToast.setAlert('Real-time editing non-responsive. Try again!');
            alertToast.setColor('error');
            alertToast.setOpen(true);
            alert(err.message);
            router.replace('/');
        }
    }

    useEffect(()=>{
        if(userInfo.userName === ''){
            alertToast.setAlert('Join from Home page. **Don\'t cheat**');
            alertToast.setColor('warning');
            alertToast.setOpen(true);
            router.replace('/');
            return ;
        }

        onLoad();
        window.addEventListener('beforeunload', ()=>{
            channel.presence.leave();
        })
    }, []);


    // COPY MEETING ID FUNCTION for drawer
    function copyMeetingId(){
        navigator.clipboard.writeText(userInfo.room_id);
        alertToast.setAlert('Meeting ID copied');
        alertToast.setColor('info');
        alertToast.setOpen(true);
    }

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

    // HANDLING COMPILATION
    const handleSubmit = async()=>{
        setLoader(true);
        const currData = editorRef.current.getValue();
        try{
            const response = await fetch("/api/submit-code/", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    code: editorRef.current.getValue(),
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
        
        channel.publish('codeChange', {"code": currData, "origin": '!@#$%^&*'});
    }


    return <>
        <LeftDrawer open={open} setOpen={setOpen} users={connectedUsers} channel={channel} copyMeetingId={copyMeetingId} />
        
        <div className="w-screen h-screen overflow-hidden">
            {/* App bar */}
            <AppBar setOpen={setOpen} setThemeIndex={setThemeIndex} setLanguageIndex={setLanguageIndex} themeIndex={themeIndex} languageIndex={languageIndex} />
            
            <div className="w-screen h-screen bg-black flex">
                {/* editor */}
                { loader ? <Loader /> :
                    (<div className="editor-window w-[50%] md:w-[70%] h-[91.3%] p-2">
                        <CodeEditorWindow themeIndex={themeIndex} languageIndex={languageIndex} userInfo={userInfo.userName} editorRef={editorRef} channel={channel} />
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
                        <Button onClick={ handleSubmit } sx={{marginTop: '10px', backgroundColor: 'rgb(101 163 13)'}} className="self-end" variant="contained" endIcon={<SendIcon />}>
                            Compile and Run
                        </Button>
                    </div>
                </div>
            </div>
        </div> 

    </>

}

export default Editor;