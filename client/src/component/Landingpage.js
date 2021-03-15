// import React from 'react';
// import './Landingpage.css'
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/firestore';





  
//   const auth = firebase.auth();
// const LandingPage = () => {



//     const sighnInGoogle = async () => {
//         const provider = new firebase.auth.GoogleAuthProvider();
//         auth.useDeviceLanguage();
//         try {
//           await auth.signInWithPopup(provider);
//         } catch (error) {
//           console.error(error);
//         }
//       };




//     return (
//         <>
//             <div className="banner">
//                 <div className='container'>
//                     <div className="row">
//                         <div className="col-sm-6">
//                             <h1 className>
//                                 welcome to LiveChatter
//                 </h1>
//                             <p>
//                                 sign in here to join our live chat
//                 </p>
//                         </div>
//                         <div class="d-grid gap-2 d-md-block">
//                             <button class="btn btn-primary" type="button" onClick={sighnInGoogle}>Button</button>
//                             <button class="btn btn-primary" type="button">Button</button>
//                         </div>


//                     </div>

//                 </div>

//             </div>

//         </>
//     )
// };


// export default LandingPage