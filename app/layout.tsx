"use client";

import "./globals.scss";
import React, {useEffect, useState} from "react"
import { lightTheme,darkTheme } from "./theme/theme";
import { ThemeProvider,CssBaseline } from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers"
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs"
import Landing from "./components/Landing";
import supabase from "@/supabase";
import Header from "./components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user,setUser] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const switchTheme: any = () => {
      setIsDark(!isDark);

    };
    const onAuthStateChange = async() => {
      try{
        const { data: { user },
       } = await supabase.auth.getUser();
       if (user){
        setUser(user);
       }
        
      } catch (error){
        console.log(error);
      } finally{
      }
    };
    useEffect(()=>{
      onAuthStateChange();
    },[]);
  
  return (
    <html lang="en">
      < ThemeProvider theme = {isDark?darkTheme : lightTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <body >       
          <Header switchTheme={switchTheme} user={user}/>
          {!user ? <Landing/> : children}
          </body>
         
        </LocalizationProvider>
         
      </ThemeProvider>

    </html>
  );
}
