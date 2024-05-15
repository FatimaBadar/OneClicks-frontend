import { Button } from '@mui/material';
import React, { useEffect } from 'react'

export default function PaymentComponent() {
    useEffect(() => {
        const loadFacebookSDK = () => {
            const fbScript = document.createElement("script");
            fbScript.id = "facebook-jssdk";
            fbScript.src = "https://connect.facebook.net/en_US/sdk.js";
            document.getElementsByTagName("head")[0].appendChild(fbScript);
      
            fbScript.onload = () => {
                window.fbAsyncInit = function() {
                    FB.init({
                        appId: '733989884793288',
                        xfbml: true,
                        version: 'v18.0'
                    });
                };
            }
        }
        loadFacebookSDK();
      }, []);
       

    const paymentDialog = async() => {
        const adaccountId = localStorage?.getItem("adAccountId") ?? "";
        FB.ui({
            account_id: adaccountId.toString(),
            display: 'popup',
            method: 'ads_payment'
        });
    }
  return (
    <Button
    onClick={paymentDialog}
    variant="contained"
    sx={{
      backgroundColor: "#597FB5 !important",
      color: "#fff !important",
      "&:hover": {
        backgroundColor: "#405D80 !important",
      },
    }}
  >
    Payment
  </Button>
  )
}
