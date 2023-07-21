import { Editor as CodeEditor } from "@monaco-editor/react";

import available_themes from "../../utils/AvailableConfigurations/AvailableThemes";
import available_languages from "@/utils/AvailableConfigurations/AvailableLanguages";

export default function CodeEditorWindow({ themeIndex, languageIndex, userInfo, editorRef, channel }){

    // loading themes
    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
        editorRef.current.setValue('// This is Javascript code\nconsole.log("Welcome to CodeJAZZ");')

        import("@/utils/ThemesData").then((module)=>{
            available_themes.map((data)=>{
                monaco.editor.defineTheme(data.parsed, module[data.name]);
            })
        }).catch((err) => alert(err.message));

        editorRef.current.onDidType(()=>channel.publish('codeChange', { 
            "code": editorRef.current.getValue(),
            "origin": userInfo
        }));
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

/>
}