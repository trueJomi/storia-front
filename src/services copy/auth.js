import { getAuth, signOut, getIdToken, signInWithEmailAndPassword } from "firebase/auth";

import { app } from "src/context/firebase.context";

const auth= getAuth(app);

function logIn( email, password){
    return signInWithEmailAndPassword(auth, email, password)
}

function getToken(){
    return getIdToken(auth.currentUser)
}
function logOut(){
    return signOut(auth)
}

export {
    auth,
    logIn,
    logOut,
    getToken,
}