"use client"

import './globals.css';

// ALERT MESSAGES MANAGEMENT
import AlertToast from '@/components/Toast/AlertToast';
import { useState, createContext } from 'react';
import Head from 'next/head';

export const AlertContext = createContext();
export const RoomsContext = createContext();

export default function RootLayout({ children }) {

  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("success");
  const [alert, setAlert] = useState("Alert Message");


  return (
    <html lang="en">
      <Head>
        <title>CodeJAZZ</title>
        <meta name="description" content="real-time code editor with private room sessions" key="desc" />
      </Head>
      <body suppressHydrationWarning={true}>
          <AlertContext.Provider value={{open, setOpen, color, setColor, alert, setAlert }}>
            {children}
          </AlertContext.Provider>
        <AlertToast open={open} message={alert} color={color} setOpen={setOpen} />
      </body>
    </html>
  )
}
