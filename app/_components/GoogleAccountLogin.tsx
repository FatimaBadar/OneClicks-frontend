'use client'

import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';


const GoogleAccountLogin =() => {
    const router = useRouter();
  const searchParams = useSearchParams()
  const getAccessTokenFromURL = () => {
    const params = new URLSearchParams(window.location.hash.slice(1));
    console.log(params)
    const access_token = params.get('code'); 

    if (access_token) {
      console.log('Access token:', access_token);
      localStorage.setItem('access_tokenGoogle', access_token as string);
      trySampleRequest();
    } else {
      console.log('Access token not found in the URL');
    }
  };
  useEffect(() => {
    getAccessTokenFromURL();
    const access_token =  localStorage.getItem('access_tokenGoogle')
    console.log(access_token)
    console.log("geehhe")
    console.log(access_token);

    if (access_token) {
      localStorage.setItem('access_tokenGoogle', access_token as string);
      trySampleRequest();
    } else {
      oauthSignIn();
    }
  }, []);

  const trySampleRequest = () => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      fetch('https://www.googleapis.com/drive/v3/about?fields=user', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
    }
  };
//   1st: connect google 
  const oauthSignIn  = () => {
    const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    const params = {
      client_id: '195870252277-kgqnfto3d27fhvvhivk7m3ikfkc4qhvl.apps.googleusercontent.com',
      redirect_uri: 'https://localhost:3000/test',
      response_type: 'code',
      scope: 'https://www.googleapis.com/auth/adwords',
      include_granted_scopes: 'true',
      state: 'try_sample_request',
      access_type : 'offline'
    };

    const queryString = new URLSearchParams(params).toString();
    router.push(`${oauth2Endpoint}?${queryString}`);
  };


    return (
        <>
        
         <Button 
        onClick={oauthSignIn}
        
          variant="contained"
          sx={{
            backgroundColor: "orange !important",
            color: "#fff !important",
            '&:hover': {
              backgroundColor: "#405D80 !important",
            },
          }}
        >
          Connect Google Ad Account
        </Button>
                    </>  
    );
};

export default GoogleAccountLogin
function trySampleRequest() {
    throw new Error('Function not implemented.');
}

function oauthSignIn() {
    throw new Error('Function not implemented.');
}

