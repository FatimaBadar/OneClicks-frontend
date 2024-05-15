import { Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import CustomButton from "../LandingPageComponent/CustomButton";

interface PaymentProps{
  fromDropdown: boolean
}
const PaymentComponent: React.FC<PaymentProps> = ({ fromDropdown }) => {

// export default function PaymentComponent() {
  useEffect(() => {
    const loadFacebookSDK = () => {
      const fbScript = document.createElement("script");
      fbScript.id = "facebook-jssdk";
      fbScript.src = "https://connect.facebook.net/en_US/sdk.js";
      document.getElementsByTagName("head")[0].appendChild(fbScript);

      fbScript.onload = () => {
        window.fbAsyncInit = function () {
          FB.init({
            appId: "733989884793288",
            xfbml: true,
            version: "v18.0",
          });
        };
      };
    };
    loadFacebookSDK();

    if(fromDropdown){
      paymentDialog();
    }
  }, []);

  const paymentDialog = async () => {
    const adaccountId = localStorage?.getItem("adAccountId") ?? "";
    FB.ui({
      account_id: adaccountId.toString(),
      display: "popup",
      method: "ads_payment",
    });
  };
  return (
    <>
    { fromDropdown ? "" : (
    <Box onClick={paymentDialog}>
      <CustomButton
        backgroundColor="#0F1B4C"
        color="#fff"
        buttonText="Payment"

      />
    </Box>
  )}
  </>
  );
}
export default PaymentComponent;
