import React, { useState, useEffect } from 'react';
import Channel from './component/Channel.js'

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
  }, [])




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

  if (initializing) return "Loading ... ";

  return (
    <div className="App">
      {user ? (<> <button onClick={signOut}>Sign out</button> <Channel user={user} db={db}/> </>) : (<button onClick={sighnInGoogle}>sign in with Google here</button>)}
    </div>
  );
}

export default App;
