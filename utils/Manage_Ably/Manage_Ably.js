import Ably from 'ably/promises';

export default async function AblyHandler(id, clientId) {
    try{
        const ably = Ably.Realtime({key: process.env.ABLY_API_KEY_ROOT, clientId});
        await ably.connection.once('connected');

        const channel = ably.channels.get(`room_${id}`);

        return channel;

    }catch(err){
        return new Error("Ably refused to connect");
    }
}