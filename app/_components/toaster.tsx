// import React from 'react'
import React, { useRef} from 'react';
import { Toast} from 'primereact/toast';
import 'primereact/resources/themes/lara-light-cyan/theme.css';

export function ToastComponent(props: any) {
    const toast = useRef<Toast>(null);

    console.log("check: ", props.func, " msg: ", props.message)
 
    const SuccessToast = (message: string) => {
      toast.current?.show({
         severity: 'success',
         summary: 'Success',
         detail: props,
         life: 3000,
       });
     };
   
   const ErrorToast = (message: string)=>{
       toast.current?.show({
         severity: 'error',
         summary: 'Error Message',
         detail: message,
         life: 3000,
       });
     };

     if(props.func == "SuccessToast"){
      SuccessToast(props.message);
    }
    else if(props.func == "ErrorToast"){
      ErrorToast(props.message);
    }
   
  return (
    // <PrimeReactProvider value={{ unstyled: true }}>
    <div className="card flex justify-content-center">
    <Toast ref={toast}   />
      </div>    
//  </PrimeReactProvider>
      )
}

