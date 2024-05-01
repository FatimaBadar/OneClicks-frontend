'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const Oauth = () => {
  const router = useRouter();
  const searchParams = useSearchParams()

  useEffect(() => {
    const access_token = searchParams.get('access_token');
    console.log(access_token)
    if (access_token) {
      localStorage.setItem('access_tokenGoogle', access_token as string);
      trySampleRequest();
    } else {
      oauthSignIn();
    }
  }, []);

  //end
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

  //1st: connect google
  const oauthSignIn = () => {
    const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    const params = {
      client_id: '195870252277-kgqnfto3d27fhvvhivk7m3ikfkc4qhvl.apps.googleusercontent.com',
      redirect_uri: 'https://localhost:3000',
      response_type: 'code',
      scope: 'https://www.googleapis.com/auth/adwords',
      include_granted_scopes: 'true',
      state: 'try_sample_request',
      access_type : 'offline'
    };

    const queryString = new URLSearchParams(params).toString();
    router.push(`${oauth2Endpoint}?${queryString}`);
  };

  const revokeAccess = () => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      fetch(`https://oauth2.googleapis.com/revoke?token=${accessToken}`, {
        method: 'POST',
        mode: 'cors'
      })
      .then(response => {
        if (response.ok) {
          localStorage.removeItem('access_token');
          console.log('Access revoked successfully');
        } else {
          console.error('Failed to revoke access:', response.statusText);
        }
      })
      .catch(error => console.error('Error:', error));
    }
  };

  return (
    <div>
      <div>Redirecting...</div>
      <button onClick={revokeAccess}>Revoke Access</button>
    </div>
  );
};

export default Oauth;
