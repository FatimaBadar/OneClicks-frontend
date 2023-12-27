import React from 'react'

export default function fbLoginPage() {
    return (
      <> 

      <p>checking</p>
          <div id='button'
                className="fb-login-button"
                data-scope="public_profile,email,ads_management,pages_manage_ads"
            //     data-onlogin="checkLoginState();"
            ></div>
            </>
      ); 
}
