'use client'

import { useState } from 'react';
import dynamic from 'next/dynamic';

const MainWindow = dynamic(()=> import('@/components/PRIVATE_ROOM/PRIVATE_ROOM_MAIN'), {ssr: false});


export default function RoomPage({params}) {

    const id = params.room_id;
    const [code, setCode] = useState('');

    return <MainWindow code={code} setCode={setCode} channel={"qe"} id={id} />

}