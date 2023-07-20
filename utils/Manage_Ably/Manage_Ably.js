import Ably from "ably/promises";

const key = "Sig_jQ.QK4Pkg:EwjfZG5WA89naeVMUNos0sVXJeDfAtG0MDxxOlmFUjg";

const ablyChannels = {};

export default async function AblyHandler(id) {
    try{
        const ably = Ably.Realtime(key);
        await ably.connection.once('connected');

        const channel = ably.channels.get(`room_${id}`);
        
        channel.subscribe("JOIN", (event)=>{
            if(Object.keys(ablyChannels).indexOf(event.data.id) === -1){
                ablyChannels[event.data.id] = [event.data.userName];
            }
            else{
                ablyChannels[event.data.id].push(event.data.userName);
            }
            console.log(ablyChannels);
        });

        return channel;

    }catch(err){
        return new Error(err.message);
    }
}