import { useEffect, useState } from "react";
import { SignOut, signIn } from "./index";
import PropTypes from "prop-types";
import { auth, db, storage } from "../firbase-config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Profile from "../profile/Profile";
import ToDo from "../components/ToDo";
import { addDoc, collection } from "firebase/firestore";
import GetDocs from "../components/GetDocs";

const SignIn = ({ toggleForm }) => {
    const [password, setPassword] = useState('');
    const [userEmail, setUserEmail] = useState('')
    const [currentUser, setCurrentUser] = useState(null);
    const [isUserProfile, setIsUserProfile] = useState(false);

    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            console.log(currentUser);
        });
        
        return () => unsubscribe();
    }, [currentUser]);

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            await signIn(userEmail, password);
        } catch (err) {
            console.log(err.message)
        }
    }

    const handleLogOut = async () => {
        try {
            await SignOut(auth);
        } catch (err) {
            console.log(err.message)
        }
    }

    const handleToogleProfile = () => {
        setIsUserProfile(!isUserProfile)
    }

    const uploadFile = (file) => {
        const storageRef = ref(storage, 'files/' + file.name );
        
        uploadBytes(storageRef, file)
        .then((snapShot) => {
            console.log('file uploaded', snapShot);
            return getDownloadURL(snapShot.ref  );
        }).then(downloadUrl => {
            console.log((downloadUrl));
            storeMetaData(downloadUrl, file.name)
        }).catch(err => {
            console.log(err.message);
        })
    }

    const storeMetaData = (url, fileName) => {

        const fileData = {
            name: fileName,
            author: 'scott',
            url: url
        };

        addDoc(collection(db, 'myFilesData'), fileData)
        .then(docRef => {
            console.log('the data inside firestore', docRef);
        }).catch(err => {
            console.log(err.message);
        })
    }

    const handleFileChange = (e) => {
        const selectedfile = e.target.files[0];
        uploadFile(selectedfile);
    }

    return ( 
        <>
            <div className="form-group">
            {currentUser &&
                    <h1>Dashboard</h1>
                }
                {!currentUser ? (
                    <>
                        <h1>Sign In</h1>
                        <form className="form-control" onSubmit={handleSignUp}>
                        <label htmlFor="name">Enter name</label>
                        <input type="text" placeholder="enter name here" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                        <label htmlFor="password">enter password</label>
                        <input type="password" placeholder="enterpassword" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button>Sign In</button>
                    </form>
                    </>
                ) : (
                    !isUserProfile ? (
                        <div className="welcome">
                    <p>Welcome, back to your dashboard! {currentUser.displayName}</p>
                    <div>
                        <ToDo />
                        <GetDocs />
                    </div>
                    <div>
                    <button onClick={handleLogOut}>Log Out</button>
                    <button onClick={handleToogleProfile} >Profile</button>
                    </div>
                    <input type="file" onChange={handleFileChange} />

                </div>
                    ) : <Profile />
                )}
                {!currentUser && <button onClick={toggleForm} >Dont have an account? Sign Up</button>}
            </div>
        </>
     );
}

SignIn.propTypes = {
    toggleForm: PropTypes.func.isRequired
};
 
export default SignIn;