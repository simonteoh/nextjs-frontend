import React from 'react';
import Router from 'next/router';
import axios from 'axios';

export const getStaticProps = () => {
    let res: any ={};
   axios.get('http://localhost:5000/user').then(async (response: any) => {
    
   res = await response;
   })

   return {
        
    props: {    
        userData : res
    }
   }

   
}

function Admin({userData} : any) {
    console.log(userData);
    // if (!props.isLoggedIn) {
    //     Router.push('/login');
    //     return null;
    //   }
      // Render the page for logged in users
      return <div>Welcome</div>;
}

// Admin.getInitialProps = async (context: any) => {
//     // Check if the user is logged in
//     const isLoggedIn = checkIfLoggedIn();
//     if (!isLoggedIn) {
//       return { isLoggedIn };
//     }
//     // Fetch data for the logged in user
//     const user = await fetchUserData();
//     return { isLoggedIn, user };
//   };
// function checkIfLoggedIn(): boolean {
//     const token = localStorage.getItem("token");
//     // check if token exists and is not expired
//     if (token) {
//         const decoded = jwtDecode(token);
//         if (decoded.exp > Date.now() / 1000) {
//             return true;
//         }
//     }
//     return false;
// }
  
  
  

export default Admin;