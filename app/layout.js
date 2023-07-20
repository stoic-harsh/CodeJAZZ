"use client"

import './globals.css';

// ALERT MESSAGES MANAGEMENT
import AlertToast from '@/components/Toast/AlertToast';
import { useState, createContext } from 'react';

export const AlertContext = createContext();
export const RoomsContext = createContext();

export const metadata = {
  title: 'CodeJAZZ',
  description: 'real-time code editor with private room sessions',
}

export default function RootLayout({ children }) {


  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("success");
  const [alert, setAlert] = useState("Alert Message");


  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
          <AlertContext.Provider value={{open, setOpen, color, setColor, alert, setAlert }}>
            {children}
          </AlertContext.Provider>
        <AlertToast open={open} message={alert} color={color} setOpen={setOpen} />
      </body>
    </html>
  )
}
