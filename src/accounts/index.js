import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firbase-config/firebase";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

export const signUp = async (userEmail, password) => {
    
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, userEmail, password);
        console.log(userCredential.user.email);
        console.log('logged in');
        const user = auth?.currentUser;
            await setDoc(doc(db, 'users', user.uid), {
                userId: user?.uid,
                email: user?.email,
                createdAt: new Date()
            });
    } catch (err) {
        console.log(err.message);
    }
}

export const signIn = (userEmail, password) => {
    signInWithEmailAndPassword(auth, userEmail, password)
    .then(userCredential => {
        console.log(userCredential);
    }).catch(err => {
        console.log(err.message);
    })
}

export const SignOut = () => {
    signOut(auth)
    .then(() => {
        console.log('logged out')
    }).catch(err => {
        console.log(err.message);
    })
}

export const profileUpdate = (name) => {
    updateProfile(auth.currentUser, {
        displayName: name
    }).then(() => {
        console.log('updated');
    }).catch(erro => console.log(erro.message));
}

export const updateUserEmail = (email) => {
    updateUserEmail(auth.currentUser, email).then(() => {
        console.log(email)
        console.log('profile updated');
    }).catch(err => {
        console.log(err.message);
    })
}

export const passwordReset = (email) => {
    sendPasswordResetEmail(auth, email)
    .then(() => {
        console.log('password changed');
    }).catch(err => {
        console.log(err.message);
    })
}