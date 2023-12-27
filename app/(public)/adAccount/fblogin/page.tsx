'use client';
import AccountLogin from "@/app/_components/AccountLogin";
import React from 'react'

export default function page() {
  return (
    <AccountLogin/>
  )
}


// export default function AccountPage(){


//   // const login = () => {
//   //   window.FB.login( (response: any) =>{
//   //     if(response.status === 'connected')
//   //     console.log(response.authResponse.accessToken)
//   //   },{scope: 'email,public_profile, ads_management, pages_manage_ads'}
  
//   //   )
//   // }
//   const statusChangeCallback = (response: any) => {
//     console.log("in page");
//     if(response.status === 'connected'){
//         console.log(response.authResponse.accessToken)
//     }
//     else{
//       console.log("not connected")
//     }
//   }

//     function getLoginStatus(response: any) {
//       statusChangeCallback(response);
//     };
   
//   return(
//     <>
//     {/* <fb:login-button
//     config_id="{config_id}"
//       onlogin="checkLoginState();">

//       </fb:login-button> */}
//     {/* <div
//                 className="fb-login-button"
//                 data-scope="public_profile,email,ads_management,pages_manage_ads"
//                 data-onlogin="checkLoginState();"
//                 // onClick={checkLoginState()}
//             >Login _here</div> */}
//     <button onClick={getLoginStatus}>Login to fb</button>
//     </>
//   )

// }
// const FBInit = () => {
//   const router = useRouter();

//   useEffect(() => {
//     console.log('Started use effect');
//     initFacebookSdk().then(() => {
//       getFacebookLoginStatus().then((response) => {
//         if (response === null) {
//           console.log('No login status for the person');
//         } else {
//           console.log(response);
//         }
//       });
//     });
//   }, []);

//   const login = () => {
//     console.log('reached log in button');
//     fbLogin().then((response) => {
//       console.log(response);
//       if (response.status === 'connected') {
//         console.log('Person is connected');
//       } else {
//         // Handle other cases
//       }
//     });
//   };

//   return (
    
//     <div>
//       <button onClick={login}>Login</button>
//       <p>Click the button to initiate Facebook login.</p>
//     </div>
//   );
// };

// export default FBInit;
