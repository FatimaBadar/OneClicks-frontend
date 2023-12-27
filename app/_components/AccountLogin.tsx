'use client'

import { Button } from '@mui/material';
import React, { useEffect } from 'react';
const app_id = process.env.FACEBOOK_ID;

const AccountLogin: React.FC = () => {
    useEffect(() => {
        const loadFacebookSDK = () => {
            const fbScript = document.createElement('script');
            fbScript.id = 'facebook-jssdk';
            fbScript.src = 'https://connect.facebook.net/en_US/sdk.js';
            document.getElementsByTagName('head')[0].appendChild(fbScript);
    
            fbScript.onload = () => {
                window.fbAsyncInit = () => {
                    window.FB?.init({
                        appId: "733989884793288",
                        cookie: true,
                        xfbml: true,
                        version: 'v18.0',
                    });
    
                    // window.FB.getLoginStatus((response) => {
                    //     console.log("response: ",response);
                    //     statusChangeCallback(response);
                    // });
                };
            };
        };
        loadFacebookSDK(); 
    }, [ ]);

    const fblogin = () => {
    
        window.FB.login( (response: any) =>{
    
            if(response.status === 'connected'){
                console.log(response.authResponse.accessToken);
    
                fetch(`/api/fblogin?token=${response.authResponse.accessToken}`)
                .then(response2 => console.log("Debug response: ", response2));
                console.log("Response by Facebook Login: ",response);
            }
            },
            {scope: 'email, read_insights, pages_show_list, ads_management, ads_read, business_management, pages_read_engagement,pages_manage_posts'}      
            // :'email,public_profile, ads_management, pages_manage_ads'}
        )
      }

    // const statusChangeCallback = (response: any) => {
    //     console.log('statusChangeCallback');
    //     console.log("response: ",response);
    //     if (response.status === 'connected') {
    //         console.log("access token: ",response.authResponse.accessToken);   
    //         // fetch(`https://localhost:3000/api/fblogin?token=${response.authResponse.accessToken}`)
    //         // .then(response => 
    //         //     console.log("got a response", response)
    //         //     );
    //     }      
    // };

   

    // const checkLoginState = () => {
    //     console.log("in check login status")
    //     window.FB.getLoginStatus(function(response) {
    //         statusChangeCallback(response);
    //     });
    // };

    return (
        <>
        {/* <div    
            className="fb-login-button"
            data-scope="public_profile,email,ads_management,pages_manage_ads"
            // data-onlogin="checkLoginState();">
                 data-onlogin={() => {
                    // This function will be called after Facebook login
                    window.FB.getLoginStatus((response) => {
                    console.log("response on login: ",response);
                    statusChangeCallback(response);
                    });
                }}
        >
        </div>   */}
         <Button 
        onClick={fblogin}
        //   href="/connect"
          variant="contained"
          sx={{
            backgroundColor: "#597FB5 !important",
            color: "#fff !important",
            '&:hover': {
              backgroundColor: "#405D80 !important",
            },
          }}
        >
          Connect Ad Account
        </Button>
                    {/* <button onClick={fblogin}>login</button> */}
                    </>  
    );
};

export default AccountLogin;