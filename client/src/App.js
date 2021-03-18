import React, { useState, useEffect } from 'react';
import Channel from './component/Channel.js'
import LandingPage from './component/Landingpage.js'
// import './component/Landingpage.css'
import './App.css'

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyDoZWBDRb5beZg64z8wmwhHTbk56PHaTVc",
  authDomain: "livechatter-aef14.firebaseapp.com",
  projectId: "livechatter-aef14",
  storageBucket: "livechatter-aef14.appspot.com",
  messagingSenderId: "598128472884",
  appId: "1:598128472884:web:fb3fe4119034549313ab61"
});

const auth = firebase.auth();
const db = firebase.firestore();

function App() {
  const [user, setUser] = useState(() => auth.currentUser);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      }
      else {
        setUser(null);
      }
      if (initializing) {
        setInitializing(false);
      }
    })
    return unsubscribe
  },)




  const sighnInGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.useDeviceLanguage();
    try {
      await auth.signInWithPopup(provider);
    } catch (error) {
      console.error(error);
    }
  };
  const signOut = async () => {
    try{
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error.message);
    }
  }

  if (initializing) return 'loading...';

  return (
    <div className="App">
      {user ? (<> <button className='btn btn-primary' onClick={signOut}>Sign out</button> <Channel user={user} db={db}/> </>) : (            <div className="banner">
                <div className='container'>
                    <div className="row">
                        <div className="col-sm-6">
                            <h1 className>
                                welcome to LiveChatter
                </h1>
                            <p>
                                sign in here to join our live chat
                </p>
                        </div>
                        <div class="d-grid gap-2 d-md-block">
                            <button class="btn btn-primary" type="button" onClick={sighnInGoogle}><img src='https://i.imgur.com/c6b7gt0.png' width='20px' height="20px" /> Sign in with google</button>
                        </div>


                    </div>

                </div>

            </div>

      )}
    </div>
  );
}

export default App;
