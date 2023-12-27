'use client';

import React, { useEffect } from 'react'

export default function FacebookLogin() {
    useEffect(()=>{
        window.fbAsyncInit = function() {
            window.FB.init({
            appId      : "733989884793288",
            cookie     : true,
            xfbml      : true,
            version    : 'v18.0',
            });      
        };
        console.log("loaded")
    }, [])
   
  return (
    <div>
        login</div>
  )
}

