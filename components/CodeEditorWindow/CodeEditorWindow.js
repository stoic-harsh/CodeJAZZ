import { Editor as CodeEditor } from "@monaco-editor/react";

import available_themes from "../../utils/AvailableConfigurations/AvailableThemes";
import available_languages from "@/utils/AvailableConfigurations/AvailableLanguages";

export default function CodeEditorWindow({ channel, themeIndex, languageIndex, setCode, code }){

    // loading themes
    function handleEditorDidMount(editor, monaco) {

        import("@/utils/ThemesData").then((module)=>{
            available_themes.map((data)=>{
                monaco.editor.defineTheme(data.parsed, module[data.name]);
            })
        }).catch((err) => alert(err.message));
    }

    const handleCodeChange = (newCode)=>{
        setCode(newCode);
        console.log(channel);
        channel.publish("check", "");
    }


    return <CodeEditor 
    height="100%"
    width="100%"
    language= { available_languages[languageIndex] }
    theme = { available_themes[themeIndex].parsed }

    onMount={handleEditorDidMount}
    options= {{
        fontSize: 20,
        showUnused: true,
        padding: {
            top: 10, bottom: 10
        },
        mouseWheelZoom: true    
    }}

    value={code}

    onChange = { (value,event)=>{
        handleCodeChange(value);
    } }
/>
}