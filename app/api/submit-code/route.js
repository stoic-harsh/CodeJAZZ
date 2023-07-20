import { NextResponse } from "next/server";

export async function POST(req){
    
    try{
        const {id, code, input} = await req.json();
        
        const url = 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*&wait=true';
        
        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-RapidAPI-Key': process.env.RAPID_API_KEY,
              'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
            },
            body: JSON.stringify({
                language_id: id,
                source_code: btoa(code),
                stdin: btoa(input)
            })
        };

        const response = await fetch(url, options);
        if(response.ok){
            const parsedResponse = await response.json();
            
            return NextResponse.json({
                status: parsedResponse.status,
                stdout: parsedResponse.stdout,
                stderr: parsedResponse.stderr,
                compile_output: parsedResponse?.compile_output
            });
        }
        else{
            return new Error("JudgeAPI exhausted by calls");
        }
        
        // const result = await response.json();
        // console.log(result);

        return NextResponse.json({
            message: "Server Side running"
        });
    }catch(err){
        return new Error(err.message);
    }
}