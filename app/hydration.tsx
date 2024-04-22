"use client";
import { useEffect } from "react";
import useStore from "./_store/authStore";

export default function Hydrations(){
    useEffect(()=>{
        useStore.persist.rehydrate();
    }, [])
    return null;
}