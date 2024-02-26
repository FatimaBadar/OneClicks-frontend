'use client'

import { Box, Button, Card, CardContent, Modal, Stack, Typography } from '@mui/material';
import { title } from 'process';
import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import router from 'next/router';
// import { useRouter } from 'next/router';
import CreateCampaign from './CreateCampaign';
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

    const cookies = new Cookies();
    const fblogin = () => {
    
        window.FB.login( (response: any) =>{
    
            if(response.status === 'connected'){
              cookies.set('accessToken', response.authResponse.accessToken);

                console.log("access token: ",response.authResponse.accessToken);
    
                fetch(`/api/fblogin?token=${response.authResponse.accessToken}`)
                .then(response2 => console.log("Debug response: ", response2));
                console.log("Response by Facebook Login: ",response);
            }
            },
            {scope: 'email, read_insights, pages_show_list, ads_management, ads_read, business_management, pages_read_engagement,pages_manage_posts, pages_manage_metadata, pages_read_user_content'}      
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
    // const router = useRouter(); // Declare useRouter her
    const [isModalOpen, setModalOpen] = useState(false);

    const handleCreateCampaignClick = () => {
      setModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setModalOpen(false);
      // const router = useRouter();
    };
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
        
        <Button
         onClick={handleCreateCampaignClick}
        variant="contained"
        sx={{
          backgroundColor: "#your-color !important", // Add your color for the second button
          color: "#your-text-color !important", // Add your text color for the second button
          '&:hover': {
            backgroundColor: "#your-hover-color !important", // Add your hover color for the second button
          },
        }}
      >
        Create a Campaign
      </Button>
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, bgcolor: 'background.paper', border: '2px solid #000', p: 4 }}>
  <div>
    {/* Modal Title */}
    <h3 id="modal-modal-title">Create a Campaign</h3>

    {/* Modal Content */}
    <p id="modal-modal-description">Dashboard</p>
    

    {/* Button to Navigate to Another Page */}
    <Button
      variant="contained"
      onClick={() => {
        // Replace '/your-page' with the actual path to the page you want to navigate to
        // window.location.href = '/CreateCampaign';
        router.push('/CreateCampaign');
      }}
    >
      Create a Campaign Form
    </Button>
  </div>
</Box>
      </Modal>
                    {/* <button onClick={fblogin}>login</button> */}
                    </>  
    );
};

export default AccountLogin;